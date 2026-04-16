# Personal Finance Tracker

A full-stack personal finance tracking application built as part of the HyScaler assignment. The application allows users to securely manage their income, expenses, and monthly budgets while getting a quick overview of their financial activity.

---

## Live Demo

Live URL:

---

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing using bcrypt
* Protected routes

### Expense Management

* Add new expenses
* View all expenses
* Update existing expenses
* Delete expenses
* Categorize expenses
* Add optional descriptions and dates

### Income Management

* Add new income entries
* View all income sources
* Update income entries
* Delete income entries
* Support for frequency types:

  * Daily
  * Weekly
  * Monthly
  * Yearly
  * One-time

### Budget Tracking

* Set monthly budgets by category
* View all budgets
* Compare expenses against budgets

### Dashboard

* Total income
* Total expense
* Remaining balance
* Recent expenses
* Recent income
* Budget overview

---

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* dotenv
* cors

---

## Folder Structure

```text
project-root/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
└── README.md
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/personal-finance-tracker.git
cd personal-finance-tracker
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:4000
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

```text
POST   /api/user/register
POST   /api/user/login
```

### Income

```text
POST   /api/income/addIncome
GET    /api/income/allIncome
PUT    /api/income/updateIncome/:id
DELETE /api/income/deleteIncome/:id
```

### Expense

```text
POST   /api/expense/addExpense
GET    /api/expense/allExpense
PUT    /api/expense/updateExpense/:id
DELETE /api/expense/deleteExpense/:id
```

### Budget

```text
POST   /api/budget/addBudget
GET    /api/budget/allBudget
PUT    /api/budget/updateBudget/:id
DELETE /api/budget/deleteBudget/:id
```

### Dashboard

```text
GET /api/dashboard/summary
```

---

## Authentication Flow

1. User registers or logs in.
2. Backend returns a JWT token.
3. Token is stored in localStorage.
4. Token is sent in the Authorization header for protected routes.

Example:

```text
Authorization: Bearer your_jwt_token
```

---

## Sample Test Credentials

```text
Email: demo@gmail.com
Password: demo123
```

Replace these with your own demo account before submission.

---

## Screenshots

Add screenshots here before submission:

* Login Page
* Register Page
* Dashboard
* Add Income Form
* Add Expense Form
* Budget Section

Example:

```md
![Dashboard Screenshot](./screenshots/dashboard.png)
```

---

## Future Improvements

* Charts and analytics
* Budget progress bars
* Export transactions to CSV
* Dark / Light mode toggle
* Monthly financial reports
* Pagination and advanced filtering

---

## Author

**Your Name**

* GitHub: `https://github.com/Dipteshsingh`
* LinkedIn: `https://linkedin.com/in/dipteshkumarsingh`

---

## License

This project was created for assignment and educational purposes.
