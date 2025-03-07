// FILE: server.js

import 'module-alias/register.js' // Ensure this is the first line
import app from './dist/app.js'
import connectToDB from './dist/config/db.js' // Ensure this is a function that connects to the DB

// TODO: Add the PORT environment variable
// TODO: move the literal to a constant
// TODO: convert this file to TS
// TODO: move this file to src or to src/index.ts
// TODO: remove console.log's and dev comments
// TODO: switch to production mode

const PORT = process.env.PORT || 3000
// Connect to MongoDB
connectToDB() // Call the function to connect to the database

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
