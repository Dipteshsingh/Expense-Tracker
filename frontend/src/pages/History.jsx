import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BASE = "http://localhost:4000/api";

export default function History() {
  const { token } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) return;

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [expenseRes, incomeRes, budgetRes] = await Promise.all([
          axios.get(`${BASE}/expense/allExpense`, config),
          axios.get(`${BASE}/income/allIncome`, config),
          axios.get(`${BASE}/budget/allBudget`, config),
        ]);

        setExpenses(expenseRes.data.data || []);
        setIncomes(incomeRes.data.data || []);
        setBudgets(budgetRes.data.data || []);
      } catch (error) {
        console.error("Failed to load history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token]);
  const transactions = [
    ...expenses.map((expense) => ({
      ...expense,
      type: "Expense",
      title: expense.category,
      subtitle: expense.description || "No description",
    })),

    ...incomes.map((income) => ({
      ...income,
      type: "Income",
      title: income.source,
      subtitle: income.frequency,
    })),

    ...budgets.map((budget) => ({
      ...budget,
      type: "Budget",
      title: budget.category,
      subtitle: budget.month,
      amount: budget.limit,
    })),
  ].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 border-b border-gray-800 pb-4">
          <p className="text-xs uppercase tracking-widest text-indigo-400 mb-1">
            Transactions
          </p>
          <h1 className="text-3xl font-bold">History</h1>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center text-gray-500">
            No history found.
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((item) => (
              <div
                key={`${item.type}-${item._id}`}
                className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-white capitalize">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        item.type === "Income"
                          ? "bg-emerald-900/40 text-emerald-400"
                          : item.type === "Expense"
                          ? "bg-rose-900/40 text-rose-400"
                          : "bg-indigo-900/40 text-indigo-400"
                      }`}
                    >
                      {item.type}
                    </span>

                    <span>
                      {new Date(item.date || item.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>

                <p
                  className={`text-lg font-semibold ${
                    item.type === "Income"
                      ? "text-emerald-400"
                      : item.type === "Expense"
                      ? "text-rose-400"
                      : "text-indigo-400"
                  }`}
                >
                  {item.type === "Income"
                    ? "+"
                    : item.type === "Expense"
                    ? "-"
                    : ""}
                  ₹{Number(item.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
