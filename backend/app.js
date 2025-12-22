import express from "express";
import cors from "cors"
import userAuthRouter from "./routes/authRoutes.js";
import studentRoute from "./routes/studentRoutes.js";
import adminRoute from "./routes/adminRoutes.js";

// const authRoutes = require('./routes/authRoutes');
// const studentRoutes = require('./routes/studentRoutes');

const app = express();

/* =======================
   Global Middlewares
======================= */
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   API Routes
======================= */
app.use('/api/auth', userAuthRouter);
app.use('/api/admin', adminRoute);
app.use('/api/student', studentRoute);

/* =======================
   Health Check
======================= */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'MERN Student Portal API running',
  });
});

/* =======================
   Global Error Handler
======================= */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
