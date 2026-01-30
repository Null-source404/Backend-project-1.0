const express = require('express');
const app = express();
const PORT = 4000;

// This is the "Magic" line.
// It replaces all that req.on('data') chunking logic!
app.use(express.json());

let resources = [
    { id: 1, title: "Node.js Basics", type: "Article", link: "https://nodejs.org/..." }
];

// 1. Home Route
app.get('/', (req, res) => {
    res.send('Welcome to VaultAPI - Your Personal Resource Library');
});

// 2. Get All Resources
app.get('/api/resources', (req, res) => {
    res.json(resources); // Express automatically sets Content-Type to JSON
});

// 3. Add a Resource
app.post('/api/resources', (req, res) => {
    const newResource = req.body; // No more buffering! req.body is ready to go.
    newResource.id = resources.length + 1;
    resources.push(newResource);
    res.status(201).json(newResource);
});

// 4. Delete a Resource
app.delete('/api/resources/:id', (req, res) => {
    const id = parseInt(req.params.id);
    resources = resources.filter(resource => resource.id !== id);
    res.sendStatus(204); // No Content
});

//5. Resource not found handler
app.use((req, res) => {
    res.status(404).send('Resource Not Found');
});

app.listen(PORT, () => {
    console.log(`VaultAPI running at http://localhost:${PORT}`);
});