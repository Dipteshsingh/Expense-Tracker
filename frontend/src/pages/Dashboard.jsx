import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Income from "../components/Income";
import Expense from "../components/Expense";
import Budget from "../components/Budget";

const BASE = "https://expense-tracker-frontend-zipm.onrender.com/api";
const FREQUENCIES = ["One-time", "Weekly", "Monthly", "Yearly"];
const emptyForm = { source: "", amount: "", frequency: "monthly", date: "" };
const EXPENSE_CATEGORIES = [
  "Groceries",
  "Utilities",
  "Entertainment",
  "Transport",
  "Dining",
  "Shopping",
  "Health",
  "Other",
];

const emptyExpenseForm = {
  amount: "",
  category: "Other",
  description: "",
  date: "",
};
const emptyBudgetForm = {
  category: "Groceries",
  limit: "",
  month: new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  }),
};


const Dashboard = () => {
  const { token } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    remainBalance: 0,
  });

  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState(emptyExpenseForm);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [budgetForm, setBudgetForm] = useState(emptyBudgetForm);

  // Fetch 
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [expenseRes, incomeRes, budgetRes, summaryRes] = await Promise.all([
        axios.get(`${BASE}/expense/allExpense`, config),
        axios.get(`${BASE}/income/allIncome`, config),
        axios.get(`${BASE}/budget/allBudget`, config),
        axios.get(`${BASE}/dashboard/summary`, config),
      ]);
      setExpenses(expenseRes.data.data);
      setIncomes(incomeRes.data.data);
      setBudgets(budgetRes.data.data);
      setSummary(summaryRes.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchDashboardData();
  }, [token]);

  // Income CRUD
  const handleIncomeFormChange = (e) =>
    setIncomeForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addIncome = async (e) => {
    e.preventDefault();
    if (!incomeForm.source || !incomeForm.amount) {
      toast.error("Source and amount are required");
      return;
    }
    try {
      setSubmitting(true);
      const res = await axios.post(
        `${BASE}/income/addIncome`,
        incomeForm,         
        config
      );
      setIncomes((prev) => [res.data.data, ...prev]);
      setIncomeForm(emptyForm);
      setShowIncomeForm(false);
      toast.success("Income added");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add income");
    } finally {
      setSubmitting(false);
    }
  };

  const updateIncome = async (id, data) => {
    try {
      const res = await axios.put(
        `${BASE}/income/updateIncome/${id}`,
        data,
        config
      );
      setIncomes((prev) =>
        prev.map((item) => (item._id === id ? res.data.data : item))
      );
      toast.success("Income updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE}/income/deleteIncome/${id}`, config);
      setIncomes((prev) => prev.filter((item) => item._id !== id));
      toast.success("Income deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  // Expense CRUD 
const handleExpenseFormChange = (e) =>
  setExpenseForm((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));

const addExpense = async (e) => {
  e.preventDefault();

  if (!expenseForm.amount || !expenseForm.category) {
    toast.error("Amount and category are required");
    return;
  }

  try {
    setSubmitting(true);

    const res = await axios.post(
      `${BASE}/expense/addExpense`,
      expenseForm,
      config
    );

    setExpenses((prev) => [res.data.data, ...prev]);
    setExpenseForm(emptyExpenseForm);
    setShowExpenseForm(false);

    toast.success("Expense added");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add expense");
  } finally {
    setSubmitting(false);
  }
};

const updateExpense = async (id, data) => {
  try {
    const res = await axios.put(
      `${BASE}/expense/updateExpense/${id}`,
      data,
      config
    );

    setExpenses((prev) =>
      prev.map((item) => (item._id === id ? res.data.data : item))
    );

    toast.success("Expense updated");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update expense");
  }
};

const deleteExpense = async (id) => {
  try {
    await axios.delete(`${BASE}/expense/deleteExpense/${id}`, config);

    setExpenses((prev) => prev.filter((item) => item._id !== id));

    toast.success("Expense deleted");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete expense");
  }
};

// Budget crud
const handleBudgetFormChange = (e) =>
  setBudgetForm((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));

const addBudget = async (e) => {
  e.preventDefault();

  if (!budgetForm.category || !budgetForm.limit) {
    toast.error("Category and limit are required");
    return;
  }
  try {
    setSubmitting(true);

    const res = await axios.post(
      `${BASE}/budget/addBudget`,
      budgetForm,
      config
    );

    setBudgets((prev) => [res.data.data, ...prev]);
    setBudgetForm(emptyBudgetForm);
    setShowBudgetForm(false);

    toast.success("Budget added");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add budget");
  } finally {
    setSubmitting(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  const { totalIncome, totalExpense, remainBalance } = summary;
  const isPositive = remainBalance >= 0;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-6 py-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="border-b border-gray-800 pb-6">
          <p className="text-xs uppercase tracking-widest text-indigo-400 mb-1">Overview</p>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Total Income</p>
            <p className="text-2xl font-semibold text-emerald-400">₹{totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Total Expense</p>
            <p className="text-2xl font-semibold text-rose-400">₹{totalExpense.toLocaleString()}</p>
          </div>
          <div className={`rounded-2xl p-6 border ${isPositive ? "bg-indigo-950 border-indigo-800" : "bg-rose-950 border-rose-800"}`}>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Balance</p>
            <p className={`text-2xl font-semibold ${isPositive ? "text-indigo-300" : "text-rose-300"}`}>
              {isPositive ? "+" : ""}₹{remainBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Expense Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm uppercase tracking-widest text-gray-500">
            Expenses
          </h2>
      
          <button
            onClick={() => {
              setShowExpenseForm((prev) => !prev);
              setExpenseForm(emptyExpenseForm);
            }}
            className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium px-4 py-2       rounded-xl transition-colors"
          >
            {showExpenseForm ? "Cancel" : "+ Add Expense"}
          </button>
        </div>
      
        {/* Add Expense Form */}
        {showExpenseForm && (
          <form
            onSubmit={addExpense}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-5 grid grid-cols-1       sm:grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 uppercase tracking-widest">
                Amount (₹)
              </label>
      
              <input
                name="amount"
                type="number"
                value={expenseForm.amount}
                onChange={handleExpenseFormChange}
                placeholder="e.g. 1200"
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm       text-white placeholder-gray-600 focus:outline-none focus:border-rose-500       transition-colors"
              />
            </div>
      
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 uppercase tracking-widest">
                Category
              </label>
      
              <select
                name="category"
                value={expenseForm.category}
                onChange={handleExpenseFormChange}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm       text-white focus:outline-none focus:border-rose-500 transition-colors"
              >
                {EXPENSE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
      
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 uppercase tracking-widest">
                Description
              </label>
      
              <input
                name="description"
                value={expenseForm.description}
                onChange={handleExpenseFormChange}
                placeholder="Optional note about the expense"
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm       text-white placeholder-gray-600 focus:outline-none focus:border-rose-500       transition-colors"
              />
            </div>
      
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 uppercase tracking-widest">
                Date
              </label>
      
              <input
                name="date"
                type="date"
                value={expenseForm.date}
                onChange={handleExpenseFormChange}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm       text-white focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
      
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-sm       font-medium px-6 py-2.5 rounded-xl transition-colors"
              >
                {submitting ? "Saving..." : "Add Expense"}
              </button>
            </div>
          </form>
        )}
      
          <Expense
            expenses={expenses}
            onUpdate={updateExpense}
            onDelete={deleteExpense}
            />
      </section>

        {/* Income Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm uppercase tracking-widest text-gray-500">Income</h2>
            <button
              onClick={() => {
                setShowIncomeForm((prev) => !prev);
                setIncomeForm(emptyForm);
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors"
            >
              {showIncomeForm ? "Cancel" : "+ Add Income"}
            </button>
          </div>

          {/* Inline Add Form */}
          {showIncomeForm && (
            <form
              onSubmit={addIncome}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 uppercase tracking-widest">Source</label>
                <input
                  name="source"
                  value={incomeForm.source}
                  onChange={handleIncomeFormChange}
                  placeholder="e.g. Salary, Freelance"
                  className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 uppercase tracking-widest">Amount (₹)</label>
                <input
                  name="amount"
                  type="number"
                  value={incomeForm.amount}
                  onChange={handleIncomeFormChange}
                  placeholder="e.g. 50000"
                  className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 uppercase tracking-widest">Frequency</label>
                <select
                  name="frequency"
                  value={incomeForm.frequency}
                  onChange={handleIncomeFormChange}
                  className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {FREQUENCIES.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 uppercase tracking-widest">Date</label>
                <input
                  name="date"
                  type="date"
                  value={incomeForm.date}
                  onChange={handleIncomeFormChange}
                  className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
                >
                  {submitting ? "Saving..." : "Add Income"}
                </button>
              </div>
            </form>
          )}

          {/* Income List — no onAdd prop needed, form lives here */}
          <Income
            incomes={incomes}
            onUpdate={updateIncome}
            onDelete={deleteIncome}
          />
        </section>

        {/* Budgets */}
        <section>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm uppercase tracking-widest text-gray-500">
      Budgets
    </h2>

    <button
      onClick={() => {
        setShowBudgetForm((prev) => !prev);
        setBudgetForm(emptyBudgetForm);
      }}
      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors"
    >
      {showBudgetForm ? "Cancel" : "+ Add Budget"}
    </button>
  </div>

   {showBudgetForm && (
    <form
      onSubmit={addBudget}
      className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-gray-500 uppercase tracking-widest">
          Category
        </label>

        <select
          name="category"
          value={budgetForm.category}
          onChange={handleBudgetFormChange}
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
        >
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-gray-500 uppercase tracking-widest">
          Budget Limit (₹)
        </label>

        <input
          name="limit"
          type="number"
          value={budgetForm.limit}
          onChange={handleBudgetFormChange}
          placeholder="e.g. 10000"
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="sm:col-span-2 flex flex-col gap-1.5">
        <label className="text-xs text-gray-500 uppercase tracking-widest">
          Month
        </label>

        <input
          name="month"
          value={budgetForm.month}
          onChange={handleBudgetFormChange}
          placeholder="April 2026"
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
        >
          {submitting ? "Saving..." : "Add Budget"}
        </button>
      </div>
    </form>
  )}

   <Budget budgets={budgets} expenses={expenses} />
  </section>

      </div>
    </div>
  );
};

export default Dashboard;
