const express = require('express');
const path = require('path');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes
app.use('/api/articles', articleRoutes);

// Serve React app for all other routes
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'), err => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

module.exports = app;
