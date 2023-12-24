// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

// Creating express app
const app = express();

// Using body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files
app.use(express.static(__dirname));

// Route for AI-Driven Artwork Creation
app.post('/generate-artwork', (req, res) => {
    const textPrompt = req.body.textPrompt;
    const python = spawn('python', ['aiArtworkGenerator.py', textPrompt]);
    python.stdout.on('data', (data) => {
        res.send(data.toString());
    });
});

// Route for Brand Integration
app.post('/upload-brand', (req, res) => {
    const brandLogo = req.body.brandLogo;
    const brandColors = req.body.brandColors;
    const python = spawn('python', ['brandIntegration.py', brandLogo, brandColors]);
    python.stdout.on('data', (data) => {
        res.send(data.toString());
    });
});

// Starting the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Handling form submissions
document.getElementById('artwork-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const textPrompt = document.getElementById('text-prompt').value;
    fetch('/generate-artwork', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textPrompt }),
    })
    .then(response => response.text())
    .then(data => {
        // Handle the response data here
    });
});

document.getElementById('brand-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const brandLogo = document.getElementById('brand-logo').files[0];
    const brandColors = document.getElementById('brand-colors').value;
    const formData = new FormData();
    formData.append('brandLogo', brandLogo);
    formData.append('brandColors', brandColors);
    fetch('/upload-brand', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        // Handle the response data here
    });
});
