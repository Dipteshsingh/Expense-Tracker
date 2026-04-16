import expenseModel from "../models/expenseModel.js";
import incomeModel from "../models/incomeModel.js";

const getSummary = async (req, res)=>{
  try {
    const incomes = await incomeModel.find({userId: req.user.id});
    const expenses = await expenseModel.find({userId: req.user.id});

    const totalIncome = incomes.reduce((sum, item)=> sum + item.amount, 0);
    const totalExpense = expenses.reduce((sum, item)=> sum + item.amount, 0);

    const remainBalance = totalIncome - totalExpense;
    return res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        remainBalance,
      },
    });
  } catch (error) {
      return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export default getSummary;