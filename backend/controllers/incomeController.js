import incomeModel from "../models/incomeModel.js";


// Add income -
const addIncome = async (req, res) =>{
  try {
    const {amount, source, frequency, date} = req.body;
    if (!amount || !source) {
      return res.status(400).json({
        success: false,
        message: "Amount and source are required",
      });
    }
      const income = await incomeModel.create({
        userId: req.user.id,
        amount,
        source,
        frequency,
        date
      });
      return res.status(201).json({
      success: true,
      message: "Income added successfully",
      data: income
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// All incomes -
const allIncome = async (req, res) =>{
  try {
    const incomes = await incomeModel.find({
      userId: req.user.id,
    }).sort({date: -1});

    return res.status(200).json({
      success: true,
      count: incomes.length,
      data: incomes
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Update income -
const updateIncome = async (req, res) =>{
  try {
    const {id} = req.params;
    const income = await incomeModel.findById(id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    if (income.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Update -
    const updatedIncome = await incomeModel.findByIdAndUpdate(
      id,
      req.body,
      {new:true}
    );

    return res.status(200).json({
      success: true,
      message: "Income updated successfully",
      data: updatedIncome,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Delete delete -
const deleteIncome = async (req, res) =>{
  try {
    const {id} = req.params;
    const income = await incomeModel.findById(id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    if (income.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Delete -
    const deletedIncome = await incomeModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Income deleted successfully",
      data: deletedIncome
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { addIncome, allIncome, deleteIncome, updateIncome}