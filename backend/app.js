const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();

// Enable CORS for all routes
app.use(cors());

// Define your API routes here
app.get('/api/data', (req, res) => {
  const data = { message: 'Hello from the backend!' };
  res.json(data);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});