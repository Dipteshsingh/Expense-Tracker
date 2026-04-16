import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })

}
// Register -
const register =async (req, res) =>{
  const { firstName, lastName, email, password } = req.body;
  try {
      const existUser = await userModel.findOne({email});
      if (existUser) {
          return res.json({ success: false, message: 'User already exists' })
      }
      // Validating email---
      if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' })
      }

      if (password.length < 8) {
      return res.json({ success: false, message: 'Please enter a strong password' })
      }
    // Hasing password---
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword
      })

      const user = await newUser.save();
      const token = createToken(user.id);
      return res.json({
      success: true,
      message: "Registration successful",
      user: { 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email },
      token
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

// Login -
const login = async (req, res) =>{
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = createToken(user._id);
    return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
  },
});

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

export {register, login};
