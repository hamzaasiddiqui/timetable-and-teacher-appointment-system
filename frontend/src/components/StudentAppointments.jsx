import { useState, useEffect } from 'react';

function StudentAppointments() {
    const [professors, setProfessors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedProfessorId, setSelectedProfessorId] = useState('');
    const [datetime, setDatetime] = useState('');
    const [purpose, setPurpose] = useState('');
    const departmentId = localStorage.getItem('departmentID');
    const studentId = localStorage.getItem('studentID');

    useEffect(() => {
        fetchProfessors(departmentId);
        fetchAppointments(studentId);
    }, [departmentId, studentId]);

    const fetchProfessors = (departmentId) => {
        fetch(`http://localhost:80/controller/GetProfessors.php?departmentId=${departmentId}`)
            .then(response => response.json())
            .then(data => {
                setProfessors(data);
            })
            .catch(error => console.error('Error fetching professors:', error));
    };

    const fetchAppointments = (studentId) => {
        fetch(`http://localhost:80/controller/GetAppointments.php?studentId=${studentId}`)
            .then(response => response.json())
            .then(data => {
                setAppointments(data.data);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    };

    const handleAppointmentSubmit = (event) => {
        event.preventDefault();
        const appointmentData = {
            studentId: studentId,
            facultyId: selectedProfessorId,
            datetime,
            purpose
        };

        fetch('http://localhost:80/controller/AddAppointment.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                fetchAppointments(studentId);
                setDatetime('');
                setPurpose('');
                setSelectedProfessorId('');
            }
        })
        .catch(error => {
            console.error('Error making appointment:', error);
            alert('Failed to make appointment');
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <h2>Make an Appointment</h2>
                    <form onSubmit={handleAppointmentSubmit}>
                        <div className="form-group">
                            <label htmlFor="professor">Select Professor</label>
                            <select className="form-control" value={selectedProfessorId} onChange={e => setSelectedProfessorId(e.target.value)} required>
                                <option value="">Select Professor</option>
                                {professors.map(prof => (
                                    <option key={prof.facultyid} value={prof.facultyid}>{prof.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="datetime">Date and Time</label>
                            <input type="datetime-local" className="form-control" value={datetime} onChange={e => setDatetime(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="purpose">Purpose</label>
                            <textarea className="form-control" value={purpose} onChange={e => setPurpose(e.target.value)} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Submit</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h2>My Appointments</h2>
                    <div className="list-group">
                        {appointments.map(app => (
                            <div key={app.appointmentid} className="list-group-item list-group-item-action">
                                <h5 className="mb-1">{app.datetime}</h5>
                                <p className="mb-1">{app.purpose}</p>
                                <small>Professor: {app.faculty_name}</small><br/>
                                <small>Status: {app.status}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentAppointments;
