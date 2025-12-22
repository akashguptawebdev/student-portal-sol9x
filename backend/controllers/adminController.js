import studentModel from "../models/StudentModel.js";

export const getAllStudent = async (req, res) => {
  try {
    const students = await studentModel.find();

    res.status(200).json({
      success: true,
      totalStudents: students.length,
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
