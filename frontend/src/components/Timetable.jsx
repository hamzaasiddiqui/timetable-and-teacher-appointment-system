import { useState, useEffect } from 'react';

function Timetable() {
    const [timetable, setTimetable] = useState([]);
    const departmentID = localStorage.getItem('departmentID');

    useEffect(() => {
        fetch(`http://localhost:80/controller/GetTimetable.php?departmentID=${departmentID}`)
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    const structuredData = transformData(data.data);
                    setTimetable(structuredData);
                } else {
                    console.error('Failed to load timetable:', data.error);
                }
            })
            .catch(error => console.error('Error fetching timetable:', error));
    }, [departmentID]);

    function transformData(data) {
        const timeMap = {};

        data.forEach(slot => {
            const timeKey = `${slot.starttime} - ${slot.endtime}`;
            if (!timeMap[timeKey]) {
                timeMap[timeKey] = { startTime: slot.starttime, endTime: slot.endtime, monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' };
            }
            timeMap[timeKey][slot.day.toLowerCase()] = `<strong>${slot.title}</strong> </br> ${slot.location}`;
        });

        return Object.values(timeMap);
    }

    return (
        <div className="container-fluid p-0">
            <table className="table  table-striped">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((slot, index) => (
                        <tr key={index}>
                            <td>{`${slot.startTime} - ${slot.endTime}`}</td>
                            <td dangerouslySetInnerHTML={{__html: slot.monday}}></td>
                            <td dangerouslySetInnerHTML={{__html: slot.tuesday}}></td>
                            <td dangerouslySetInnerHTML={{__html: slot.wednesday}}></td>
                            <td dangerouslySetInnerHTML={{__html: slot.thursday}}></td>
                            <td dangerouslySetInnerHTML={{__html: slot.friday}}></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Timetable;
