-- Instructions:
-- Run: psql -U postgres
-- Run the script: \i /path/to/database.sql


-- Switch to the default database to perform operations
\c postgres;

CREATE DATABASE timetable_system;

-- Connect to the newly created database to create tables
\c timetable_system;

-- Table: faculty_department
CREATE TABLE faculty_department (
    departmentid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    deanid INTEGER
);

-- Table: dean
CREATE TABLE dean (
    deanid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    departmentid INTEGER,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (departmentid) REFERENCES faculty_department(departmentid)
);

ALTER TABLE faculty_department
ADD CONSTRAINT fk_dean FOREIGN KEY (deanid) REFERENCES dean(deanid);

-- Table: coordinator
CREATE TABLE coordinator (
    coordinatorid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    departmentid INTEGER NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (departmentid) REFERENCES faculty_department(departmentid)
);

-- Table: faculty_professors
CREATE TABLE faculty_professors (
    facultyid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    departmentid INTEGER,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (departmentid) REFERENCES faculty_department(departmentid)
);

-- Table: student
CREATE TABLE student (
    studentid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    major VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    facultyid INTEGER,
    FOREIGN KEY (facultyid) REFERENCES faculty_department(departmentid)
);

-- Table: course
CREATE TABLE course (
    courseid VARCHAR PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    departmentid INTEGER,
    assignedfacultyid INTEGER,
    FOREIGN KEY (departmentid) REFERENCES faculty_department(departmentid),
    FOREIGN KEY (assignedfacultyid) REFERENCES faculty_professors(facultyid)
);

-- Table: timetable
CREATE TABLE timetable (
    timetableid SERIAL PRIMARY KEY
);

-- Table: timeslot
CREATE TABLE timeslot (
    timeslotid SERIAL PRIMARY KEY,
    timetableid INTEGER NOT NULL,
    courseid VARCHAR NOT NULL,
    starttime TIME WITHOUT TIME ZONE NOT NULL,
    endtime TIME WITHOUT TIME ZONE NOT NULL,
    day VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    FOREIGN KEY (timetableid) REFERENCES timetable(timetableid),
    FOREIGN KEY (courseid) REFERENCES course(courseid),
    CHECK (LOWER(day) = ANY (ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday']))
);

-- Table: appointment
CREATE TABLE appointment (
    appointmentid SERIAL PRIMARY KEY,
    studentid INTEGER,
    facultyid INTEGER,
    datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    purpose TEXT,
    status VARCHAR(10) DEFAULT 'pending',
    FOREIGN KEY (studentid) REFERENCES student(studentid),
    FOREIGN KEY (facultyid) REFERENCES faculty_professors(facultyid)
);

-- Inserting dummy data into dean
-- Default password: 'faculty_dean'
INSERT INTO dean (name, departmentid, password) VALUES
('Zahid Halim', 1, '$2y$10$12eVAh0cIRbTXTQl1IYq6.IPIQXGZIHGoUxduMQgtHFXHCk2ADHeS'),
('Zaqaria Qureshi', 2, '$2y$10$12eVAh0cIRbTXTQl1IYq6.IPIQXGZIHGoUxduMQgtHFXHCk2ADHeS'),
('Atta Ullah Hamdani', 3, '$2y$10$12eVAh0cIRbTXTQl1IYq6.IPIQXGZIHGoUxduMQgtHFXHCk2ADHeS'),
('Abdullah bin Muraad', 4, '$2y$10$12eVAh0cIRbTXTQl1IYq6.IPIQXGZIHGoUxduMQgtHFXHCk2ADHeS'),
('Quratulain Baloch', 5, '$2y$10$12eVAh0cIRbTXTQl1IYq6.IPIQXGZIHGoUxduMQgtHFXHCk2ADHeS'),
('Irgaziev Bakhadir', 6, '$2y$10$12eVAh0cIRbTXTQl1IYq6.IPIQXGZIHGoUxduMQgtHFXHCk2ADHeS');

-- Inserting data into coordinator
-- Default password: 'faculty_coordinator'
INSERT INTO coordinator (name, departmentid, password) VALUES
('Naila Nasrin', 1, '$2y$10$QoqPtgWt1skapBZvr7r1J.rYg/nr3xKqeKfFR2QYQBRGBXoENdTyu'),
('Mushtaq Iskandar', 2, '$2y$10$QoqPtgWt1skapBZvr7r1J.rYg/nr3xKqeKfFR2QYQBRGBXoENdTyu'),
('Akmal Shahbaz', 3, '$2y$10$QoqPtgWt1skapBZvr7r1J.rYg/nr3xKqeKfFR2QYQBRGBXoENdTyu'),
('Shagufta Tasnim', 4, '$2y$10$QoqPtgWt1skapBZvr7r1J.rYg/nr3xKqeKfFR2QYQBRGBXoENdTyu'),
('Jahangir Jamshed', 5, '$2y$10$QoqPtgWt1skapBZvr7r1J.rYg/nr3xKqeKfFR2QYQBRGBXoENdTyu'),
('Talha Yunus', 6, '$2y$10$QoqPtgWt1skapBZvr7r1J.rYg/nr3xKqeKfFR2QYQBRGBXoENdTyu');
