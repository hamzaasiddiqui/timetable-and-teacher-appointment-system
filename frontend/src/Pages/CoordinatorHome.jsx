import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FacultyManagement from '../components/FacultyManagement';
import CourseManagement from '../components/CourseManagement';
import StudentManagement from '../components/StudentManagement';
import Timetable from '../components/Timetable';
import CreateTimetable from '../components/CreateTimetable';

function CoordinatorHome() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('courseManagement');

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('departmentID')
        navigate('/coordinator_login');
    };

    const setView = (view) => {
        setActiveView(view);
    };

    return (
        <div className="container-fluid m-0 p-0 h-100">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand ms-3" href="#">Coordinator Dashboard</a>
                <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item ms-3">
                            <button className="nav-link btn btn-link" onClick={() => setView('courseManagement')}>Course Management</button>
                        </li>
                        <li className="nav-item ms-3">
                            <button className="nav-link btn btn-link" onClick={() => setView('facultyManagement')}>Faculty Management</button>
                        </li>
                        <li className="nav-item ms-3">
                            <button className="nav-link btn btn-link" onClick={() => setView('studentManagement')}>Student Management</button>
                        </li>
                        <li className="nav-item ms-3">
                            <button className="nav-link btn btn-link" onClick={() => setView('timetable')}>Timetable</button>
                        </li>
                        <li className="nav-item ms-3">
                            <button className="nav-link btn btn-link" onClick={() => setView('createTimetable')}>Create Timetable</button>
                        </li>
                    </ul>
                    <button onClick={handleSignOut} className="btn btn-outline-danger me-3">
                        Sign Out
                    </button>
                </div>
            </nav>

            <div className="mt-5">
                {activeView === 'courseManagement' && <CourseManagement />}
                {activeView === 'facultyManagement' && <FacultyManagement />}
                {activeView === 'studentManagement' && <StudentManagement />}
                {activeView === 'timetable' && <Timetable />}
                {activeView === 'createTimetable' && <CreateTimetable />}
            </div>
        </div>
    );
}

export default CoordinatorHome;
