
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Darshboard from './components/Darshboard';
import Students from './components/Students';
import Exams from './components/Exams';
import Teacher from './components/Teacher';
import Courses from './components/Courses';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Darshboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/teacher" element={<Teacher/>} />
          <Route path="/courses" element ={<Courses/>}/>
          
          
        </Routes>
    </Router>
  );
}

export default App;
