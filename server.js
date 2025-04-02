const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Log all requests
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 