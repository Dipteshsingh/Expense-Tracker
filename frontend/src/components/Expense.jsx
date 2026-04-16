import { Pencil, Trash2 } from "lucide-react";
import React from "react";

const Expense = ({ expenses = [], onUpdate, onDelete }) => {
  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          Total Expense
        </p>

        <p className="text-2xl font-semibold text-rose-400">
          ₹{totalExpense.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3">
        {expenses.length === 0 ? (
          <p className="text-gray-600 text-sm">No expenses found.</p>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense._id}
              className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between hover:border-gray-700 transition"
            >
              <div>
                <p className="text-white font-medium capitalize">
                  {expense.category}
                </p>

                <div className="flex gap-3 mt-1 flex-wrap">
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full capitalize">
                    {expense.description || "No description"}
                  </span>

                  <span className="text-xs text-gray-600">
                    {expense.date
                      ? new Date(expense.date).toLocaleDateString("en-IN")
                      : "—"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-rose-400 font-semibold">
                  -₹{Number(expense.amount).toLocaleString()}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const amount = prompt(
                        "Enter new amount",
                        expense.amount
                      );

                      if (!amount) return;

                      onUpdate &&
                        onUpdate(expense._id, {
                          ...expense,
                          amount,
                        });
                    }}
                    className="text-xs text-gray-300 bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-700 transition"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => onDelete && onDelete(expense._id)}
                    className="text-xs text-rose-400 bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-rose-600 hover:text-white transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Expense;