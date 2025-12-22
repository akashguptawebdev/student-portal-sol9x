import express from 'express';
import {
    signup,
    login,
    getMyProfile,
} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const userAuthRouter = express.Router();
// import authMiddleware from '../middlewares/auth.middleware.js';

/* =======================
   Public Routes
======================= */

// Signup
userAuthRouter.post('/signup', signup);

// Login
userAuthRouter.post('/login', login);

userAuthRouter.get("/getUser", authMiddleware, getMyProfile);

/* =======================
   Protected Routes
======================= */

// Get logged-in user
// userAuthRouter.get('/me', authMiddleware, getMe);

// // Logout (client-side token removal, optional server handling)
// userAuthRouter.post('/logout', authMiddleware, logout);

export default userAuthRouter;
