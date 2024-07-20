
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TopNav, SideBar } from "./Menu";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    id: '',
    firstName: '',
    secondName: '',
    lastName: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/student');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/student/${id}`);
      fetchStudents(); 
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const openUpdateModal = (student) => {
    setCurrentStudent(student);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentStudent({
      id: '',
      firstName: '',
      secondName: '',
      lastName: ''
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/student/${currentStudent.id}`, currentStudent);
      fetchStudents(); 
      closeModal(); 
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/student', currentStudent);
      fetchStudents(); 
      closeModal(); 
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <>
      <div className='bg-light'>
        <TopNav />
      <div className="main-container" style={{marginLeft:"12rem"}}>
          <SideBar />
          <div className='sub-container'>
            <button onClick={openAddModal} className="add-button">Add New Student</button>
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Second Name</th>
                  <th>Last Name</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.secondName}</td>
                    <td>{student.lastName}</td>
                    <td>
                      <button onClick={() => deleteStudent(student.id)}>Delete</button>
                      <button onClick={() => openUpdateModal(student)}>Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>{isEditMode ? 'Update Student' : 'Add New Student'}</h2>
            <form onSubmit={isEditMode ? handleUpdateSubmit : handleAddSubmit}>
              <label>
                First Name:
                <input type="text" name="firstName" value={currentStudent.firstName} onChange={handleInputChange} required />
              </label>
              <label>
                Second Name:
                <input type="text" name="secondName" value={currentStudent.secondName} onChange={handleInputChange} required />
              </label>
              <label>
                Last Name:
                <input type="text" name="lastName" value={currentStudent.lastName} onChange={handleInputChange} required />
              </label>
              <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Students;
