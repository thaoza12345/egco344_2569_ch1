const express = require('express');
const app = express();

app.use(express.json());

// Mock student data
const students = [
    { id: 'E001', name: 'Alice Johnson', department: 'Computer Science', gpa: 3.85 },
    { id: 'E002', name: 'Bob Smith', department: 'Computer Science', gpa: 3.92 },
    { id: 'E003', name: 'Carol Davis', department: 'Electrical Engineering', gpa: 3.78 },
    { id: 'E004', name: 'David Lee', department: 'Electrical Engineering', gpa: 3.65 },
    { id: 'E005', name: 'Emma Wilson', department: 'Civil Engineering', gpa: 3.88 },
    { id: 'E006', name: 'Frank Brown', department: 'Civil Engineering', gpa: 3.72 },
    { id: 'E007', name: 'Grace Chen', department: 'Mechanical Engineering', gpa: 3.95 },
    { id: 'E008', name: 'Henry Martinez', department: 'Mechanical Engineering', gpa: 3.81 }
];

// API to get all students with GPA by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDepartment = students.reduce((acc, student) => {
        const dept = student.department;
        if (!acc[dept]) {
            acc[dept] = [];
        }
        acc[dept].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
        return acc;
    }, {});

    res.json(groupedByDepartment);
});

// API to query GPA by student ID
app.get('/api/students/:studentId/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.studentId);

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
        id: student.id,
        name: student.name,
        department: student.department,
        gpa: student.gpa
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});