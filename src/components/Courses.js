import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TopNav, SideBar } from './Menu';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    id: '',
    title: '',
    credit: ''
  });
  const [newCourse, setNewCourse] = useState({
    title: '',
    credit: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/course/${id}`);
      fetchCourses(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const openUpdateModal = (course) => {
    setCurrentCourse(course);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse({ ...currentCourse, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/course/${currentCourse.id}`, currentCourse);
      fetchCourses(); 
      closeUpdateModal();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const openAddModal = () => {
    setNewCourse({
      title: '',
      credit: ''
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/course', newCourse);
      fetchCourses(); 
      closeAddModal(); 
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <>
      <div className='bg-light'>
        <TopNav />
        <div className="main-container" style={{marginLeft:"12rem"}}>
          <SideBar />
          <div className='sub-container'>
            <div className="button-container" >
              <button onClick={openAddModal}>Add New Course</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>ID</th>
                  <th>tittle</th>
                  <th>credit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>{course.id}</td>
                    <td>{course.tittle}</td>
                    <td>{course.credit}</td>
                    <td>
                      <button onClick={() => deleteCourse(course.id)}>Delete</button>
                      <button onClick={() => openUpdateModal(course)}>Update</button>
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
            <h2>Update Course</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                Tittle:
                <input type="text" name="tittle" value={currentCourse.tittle} onChange={handleInputChange} required />
              </label>
              <label>
                Credit:
                <input type="text" name="credit" value={currentCourse.credit} onChange={handleInputChange} required />
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
            <h2>Add New Course</h2>
            <form onSubmit={handleAddSubmit}>
              <label>
                Tittle:
                <input type="text" name="tittle" value={newCourse.tittle} onChange={handleAddInputChange} required />
              </label>
              <label>
                Credit:
                <input type="text" name="credit" value={newCourse.credit} onChange={handleAddInputChange} required />
              </label>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
