const express = require('express');
const path = require('path');
const app = express();
 
// Serve static files
app.use(express.static(__dirname));
 
// Redirect all routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'CricInfo.html'));
});
 
// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});