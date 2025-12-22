import React, { useState, useEffect } from "react";
import CustomInput from "../common/CustomInput";
import "./StudentScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyStudentProfile, updateStudentProfile } from "../../redux/action/studentAction";

function StudentScreen() {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userAuth);
  const { studentFormDetails } = useSelector((state) => state.appData);

  const COURSE_OPTIONS = [
    "MERN Bootcamp",
    "Full-Stack JavaScript",
    "Data Science with Python",
    "Machine Learning",
    "DevOps & CI/CD",
    "Android Development (Kotlin)",
    "iOS Development (Swift)",
    "UI/UX Design",
    "Cloud Computing (AWS)",
    "Cybersecurity Fundamentals",
    "Blockchain Development",
    "React Native Mobile Dev",
  ];
console.log("studentFormDetails", studentFormDetails)
  const [student, setStudent] = useState({
    customerId: "",
    name: "",
    email: "",
    course: COURSE_OPTIONS[0],
    enrollmentDate: new Date().toISOString().split("T")[0],
  });

  // Fetch student profile on mount
  useEffect(() => {
    dispatch(getMyStudentProfile());
  }, [dispatch]);

  // Populate form state when user/studentFormDetails updates
 useEffect(() => {
  if (!user) return;

  setStudent((prev) => ({
    customerId: user._id || "",
    name: studentFormDetails?.name || user.name || prev.name,
    email: studentFormDetails?.email || user.email || prev.email,
    course: studentFormDetails?.course || user.course || prev.course,
    enrollmentDate: studentFormDetails?.enrollmentDate
      ? studentFormDetails.enrollmentDate.split("T")[0] 
      : new Date().toISOString().split("T")[0],
  }));
}, [user, studentFormDetails]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Edit / Cancel
  const handleEdit = () => setIsEdit(true);
  const handleCancel = () => {
    setIsEdit(false);
    // revert changes
    setStudent({
      customerId: user._id || "",
      name: studentFormDetails?.name || user.name || "",
      email: studentFormDetails?.email || user.email || "",
      course: studentFormDetails?.course || user.course || COURSE_OPTIONS[0],
      enrollmentDate:
        studentFormDetails?.enrollmentDate ||
        new Date().toISOString().split("T")[0],
    });
  };

  // Save
  const handleSave = () => {
    const updateData = {
      name: student.name,
      email: student.email,
      course: student.course,
      enrollmentDate: student.enrollmentDate,
    };
    console.log(updateData)
    dispatch(updateStudentProfile(updateData));
    setIsEdit(false);
  };

  return (
    <div className="student-page">
      <div className="student-card">
        <div className="profile-header">
          <img
            src="https://thumbs.dreamstime.com/b/student-icon-vector-graduation-mortar-board-school-college-university-glyph-pictogram-male-person-profile-avatar-108392101.jpg"
            alt="profile"
            className="profile-pic"
          />
          {!isEdit ? (
            <button className="edit-btn" onClick={handleEdit}>
              Edit profile
            </button>
          ) : (
            <div className="action-buttons">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          )}
        </div>

        <div className="profile-form">
          <CustomInput
            label="Student Id"
            name="customerId"
            value={student.customerId}
            disabled
          />

          <CustomInput
            label="Name*"
            name="name"
            value={student.name}
            onChange={handleChange}
            disabled={!isEdit}
          />

          <CustomInput
            label="Primary Email*"
            name="email"
            value={student.email}
            onChange={handleChange}
            disabled={!isEdit}
          />

          <div className="custom-input-select">
            <label>Course</label>
            <select
              name="course"
              value={student.course}
              onChange={handleChange}
              disabled={!isEdit}
            >
              {COURSE_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <CustomInput
            label="Enrollment Date"
            name="enrollmentDate"
            type="date"
            value={student.enrollmentDate}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentScreen;
