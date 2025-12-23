import Student from '../models/StudentModel.js';

export const createStudent = async (req, res) => {
  const { name, email, course, enrollmentDate } = req.body;

  try {
    // Prevent duplicate profile
    const existing = await Student.findOne({ user: req.user.id });
    if (existing) {
      return res.status(400).json({ message: 'Student profile already exists' });
    }

    const student = await Student.create({
      user: req.user.id,
      name,
      email,
      course,
      enrollmentDate,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.json({
      success:true,
      student
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateMyStudentProfile = async (req, res) => {
  try {
    const { _id, name, email, course, enrollmentDate } = req.body;

    let student;

    if (_id) {
      // Try to find student by _id
      student = await Student.findById(_id);

      if (student) {
        // Update only provided fields
        if (name) student.name = name;
        if (email) student.email = email;
        if (course) student.course = course;
        if (enrollmentDate) student.enrollmentDate = enrollmentDate;

        await student.save();
      } else {
        // If _id provided but student not found, create new
        student = new Student({
          user: req.user.id,
          name: name || "Default Name",
          email: email || "default@example.com",
          course: course || "MERN Bootcamp",
          enrollmentDate: enrollmentDate || new Date(),
        });
        student = await student.save();
      }
    } else {
      // No _id provided, try to find by user
      student = await Student.findOne({ user: req.user.id });

      if (student) {
        if (name) student.name = name;
        if (email) student.email = email;
        if (course) student.course = course;
        if (enrollmentDate) student.enrollmentDate = enrollmentDate;

        await student.save();
      } else {
        student = new Student({
          user: req.user.id,
          name: name || "Default Name",
          email: email || "default@example.com",
          course: course || "MERN Bootcamp",
          enrollmentDate: enrollmentDate || new Date(),
        });
        student = await student.save();
      }
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const deleteMyStudentProfile = async (req, res) => {
  try {
    const deleted = await Student.findOneAndDelete({ user: req.user.id });

    if (!deleted) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.json({ message: 'Student profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
