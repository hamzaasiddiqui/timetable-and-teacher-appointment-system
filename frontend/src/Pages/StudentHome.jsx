import { useNavigate } from 'react-router-dom';

function StudentHome() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('authToken'); // Assuming you store a token named 'authToken'
        localStorage.removeItem('user'); // Clear user data if stored

        navigate('/'); // Adjust the route as necessary
    };

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Student Dashboard</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        {/* Additional links */}
                    </ul>
                    <button onClick={handleSignOut} className="btn btn-outline-danger">
                        Sign Out
                    </button>
                </div>
            </nav>
            {/* Content of the page */}
            <div className="mt-5">
                <h1>Welcome to the Student Dashboard</h1>
                <p>This is your dashboard where you can manage all your activities.</p>
            </div>
        </div>
    );
}

export default StudentHome;
