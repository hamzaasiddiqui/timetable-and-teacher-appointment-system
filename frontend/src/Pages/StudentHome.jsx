import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Timetable from '../components/Timetable';
import StudentAppointments from '../components/StudentAppointments';
import StudentSettings from '../components/StudentSettings';

function StudentHome() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('timetable');


    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('departmentID')
        localStorage.removeItem('studentID')

        navigate('/');
    };

    const setView = (view) => {
        setActiveView(view);
    };

    return (
        <div className="container-fluid m-0 p-0 h-100">
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 w-100">
                <a className="navbar-brand" href="#">Student Dashboard</a>
                <div className="collapse navbar-collapse flex justify-content-between">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => setView('timetable')}>Timetable</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => setView('appointments')}>Appointments</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => setView('settings')}>Settings</button>
                        </li>
                    </ul>
                    <button onClick={handleSignOut} className="btn btn-outline-danger">
                        Sign Out
                    </button>
                </div>
            </nav>
        
        
            {/* Content of the page */}
            <div className="mt-5">
                {activeView === 'timetable' && <Timetable />}
                {activeView === 'appointments' && <StudentAppointments />}
                {activeView === 'settings' && <StudentSettings />}
            </div>
    </div>
    );
}

export default StudentHome;
