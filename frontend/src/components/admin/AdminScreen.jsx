import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllStudents } from "../../redux/action/adminAction";

import "./AdminScreen.css";
import { updateStudentProfile } from "../../redux/action/studentAction";

function AdminScreen() {
  const dispatch = useDispatch();

  // Redux state
  const { allStudent } = useSelector((state) => state.appData); // students list
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch all students
  useEffect(() => {
    dispatch(adminGetAllStudents());
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Enable edit for a row
  const handleEdit = (student) => {
    setEditId(student._id);
    setEditForm({
      name: student.name,
      email: student.email,
      course: student.course,
      enrollmentDate: student.enrollmentDate
        ? student.enrollmentDate.split("T")[0]
        : "",
    });
  };

  // Cancel edit
  const handleCancel = () => {
    setEditId(null);
    setEditForm({});
  };

  // Save update
  const handleSave = (id) => {
    const updateData = {
      ...editForm,
      _id:id,
      enrollmentDate: new Date(editForm.enrollmentDate).toISOString(),
    };
     dispatch(updateStudentProfile(updateData));
      dispatch(adminGetAllStudents());
    setEditId(null);
  };

  return (
    <div className="admin-screen">
      <h2>All Students</h2>
      <div className="table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Enrollment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allStudent?.map((student) => (
              <tr key={student._id}>
                <td>{student._id}</td>

                <td>
                  {editId === student._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                    />
                  ) : (
                    student.name
                  )}
                </td>

                <td>
                  {editId === student._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleChange}
                    />
                  ) : (
                    student.email
                  )}
                </td>

                <td>
                  {editId === student._id ? (
                    <select
                      name="course"
                      value={editForm.course}
                      onChange={handleChange}
                    >
                      {[
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
                      ].map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  ) : (
                    student.course
                  )}
                </td>

                <td>
                  {editId === student._id ? (
                    <input
                      type="date"
                      name="enrollmentDate"
                      value={editForm.enrollmentDate}
                      onChange={handleChange}
                    />
                  ) : (
                    student.enrollmentDate
                      ? new Date(student.enrollmentDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  )}
                </td>

                <td>
                  {editId === student._id ? (
                    <>
                      <button
                        className="save-btn"
                        onClick={() => handleSave(student._id)}
                      >
                        Save
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminScreen;
