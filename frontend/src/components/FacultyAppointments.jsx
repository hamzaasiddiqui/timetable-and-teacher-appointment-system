import { useState, useEffect } from 'react';

function FacultyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const facultyId = localStorage.getItem('facultyID');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = () => {
        fetch(`http://localhost:80/controller/GetFacultyAppointments.php?facultyId=${facultyId}`)
            .then(response => response.json())
            .then(data => {
                setAppointments(data.data);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    };

    const updateAppointmentStatus = (appointmentId, status) => {
        fetch('http://localhost:80/controller/UpdateAppointmentStatus.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appointmentId, status })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchAppointments();
        })
        .catch(error => console.error('Error updating appointment status:', error));
    };

    const deleteAppointment = (appointmentId) => {
        fetch('http://localhost:80/controller/DeleteAppointment.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appointmentId })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchAppointments();
        })
        .catch(error => console.error('Error deleting appointment:', error));
    };

    return (
        <div className="container">
            <h2>Faculty Appointments</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Date/Time</th>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.appointmentid}>
                            <td>{appointment.datetime}</td>
                            <td>{appointment.purpose}</td>
                            <td>{appointment.status}</td>
                            <td>
                                <select
                                    value={appointment.status}
                                    onChange={(e) => updateAppointmentStatus(appointment.appointmentid, e.target.value)}>
                                    <option value="pending">Pending</option>
                                    <option value="confirm">Confirm</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <button className="btn btn-danger" onClick={() => deleteAppointment(appointment.appointmentid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FacultyAppointments;
