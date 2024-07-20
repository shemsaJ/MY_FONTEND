import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TopNav, SideBar } from './Menu';
import Chart from 'chart.js/auto';
import './Home.css';

const Home = () => {
  const [examData, setExamData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newData, setNewData] = useState({ type: '', title: '', score: '', credit: '' });

  useEffect(() => {
    fetchExamData();
    fetchCourseData();
    fetchUserData();
  }, []);

  const fetchExamData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/exam');
      setExamData(response.data);
    } catch (error) {
      console.error('Error fetching exam data:', error);
    }
  };

  const fetchCourseData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/course');
      setCourseData(response.data);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (examData.length > 0 && courseData.length > 0 && userData.length > 0) {
      createCharts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examData, courseData, userData]);

  const createCharts = () => {
    const ctx1 = document.getElementById('examChart').getContext('2d');
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: examData.map(exam => exam.name),
        datasets: [{
          label: '# of Exams',
          data: examData.map(exam => exam.score),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const ctx2 = document.getElementById('courseChart').getContext('2d');
    new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: courseData.map(course => course.title),
        datasets: [{
          label: '# of Courses',
          data: courseData.map(course => course.credit),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });

    const ctx3 = document.getElementById('userChart').getContext('2d');
    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['Students', 'Teachers', 'Admins'],
        datasets: [{
          label: '# of Users',
          data: [
            userData.filter(user => user.role === 'student').length,
            userData.filter(user => user.role === 'teacher').length,
            userData.filter(user => user.role === 'admin').length
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newData.type === 'exam') {
        await axios.post('http://localhost:8080/api/exam', { name: newData.title, score: newData.score });
      } else if (newData.type === 'course') {
        await axios.post('http://localhost:8080/api/course', { title: newData.title, credit: newData.credit });
      } else if (newData.type === 'user') {
        await axios.post('http://localhost:8080/api/user', { name: newData.title, role: newData.score });
      }
      fetchExamData();
      fetchCourseData();
      fetchUserData();
      closeAddModal();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className="bg-light">
      <TopNav />
      <div className="main-container">
        <SideBar />
        <div className="sub-container">
          <div className="dashboard">
            <div className="cards">
              <div className="card">
                <h3>Total Exams</h3>
                <p>{examData.length}</p>
              </div>
              <div className="card">
                <h3>Total Courses</h3>
                <p>{courseData.length}</p>
              </div>
              <div className="card">
                <h3>Total Users</h3>
                <p>{userData.length}</p>
              </div>
            </div>
            <div className="charts">
              <div className="chart">
                <canvas id="examChart"></canvas>
              </div>
              <div className="chart">
                <canvas id="courseChart"></canvas>
              </div>
              <div className="chart">
                <canvas id="userChart"></canvas>
              </div>
            </div>
            <div className="button-container">
              <button onClick={openAddModal}>Add New Data</button>
            </div>
          </div>
        </div>
      </div>
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeAddModal}>&times;</span>
            <h2>Add New Data</h2>
            <form onSubmit={handleAddSubmit}>
              <label>
                Type:
                <select name="type" value={newData.type} onChange={handleInputChange} required>
                  <option value="">Select Type</option>
                  <option value="exam">Exam</option>
                  <option value="course">Course</option>
                  <option value="user">User</option>
                </select>
              </label>
              <label>
                Title:
                <input type="text" name="title" value={newData.title} onChange={handleInputChange} required />
              </label>
              <label>
                {newData.type === 'user' ? 'Role' : newData.type === 'course' ? 'Credit' : 'Score'}:
                <input
                  type="text"
                  name={newData.type === 'user' ? 'score' : newData.type === 'course' ? 'credit' : 'score'}
                  value={newData.type === 'user' ? newData.score : newData.type === 'course' ? newData.credit : newData.score}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
