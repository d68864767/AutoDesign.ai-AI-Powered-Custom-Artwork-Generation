// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Creating express app
const app = express();

// Using body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

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

// Route for Trademark Checking
app.post('/check-trademark', (req, res) => {
    const phrase = req.body.phrase;
    const python = spawn('python', ['trademarkChecker.py', phrase]);
    python.stdout.on('data', (data) => {
        res.send(data.toString());
    });
});

// Route for Design Format Standardization
app.post('/standardize-design', (req, res) => {
    const designPath = req.body.designPath;
    const python = spawn('python', ['designFormatStandardizer.py', designPath]);
    python.stdout.on('data', (data) => {
        res.send(data.toString());
    });
});

// Route for Scalability Management
app.post('/manage-scalability', (req, res) => {
    const brandLogos = req.body.brandLogos;
    const otherAssets = req.body.otherAssets;
    const python = spawn('python', ['scalabilityManager.py', brandLogos, otherAssets]);
    python.stdout.on('data', (data) => {
        res.send(data.toString());
    });
});

// Starting the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
