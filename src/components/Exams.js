import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TopNav, SideBar } from './Menu';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState({
    id: '',
    name: '',
    date: '',
    duration: ''
  });
  const [newExam, setNewExam] = useState({
    name: '',
    date: '',
    duration: ''
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/exam');
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const deleteExam = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/exam/${id}`);
      fetchExams(); 
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  const openUpdateModal = (exam) => {
    setCurrentExam(exam);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExam({ ...currentExam, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/exam/${currentExam.id}`, currentExam);
      fetchExams(); 
      closeUpdateModal(); 
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };

  const openAddModal = () => {
    setNewExam({
      name: '',
      date: '',
      duration: ''
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewExam({ ...newExam, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/exam', newExam);
      fetchExams(); 
      closeAddModal(); 
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  return (
    <>
      <div className='bg-light'>
        <TopNav />
        <div className="main-container"style={{marginLeft:"12rem"}}>
          <SideBar />
          <div className='sub-container'>
            <div className="center-button-container">
              <button onClick={openAddModal}>Add New Exam</button>
            </div>
            <table>
              <thead>
                <tr>
                  
                  <th>id</th>
                  <th>studID</th>
                  <th>corsecode</th>
                  <th>marks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, index) => (
                  <tr key={exam.id}>
                    <td>{index + 1}</td>
                    <td>{exam.studID}</td>
                    <td>{exam.corsecode}</td>
                    <td>{exam.marks}</td>
                    <td>
                      <button onClick={() => deleteExam(exam.id)}>Delete</button>
                      <button onClick={() => openUpdateModal(exam)}>Update</button>
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
            <h2>Update Exam</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                StudID:
                <input type="text" name="studID" value={currentExam.studID} onChange={handleInputChange} required />
              </label>
              <label>
                Corsecode:
                <input type="text" name="corsecode" value={currentExam.corsecode} onChange={handleInputChange} required />
              </label>
              <label>
                Marks:
                <input type="text" name="marks" value={currentExam.marks} onChange={handleInputChange} required />
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
            <h2>Add New Exam</h2>
            <form onSubmit={handleAddSubmit}>
              <label>
                StudID:
                <input type="text" name="studID" value={newExam.studID} onChange={handleAddInputChange} required />
              </label>
              <label>
                Corsecode:
                <input type="text" name="corsecode" value={newExam.corsecode} onChange={handleAddInputChange} required />
              </label>
              <label>
                Marks:
                <input type="text" name="marks" value={newExam.marks} onChange={handleAddInputChange} required />
              </label>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Exams;
