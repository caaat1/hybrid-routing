import app from './src/app.js';
import {connectToDatabase} from './src/config/db.js'; // Ensure this is a function that connects to the DB

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToDatabase(); // Call the function to connect to the database

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
