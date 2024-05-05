import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FacultyManagement from '../components/FacultyManagement';
import CourseManagement from '../components/CourseManagement';
import Timetable from '../components/Timetable';
import CreateTimetable from '../components/CreateTimetable';

function CoordinatorHome() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('courseManagement'); // Default view

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
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 w-100">
                <a className="navbar-brand" href="#">Coordinator Dashboard</a>
                <div className="collapse navbar-collapse flex justify-content-between">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => setView('courseManagement')}>Course Management</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => setView('facultyManagement')}>Faculty Management</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => setView('timetable')}>Timetable</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => setView('createTimetable')}>Create Timetable</button>
                        </li>
                    </ul>
                    <button onClick={handleSignOut} className="btn btn-outline-danger">
                        Sign Out
                    </button>
                </div>
            </nav>

            <div className="mt-5">
                {activeView === 'courseManagement' && <CourseManagement />}
                {activeView === 'facultyManagement' && <FacultyManagement />}
                {activeView === 'timetable' && <Timetable />}
                {activeView === 'createTimetable' && <CreateTimetable />}
            </div>
        </div>
    );
}

export default CoordinatorHome;
