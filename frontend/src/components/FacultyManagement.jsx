export default function FacultyManagement() {
    return (
        <div>
            <h2>Faculty Management</h2>
            <form>
                <h3>Add New Professor</h3>
                <input placeholder="Professor Name" />
                <input placeholder="Department ID" />
                <button type="submit">Add Professor</button>
            </form>
            <form>
                <h3>Assign Course to Professor</h3>
                <input placeholder="Course ID" />
                <input placeholder="Professor ID" />
                <button type="submit">Assign Course</button>
            </form>
        </div>
    );
}
