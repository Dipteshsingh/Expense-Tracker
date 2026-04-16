import express from 'express'

import isAuthenticated from '../middleware/auth.js';
import { addIncome, allIncome, deleteIncome, updateIncome } from '../controllers/incomeController.js';

const incomeRouter = express.Router();

incomeRouter.post('/addIncome', isAuthenticated, addIncome);
incomeRouter.get('/allIncome', isAuthenticated, allIncome);
incomeRouter.delete('/deleteIncome/:id', isAuthenticated, deleteIncome);
incomeRouter.put('/updateIncome/:id', isAuthenticated, updateIncome);

export default incomeRouter;