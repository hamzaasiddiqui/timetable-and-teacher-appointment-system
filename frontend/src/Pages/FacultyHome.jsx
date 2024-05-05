import { useNavigate } from 'react-router-dom';

function FacultyHome() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Clear authentication data
        localStorage.removeItem('authToken'); // Assuming you store a token named 'authToken'
        localStorage.removeItem('user'); // Clear user data if stored
        localStorage.removeItem('departmentID')

        // Redirect to login page or home page
        navigate('/faculty_login'); // Adjust the route as necessary
    };

    return (
        <div className="container-fluid m-0 p-0 h-100">
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 w-100">
                <a className="navbar-brand" href="#">Faculty Dashboard</a>
                <div className="collapse navbar-collapse flex justify-content-between">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => setView('timetable')}>Timetable</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link disabled">Appointment</button>
                        </li>
                    </ul>
                    <button onClick={handleSignOut} className="btn btn-outline-danger">
                        Sign Out
                    </button>
                </div>
            </nav>
        
        
            {/* Content of the page */}
            <div className="mt-5">
                <h1>Welcome to the Faculty Dashboard</h1>
                <p>This is your dashboard where you can manage all your activities.</p>
            </div>
        </div>
    );
}

export default FacultyHome;
