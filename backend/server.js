import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/userRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import budgetRouter from './routes/budgetRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000

// Middlewares -
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  cors({
    origin: "https://expense-tracker-frontend-zipm.onrender.com",
    credentials: true,
  })
);

app.get('/',(req, res)=>{
  res.json("Working well");
})

// API calls -
app.use('/api/auth', authRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/income', incomeRouter);
app.use('/api/budget', budgetRouter);
app.use('/api/dashboard', dashboardRouter);

// DB connection
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/userRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import budgetRouter from './routes/budgetRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000

// Middlewares -
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get('/',(req, res)=>{
  res.json("Working well");
})

// API calls -
app.use('/api/auth', authRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/income', incomeRouter);
app.use('/api/budget', budgetRouter);
app.use('/api/dashboard', dashboardRouter);

// DB connection
connectDB();

app.listen(port, ()=>{
  console.log(`Server is running on ${port}`);
  
})

})
