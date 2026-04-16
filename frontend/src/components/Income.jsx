import { Pencil, Trash2 } from "lucide-react";
import React from "react";

const Income = ({ incomes = [], onUpdate, onDelete }) => {
  const totalIncome = incomes.reduce(
    (sum, inc) => sum + Number(inc.amount || 0),
    0
  );

  return (
    <div className="space-y-4">

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          Total Income
        </p>
        <p className="text-2xl font-semibold text-emerald-400">
          ₹{totalIncome.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3">
        {incomes.length === 0 ? (
          <p className="text-gray-600 text-sm">No income found.</p>
        ) : (
          incomes.map((income) => (
            <div
              key={income._id}
              className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between hover:border-gray-700 transition"
            >
              <div>
                <p className="text-white font-medium capitalize">
                  {income.source}
                </p>

                <div className="flex gap-3 mt-1">
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full capitalize">
                    {income.frequency}
                  </span>

                  <span className="text-xs text-gray-600">
                    {income.date
                      ? new Date(income.date).toLocaleDateString("en-IN")
                      : "—"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-semibold">
                  +₹{Number(income.amount).toLocaleString()}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const amount = prompt("Enter new amount", income.amount);
                    
                      if (!amount) return;
                    
                      onUpdate(income._id, {
                        ...income,
                        amount,
                      });
                    }}
                    className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white                  transition"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => onDelete && onDelete(income._id)}
                    className="p-2 rounded-lg bg-gray-800 text-rose-400 hover:bg-rose-600 hover:text-white                  transition"
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

export default Income;