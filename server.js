
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple in-memory database simulation
const users = {};

app.post('/register', (req, res) => {
    const { fingerprint, username } = req.body;
    if (!fingerprint || !username) return res.status(400).send('Missing fields');
    users[fingerprint] = username;
    res.status(200).send('User registered');
});

app.post('/login', (req, res) => {
    const { fingerprint } = req.body;
    if (users[fingerprint]) {
        res.status(200).send({ success: true, user: users[fingerprint] });
    } else {
        res.status(401).send({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
