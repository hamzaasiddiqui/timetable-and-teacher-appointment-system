import { useState, useEffect } from 'react';

function CreateTimeTable() {
    const [timetable, setTimetable] = useState([
        { startTime: '', endTime: '', monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {} }
    ]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const departmentID = localStorage.getItem('departmentID');
        fetchCourses(departmentID);
    }, []);

    const fetchCourses = (departmentId) => {
        fetch(`http://localhost:80/controller/GetCourses.php?departmentId=${departmentId}`)
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses:', error));
    };

    const handleTimeChange = (index, field, event) => {
        const updatedTimetable = [...timetable];
        updatedTimetable[index][field] = event.target.value;
        setTimetable(updatedTimetable);
    };

    const handleDayChange = (day, index, type, event) => {
        const updatedTimetable = [...timetable];
        updatedTimetable[index][day][type] = event.target.value;
        setTimetable(updatedTimetable);
    };

    const addRow = () => {
        setTimetable([...timetable, { startTime: '', endTime: '', monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {} }]);
    };

    const removeRow = (index) => {
        const updatedTimetable = timetable.filter((_, i) => i !== index);
        setTimetable(updatedTimetable);
    };

    const saveTimetable = () => {
        const departmentID = localStorage.getItem('departmentID');
        fetch('http://localhost:80/controller/SaveTimetable.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ timetable, departmentID })
        })
        .then(response => response.json())
        .then(data => alert('Timetable saved successfully!', console.log(data)))
        .catch(error => console.error('Error saving timetable:', error));
    };

    return (
        <div className="container-fluid" style={{height: '100vh'}}>
            <button onClick={addRow} className="btn btn-success mb-3">Add Row</button>
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((slot, index) => (
                        <tr key={index}>
                            <td>
                                <input type="time" className="form-control mb-1" value={slot.startTime} onChange={event => handleTimeChange(index, 'startTime', event)} placeholder="Start Time"/>
                                <input type="time" className="form-control" value={slot.endTime} onChange={event => handleTimeChange(index, 'endTime', event)} placeholder="End Time"/>
                            </td>
                            {Object.keys(slot).filter(day => day !== 'startTime' && day !== 'endTime').map(day => (
                                <td key={day}>
                                    <select className="form-control mb-2" value={slot[day].course || ''} onChange={event => handleDayChange(day, index, 'course', event)}>
                                        <option value="">Select Course</option>
                                        {courses.map(course => (
                                            <option key={course.courseid} value={course.courseid}>{course.title}</option>
                                        ))}
                                    </select>
                                    <input type="text" className="form-control" placeholder="Venue" value={slot[day].venue || ''} onChange={event => handleDayChange(day, index, 'venue', event)}/>
                                </td>
                            ))}
                            <td>
                                <button onClick={() => removeRow(index)} className="btn btn-danger">-</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={saveTimetable} className="btn btn-primary">Save Timetable</button>
        </div>
    );
}

export default CreateTimeTable;
