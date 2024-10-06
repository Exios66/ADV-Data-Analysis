// File: server.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Route for contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Routes for statistical analysis pages
app.get('/basic-statistics', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'basic-statistics.html'));
});

app.get('/skewness-kurtosis', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'skewness-kurtosis.html'));
});

app.get('/cronbach-alpha', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cronbach-alpha.html'));
});

app.get('/correlation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'correlation.html'));
});

app.get('/t-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 't-test.html'));
});

app.get('/anova', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'anova.html'));
});

app.get('/regression', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'regression.html'));
});

app.get('/chi-square', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chi-square.html'));
});

app.get('/factor-analysis', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'factor-analysis.html'));
});

app.get('/mann-whitney', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mann-whitney.html'));
});

app.get('/cluster-analysis', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cluster-analysis.html'));
});

// Route for error handling (404)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
