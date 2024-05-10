import { useState, useEffect } from 'react';

function StudentSettings() {
    const [studentId, setStudentId] = useState(localStorage.getItem('studentID'));
    const [studentDetails, setStudentDetails] = useState({ name: '', major: '' });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        fetchStudentDetails();
    }, []);

    const fetchStudentDetails = () => {
        fetch(`http://localhost:80/controller/GetStudentDetails.php?studentId=${studentId}`)
            .then(response => response.json())
            .then(data => {
                setStudentDetails(data);
            })
            .catch(error => console.error('Error fetching student details:', error));
    };

    const handlePasswordChange = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        fetch('http://localhost:80/controller/ChangeStudentPassword.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, currentPassword, newPassword })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        })
        .catch(error => console.error('Error changing password:', error));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mb-5">
                    <h3>Student Details</h3>
                    <p><strong>ID:</strong> {studentId}</p>
                    <p><strong>Name:</strong> {studentDetails.name}</p>
                    <p><strong>Major:</strong> {studentDetails.major}</p>
                </div>
                <div className="col-md-6">
                    <h3>Change Password</h3>
                    <form onSubmit={handlePasswordChange}>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input type="password" className="form-control" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2 mb-5">Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StudentSettings;