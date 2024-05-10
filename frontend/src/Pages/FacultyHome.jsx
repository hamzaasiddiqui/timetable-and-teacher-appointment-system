import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Timetable from '../components/Timetable';
import FacultyAppointments from '../components/FacultyAppointments';

function FacultyHome() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('timetable');

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('departmentID')
        localStorage.removeItem('facultyID')

        navigate('/faculty_login');
    };

    const setView = (view) => {
        setActiveView(view);
    };

    return (
        <div className="container-fluid m-0 p-0 h-100">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand ms-3" href="#">Faculty Dashboard</a>
                <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item ms-3">
                            <button className="nav-link btn btn-link" onClick={() => setView('timetable')}>Timetable</button>
                        </li>
                        <li className="nav-item ms-3">
                        <button className="nav-link btn btn-link" onClick={() => setView('appointments')}>Appointments</button>
                        </li>
                    </ul>
                    <button onClick={handleSignOut} className="btn btn-outline-danger me-3">
                        Sign Out
                    </button>
                </div>
            </nav>
        
        
            {/* Content of the page */}
            <div className="mt-5">
                {activeView === 'timetable' && <Timetable />}
                {activeView === 'appointments' && <FacultyAppointments />}
            </div>
        </div>
    );
}

export default FacultyHome;
