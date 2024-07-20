import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TopNav, SideBar } from './Menu';

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState({
    id: '',
    firstName: '',
    secondName: '',
    department: ''
  });
  const [newTeacher, setNewTeacher] = useState({
    firstName: '',
    secondName: '',
    department: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/teacher');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/teacher/${id}`);
      fetchTeachers(); 
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const openUpdateModal = (teacher) => {
    setCurrentTeacher(teacher);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTeacher({ ...currentTeacher, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/teacher/${currentTeacher.id}`, currentTeacher);
      fetchTeachers(); 
      closeUpdateModal(); 
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({ ...newTeacher, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/teacher', newTeacher);
      fetchTeachers(); 
      closeAddModal(); 
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  return (
    <>
      <div className='bg-light'>
        <TopNav />
        <div className="main-container" style={{marginLeft:"12rem"}}>
          <SideBar />
          <div className='sub-container'>
            <button onClick={openAddModal}>  Add New Teacher</button>
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Second Name</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher,index) => (
                  <tr key={teacher.id}>
                    <td>{index +1}</td>
                    <td>{teacher.id}</td>
                    <td>{teacher.firstName}</td>
                    <td>{teacher.secondName}</td>
                    <td>{teacher.department}</td>
                    <td>
                      <button onClick={() => deleteTeacher(teacher.id)}>Delete</button>
                      <button onClick={() => openUpdateModal(teacher)}>Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isUpdateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeUpdateModal}>&times;</span>
            <h2>Update Teacher</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                First Name:
                <input type="text" name="firstName" value={currentTeacher.firstName} onChange={handleInputChange} required />
              </label>
              <label>
                Second Name:
                <input type="text" name="secondName" value={currentTeacher.secondName} onChange={handleInputChange} required />
              </label>
              <label>
                Department:
                <input type="text" name="department" value={currentTeacher.department} onChange={handleInputChange} required />
              </label>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeAddModal}>&times;</span>
            <h2>Add New Teacher</h2>
            <form onSubmit={handleAddSubmit}>
              <label>
                First Name:
                <input type="text" name="firstName" value={newTeacher.firstName} onChange={handleAddInputChange} required />
              </label>
              <label>
                Second Name:
                <input type="text" name="secondName" value={newTeacher.secondName} onChange={handleAddInputChange} required />
              </label>
              <label>
                Department:
                <input type="text" name="department" value={newTeacher.department} onChange={handleAddInputChange} required />
              </label>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Teacher;
