import { useState } from 'react';

function StudentManagement() {
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [major, setMajor] = useState('');
    const [deleteStudentId, setDeleteStudentId] = useState('');

    const departmentId = localStorage.getItem('departmentID'); // Assuming the coordinator's department ID is stored here

    const handleAddStudent = (event) => {
        event.preventDefault();
        const studentData = {
            studentId,
            name,
            major,
            departmentId
        };

        fetch('http://localhost:80/controller/AddStudent.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            setStudentId('');
            setName('');
            setMajor('');
        })
        .catch(error => console.error('Error adding student:', error));
    };

    const handleDeleteStudent = (event) => {
        event.preventDefault();
        fetch(`http://localhost:80/controller/DeleteStudent.php?studentId=${deleteStudentId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            setDeleteStudentId('');
        })
        .catch(error => console.error('Error deleting student:', error));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>Add New Student</h2>
                    <form onSubmit={handleAddStudent}>
                        <div className="form-group">
                            <label htmlFor="studentId">Student ID</label>
                            <input type="number" className="form-control" id="studentId" value={studentId} onChange={e => setStudentId(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="major">Major</label>
                            <input type="text" className="form-control" id="major" value={major} onChange={e => setMajor(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2 mb-5">Add Student</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h2>Delete Student</h2>
                    <form onSubmit={handleDeleteStudent}>
                        <div className="form-group">
                            <label htmlFor="deleteStudentId">Student ID</label>
                            <input type="number" className="form-control" id="deleteStudentId" value={deleteStudentId} onChange={e => setDeleteStudentId(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-danger mt-2 mb-5">Delete Student</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StudentManagement;