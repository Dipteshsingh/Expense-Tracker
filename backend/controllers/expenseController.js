import expenseModel from "../models/expenseModel.js";

// Add expense -
const addExpense = async (req, res) =>{
  try {
    const {amount, category, description, date} = req.body;
    if (!amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Amount and category are required",
      });
    }
      const expense = await expenseModel.create({
        userId: req.user.id,
        amount,
        category,
        description,
        date
      });
      return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: expense
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// All expenses -
const allExpense = async (req, res) =>{
  try {
    const expenses = await expenseModel.find({
      userId: req.user.id,
    }).sort({date: -1});

    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Update expenses -
const updateExpense = async (req, res) =>{
  try {
    const {id} = req.params;
    const expense = await expenseModel.findById(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Update -
    const updatedExpense = await expenseModel.findByIdAndUpdate(
      id,
      req.body,
      {new:true}
    );

    return res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Delete expense -
const deleteExpense = async (req, res) =>{
  try {
    const {id} = req.params;
    const expense = await expenseModel.findById(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Delete -
    const deletedExpense = await expenseModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { addExpense, allExpense, deleteExpense, updateExpense}