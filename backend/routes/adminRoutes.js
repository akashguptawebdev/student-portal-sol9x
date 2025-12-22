import express from 'express';
import {
    getAllStudent,
} from '../controllers/adminController.js';
import { adminOnly } from '../middlewares/adminOnly.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const adminRoute = express.Router();

adminRoute.get('/getAll',authMiddleware , adminOnly, getAllStudent);

export default adminRoute;