import budgetModel from "../models/budgetModel.js";

// Add budget -
const addBudget = async (req, res) =>{
  try {
    const {limit, category, month} = req.body;
    if (!limit || !category || !month) {
      return res.status(400).json({
        success: false,
        message: "Limit, category and month are required",
      });
    }
    let budget = await budgetModel.findOne({
      userId: req.user.id,
      category,
      month,
    });
    if (budget) {
      budget.limit = limit;
      await budget.save();
      
      return res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      data: budget,
    });
  }
    budget = await budgetModel.create({
        userId: req.user.id,
        limit,
        category,
        month
      });
      return res.status(201).json({
      success: true,
      message: "Budget added successfully",
      data: budget
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// All budget -
const allBudget = async (req, res) =>{
  try {
    const budgets = await budgetModel.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: budgets.length,
      data: budgets
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Update budget -
const updateBudget = async (req, res) =>{
  try {
    const {id} = req.params;
    const { limit, category, month } = req.body;
    
    const budget = await budgetModel.findById(id);
    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    if (budget.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Update -
    const updatedBudget = await budgetModel.findByIdAndUpdate(
      id,
      { limit, category, month },
      {new:true}
    );

    return res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      data: updatedBudget,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Delete expense -
const deleteBudget = async (req, res) =>{
  try {
    const {id} = req.params;
    const budget = await budgetModel.findById(id);
    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    if (budget.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Delete -
    const deletedBudget = await budgetModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { addBudget, allBudget, deleteBudget, updateBudget}