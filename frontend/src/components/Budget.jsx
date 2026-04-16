import React from "react";

const Budget = ({ budgets = [], expenses = [] }) => {
  const spentByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + Number(expense.amount || 0);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {budgets.length === 0 ? (
        <p className="text-gray-600 text-sm">No budgets found.</p>
      ) : (
        budgets.map((budget) => {
          const spent = spentByCategory[budget.category] || 0;
          const percentage = Math.min((spent / budget.limit) * 100, 100);
          const exceeded = spent > budget.limit;

          return (
            <div
              key={budget._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium capitalize">
                    {budget.category}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{budget.month}</p>
                </div>

                <div className="text-right">
                  <p className="text-indigo-400 font-semibold text-lg">
                    ₹{budget.limit.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      exceeded ? "text-rose-400" : "text-gray-500"
                    }`}
                  >
                    Spent ₹{spent.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    exceeded ? "bg-rose-500" : "bg-indigo-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  {percentage.toFixed(0)}% used
                </span>

                {exceeded ? (
                  <span className="text-rose-400 font-medium">
                    Budget exceeded
                  </span>
                ) : (
                  <span className="text-emerald-400 font-medium">
                    ₹{(budget.limit - spent).toLocaleString()} left
                  </span>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Budget;
