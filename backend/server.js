import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRouter from "./routes/userRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
import incomeRouter from "./routes/incomeRoute.js";
import budgetRouter from "./routes/budgetRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/api/auth", authRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/income", incomeRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/dashboard", dashboardRouter);

connectDB();

app.listen(port, ()=>{
  console.log(`Server is running on ${port}`);
  
})
