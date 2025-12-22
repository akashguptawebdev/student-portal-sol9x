import App from "./app.js"
import connectDB from "./config/db.js";

import dotenv from 'dotenv'
dotenv.config();


const PORT = process.env.PORT || 5000;

/* =======================
   Start Server
======================= */
const startServer = async () => {
  try {
    await connectDB();

    App.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server failed to start', error);
    process.exit(1);
  }
};

startServer();
