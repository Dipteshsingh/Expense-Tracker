import express from 'express'

import isAuthenticated from '../middleware/auth.js';
import getSummary from '../controllers/dashboardController.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/summary', isAuthenticated, getSummary);


export default dashboardRouter;



    
    
        

    

        