import { useState, useEffect } from "react";

export default function FacultyManagement() {
    const [facultyID, setFacultyId] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        const storedDepartmentId = localStorage.getItem('departmentID');
        if (storedDepartmentId) {
            const deptId = parseInt(storedDepartmentId);
            setDepartmentId(deptId);
            fetchProfessors(deptId)
        } else {
            console.log('Dean Department ID not found in local storage!')
        }
    }, [departmentId]);

    const fetchProfessors = () => {
        fetch(`http://localhost:80/controller/GetProfessors.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const filteredProfessors = data.filter(course => parseInt(course.departmentid) === departmentId);
            setProfessors(filteredProfessors);
            console.log(filteredProfessors)
        })
        .catch(error => {
            console.error('Error fetching professors:', error);
        });
    }

    const handleAddProfessor = (event) => {
        event.preventDefault();

        const facultyData = {
            facultyId: facultyID,
            facultyName: facultyName,
            departmentId: departmentId
        };

        console.log(facultyData)

        fetch('http://localhost:80/controller/AddProfessor.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(facultyData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                setFacultyId('');
                setFacultyName('');
            }
        })
        .catch(error => {
            console.error('Error adding professor:', error);
            alert('Failed to add professor');
        });
    };

    const handleRemoveProfessor = (event) => {
        event.preventDefault();
        if (!facultyID) {
            alert('Please select a professor.');
            return;
        }
    
        fetch('http://localhost:80/controller/RemoveProfessor.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ facultyId: facultyID })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                setFacultyId('');
                fetchProfessors();
            }
        })
        .catch(error => {
            console.error('Error removing professor:', error);
            alert('Failed to remove professor');
        });
    };    

    return (
        <div className="container-fluid m-0 p-0" style={{height: '100vh'}}>
            <div className="row">
                <div className="col-md-5 ms-4">
                    <h1>Faculty Management</h1>
                    <div className="accordion" id="accordionExample">
                        <div className="card mb-2">
                            <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Add a New Professor
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    <form onSubmit={handleAddProfessor}>
                                        <div className="form-group">
                                            <label htmlFor="facultyId">Professor ID</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="facultyId"
                                              placeholder="Professor ID"
                                              value={facultyID}
                                              onChange={e => setFacultyId(e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="facultyName">Professor Name</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="facultyName"
                                              placeholder="Professor Name"
                                              value={facultyName}
                                              onChange={e => setFacultyName(e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="departmentId">Department ID</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="departmentId"
                                              placeholder="Department ID"
                                              value={departmentId}
                                              readOnly
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Add Professor</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-2">
                            <div className="card-header" id="headingFour">
                                <h2 className="mb-0">
                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Remove a Professor
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                <div className="card-body">
                                    <form onSubmit={handleRemoveProfessor}>
                                        <div className="form-group">
                                            <label htmlFor="removeFacultyId">Select Professor</label>
                                            <select className="form-control" id="removeFacultyId" value={facultyID} onChange={e => setFacultyId(e.target.value)} required>
                                                <option value="">Select a Professor</option>
                                                {professors.map(professor => (
                                                    <option key={professor.facultyid} value={professor.facultyid}>
                                                        {professor.name} ({professor.facultyid})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-danger mt-2">Remove Professor</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-between">
                                <h2>Faculty Professors</h2>
                                <button type="button" className="btn btn-primary" onClick={fetchProfessors}>Refresh</button>
                            </div>
                            <div className="table-responsive" style={{maxWidth: "800px"}}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Professor ID</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {professors.map(professor => (
                                            <tr key={professor.facultyid}>
                                                <td>{professor.facultyid}</td>
                                                <td>{professor.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
