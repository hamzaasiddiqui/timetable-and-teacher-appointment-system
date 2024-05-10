import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function DeanLogin() {
  const [deanID, setDeanID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
        event.preventDefault();
        console.log('handleLogin called');

        fetch('http://localhost:80/controller/DeanLogin.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deanID, password })
        })
        .then(response => response.text())
        .then(text => {
          console.log("Raw response:", text);
          return JSON.parse(text);
        })
        .then(data => {
          if (data.message === "Login successful") {
            console.log("Login Success:", data);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('departmentID', data.departmentID)
            navigate('/dean_home');
          } else {
            setError("Login Failed: " + data.message);
            console.log("Login Failed:", data.message);
          }
        })
        .catch(error => {
          setError("Login Failed: Inavlid Credentials.");
          console.error("Login error:", error);
        });
    };

  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="mb-5">Dean Login</h1>
      <form onSubmit={handleLogin} style={{width: '50vw'}}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            value={deanID}
            onChange={(e) => setDeanID(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </div>
        {
          error && 
          <div className="alert alert-danger mt-2">
            {error}
          </div>
        }
      </form>
      <div className="d-flex mt-5">
        <a type="button" href="/" className="btn btn-info">Student Login</a>
        <a type="button" href="/coordinator_login" className="btn btn-info mx-2">Coordinator Login</a>
        <a type="button" href="/faculty_login" className="btn btn-info">Faculty Login</a>
      </div>
    </div>
  );
}
