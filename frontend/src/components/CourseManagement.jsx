import { useState, useEffect } from "react";

export default function CourseManagement() {
    const [courseID, setCourseId] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [courses, setCourses] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [allocateCourseId, setAllocateCourseId] = useState('');
    const [allocateProfessorId, setAllocateProfessorId] = useState('');

    // const departmentId = "1";

    useEffect(() => {
        const storedDepartmentId = localStorage.getItem('deanDepartmentID');
        if (storedDepartmentId) {
            const deptId = parseInt(storedDepartmentId); // Convert to integer if necessary
            setDepartmentId(deptId);
            fetchCourses(deptId); // Ensure this is called after departmentId is set
            fetchProfessors(deptId)
        } else {
            console.log('Dean Department ID not found in local storage!')
        }
    }, [departmentId]);

    const fetchCourses = () => {
        fetch(`http://localhost:80/controller/GetCourses.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Filter courses by departmentId
            const filteredCourses = data.filter(course => parseInt(course.departmentid) === departmentId);
            setCourses(filteredCourses);
            console.log(filteredCourses)
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
    }

    const fetchProfessors = () => {
        fetch(`http://localhost:80/controller/GetProfessors.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Filter courses by departmentId
            const filteredProfessors = data.filter(course => parseInt(course.departmentid) === departmentId);
            setProfessors(filteredProfessors);
            console.log(filteredProfessors)
        })
        .catch(error => {
            console.error('Error fetching professors:', error);
        });
    }


    const handleAddCourse = (event) => {
        event.preventDefault();

        const courseData = {
            courseId: courseID,
            title: courseTitle,
            departmentId: departmentId
        };

        fetch('http://localhost:80/controller/AddCourse.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                // Reset form if successful
                setCourseId('');
                setCourseTitle('');
            }
        })
        .catch(error => {
            console.error('Error adding course:', error);
            alert('Failed to add course');
        });
    };

    const handleAllocateProfessor = (event) => {
        event.preventDefault();

        fetch('http://localhost:80/controller/AllocateProfessor.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseid: allocateCourseId,
                facultyid: allocateProfessorId
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message.includes('successfully')) {
                fetchCourses(); // Refresh courses to update assigned professors
            }
        })
        .catch(error => {
            console.error('Error allocating professor:', error);
            alert('Failed to allocate professor');
        });
    };

    return (
        <div className="container-fluid m-0 p-0" style={{height: '100vh'}}>
            <div className="row">
                <div className="col-md-5 ms-4">
                    <h1>Course Management</h1>
                    <div className="accordion" id="accordionExample">
                        <div className="card mb-2">
                            <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Add a New Course
                                    </button>
                                </h2>
                            </div>

                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    <form onSubmit={handleAddCourse}>
                                        <div className="form-group">
                                            <label htmlFor="courseId">Course ID</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="courseId"
                                              placeholder="Course ID"
                                              value={courseID}
                                              onChange={e => setCourseId(e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="courseTitle">Course Title</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="courseTitle"
                                              placeholder="Course Title"
                                              value={courseTitle}
                                              onChange={e => setCourseTitle(e.target.value)} 
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
                                        <button type="submit" className="btn btn-primary">Add Course</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-2">
                            <div className="card-header" id="headingTwo">
                                <h2 className="mb-0">
                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Allocate Professor to Course
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                <div className="card-body">
                                    <form onSubmit={handleAllocateProfessor}>
                                        <div className="form-group">
                                            <label htmlFor="allocateCourseId">Course ID</label>
                                            <select className="form-control" id="allocateCourseId" onChange={e => setAllocateCourseId(e.target.value)} required>
                                                <option value="">Select a Course</option>
                                                {courses.map(course => (
                                                    <option key={course.courseid} value={course.courseid}>{course.courseid} - {course.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="allocateProfessorId">Professor ID</label>
                                            <select className="form-control" id="allocateProfessorId" onChange={e => setAllocateProfessorId(e.target.value)} required>
                                                <option value="">Select a Professor</option>
                                                {professors.map(professor => (
                                                    <option key={professor.facultyid} value={professor.facultyid}>{professor.facultyid} - {professor.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2">Allocate Professor</button>
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
                                <h2>Courses</h2>
                                <button type="button" className="btn btn-primary" onClick={fetchCourses}>Refresh</button>
                            </div>
                            <div className="table-responsive" style={{maxWidth: "800px"}}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Course ID</th>
                                            <th>Title</th>
                                            <th>Assigned Faculty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.map(course => (
                                            <tr key={course.courseid}>
                                                <td>{course.courseid}</td>
                                                <td>{course.title}</td>
                                                <td>{course.assignedfacultyid || 'Unassigned'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
