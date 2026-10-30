
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const secretKey = "mysecretkey";

let students = [];

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        const token = jwt.sign({ username }, secretKey, {
            expiresIn: "1h"
        });

        res.json({ token });
    } else {
        res.status(401).send("Invalid credentials");
    }
});

// Verify JWT
function verifyToken(req, res, next) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.status(403).send("Token required");
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid token");
        }

        req.user = decoded;
        next();
    });
}

// GET
app.get('/students', verifyToken, (req, res) => {
    res.json(students);
});

// POST
app.post('/students', verifyToken, (req, res) => {
    students.push(req.body);
    res.send("Student added");
});

// PUT
app.put('/students/:id', verifyToken, (req, res) => {
    let index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index !== -1) {
        students[index] = {
            ...students[index],
            ...req.body
        };
        res.send("Student updated");
    } else {
        res.status(404).send("Student not found");
    }
});

// DELETE
app.delete('/students/:id', verifyToken, (req, res) => {
    let index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index !== -1) {
        students.splice(index, 1);
        res.send("Student deleted");
    } else {
        res.status(404).send("Student not found");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

