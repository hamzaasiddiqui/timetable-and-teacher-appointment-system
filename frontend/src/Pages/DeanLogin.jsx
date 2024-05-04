import { useState } from "react";
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

export default function DeanLogin() {
  const [deanID, setDeanID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Create an instance of useNavigate

  const handleLogin = async (event) => {
        event.preventDefault();
        console.log('handleLogin called');

        fetch('http://localhost:80/controller/login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deanID, password })
        })
        .then(response => response.text())  // Get the response text
        .then(text => {
          console.log("Raw response:", text);  // Log the raw text
          return JSON.parse(text);  // Parse it as JSON
        })
        .then(data => {
          if (data.message === "Login successful") {
            console.log("Login Success:", data);
            localStorage.setItem('authToken', data.token);
            navigate('/dean_home');  // Redirect to Dean Home page
          } else {
            setError("Login Failed: " + data.message);  // Update error state
            console.log("Login Failed:", data.message);
          }
        })
        .catch(error => {
          setError("Login error: Server error or connection issue.");
          console.error("Login error:", error);
        });
    };

  return (
    <>
      <h1 className="mb-5">Dean Login</h1>
      <form onSubmit={handleLogin}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            value={deanID}  // Ensure this matches the state
            onChange={(e) => setDeanID(e.target.value)}  // Update state on change
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}  // Ensure this matches the state
            onChange={(e) => setPassword(e.target.value)}  // Update state on change
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </div>
        {error && <p>{error}</p>}
      </form>
      <div className="d-flex mt-5">
        <a type="button" href="/" className="btn btn-info">Student Login</a>
        <a type="button" href="/coordinator_login" className="btn btn-info mx-2">Coordinator Login</a>
        <a type="button" href="/faculty_login" className="btn btn-info">Faculty Login</a>
      </div>
    </>
  );
}
