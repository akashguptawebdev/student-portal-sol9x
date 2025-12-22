import express from 'express';
import {
  createStudent,
  getMyStudentProfile,
  updateMyStudentProfile,
  deleteMyStudentProfile,
} from '../controllers/studentController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const studentRoute = express.Router();

/* ===================================================== */
//    STUDENT ROUTES

studentRoute.post('/', authMiddleware, createStudent);

studentRoute.get('/details', authMiddleware, getMyStudentProfile);

studentRoute.put('/update', authMiddleware, updateMyStudentProfile);

studentRoute.delete('/delete', authMiddleware, deleteMyStudentProfile);

export default studentRoute;
