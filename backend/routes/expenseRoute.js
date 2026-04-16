import express from 'express'

import { addExpense, allExpense, deleteExpense, updateExpense } from '../controllers/expenseController.js';
import isAuthenticated from '../middleware/auth.js';

const expenseRouter = express.Router();

expenseRouter.post('/addExpense', isAuthenticated, addExpense);
expenseRouter.get('/allExpense', isAuthenticated, allExpense);
expenseRouter.delete('/deleteExpense/:id', isAuthenticated, deleteExpense);
expenseRouter.put('/updateExpense/:id', isAuthenticated, updateExpense);

export default expenseRouter;



    
    
        

    

        