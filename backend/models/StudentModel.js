import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, default: 'MERN Bootcamp' },
  enrollmentDate: { type: Date, default: Date.now },
}, { timestamps: true });

const studentModel = mongoose.model('Student', studentSchema);

export default studentModel;
