import express from 'express'


import isAuthenticated from '../middleware/auth.js';
import { addBudget, allBudget, deleteBudget, updateBudget } from '../controllers/budgetController.js';

const budgetRouter = express.Router();

budgetRouter.post('/addBudget', isAuthenticated, addBudget);
budgetRouter.get('/allBudget', isAuthenticated, allBudget);
budgetRouter.delete('/deleteBudget/:id', isAuthenticated, deleteBudget);
budgetRouter.put('/updateBudget/:id', isAuthenticated, updateBudget);

export default budgetRouter;