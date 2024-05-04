import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './Pages/StudentLogin';
import HomePage from './Pages/HomePage';
import DeanLogin from './Pages/DeanLogin';
import CoordinatorLogin from './Pages/CoordinatorLogin';
import FacultyLogin from './Pages/FacultyLogin';
import DeanHome from './Pages/DeanHome';
import CoordinatorHome from './Pages/CoordinatorHome';
import StudentHome from './Pages/StudentHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dean_login" element={<DeanLogin />} />
        <Route path="/coordinator_login" element={<CoordinatorLogin />} />
        <Route path="/faculty_login" element={<FacultyLogin />} />
        <Route path="/dean_home" element={<DeanHome />} />
        <Route path="/coordinator_home" element={<CoordinatorHome />} />
        <Route path="/student_home" element={<StudentHome />} />

      </Routes>
    </Router>
  )
}

export default App