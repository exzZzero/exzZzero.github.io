const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// JSON-Datei für Nutzer
const USERS_FILE = './users.json';

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Nutzer aus Datei laden
const loadUsers = () => {
    if (fs.existsSync(USERS_FILE)) {
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    }
    return [];
};

// Nutzer in Datei speichern
const saveUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// API-Routen
app.post('/users', (req, res) => {
    const { email, password } = req.body;

    // Nutzerliste laden
    const users = loadUsers();

    // Prüfen, ob Nutzer bereits existiert
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Nutzer hinzufügen und speichern
    users.push({ email, password });
    saveUsers(users);

    res.status(201).json({ message: 'User created' });
});

app.get('/users', (req, res) => {
    const users = loadUsers();
    res.json(users);
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = loadUsers();

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Server starten
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    console.log(`Access it locally via http://localhost:${PORT}`);
});
