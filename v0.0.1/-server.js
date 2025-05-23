// FILE: server.js
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config() // Ensure env variables are available before any imports

if (process.env.NODE_ENV !== 'production') {
  require('module-alias/register.js')
}
import defaults from './src/defaults.js'
import app from './dist/app.js'
import connectToDB from './dist/config/db.js' // Ensure this is a function that connects to the DB

// TODO: convert this file to TS
// TODO: move this file to src or to src/index.ts

const PORT = process.env.PORT || defaults.PORT
// Connect to MongoDB
connectToDB() // Call the function to connect to the database
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Server is running on http://localhost:${PORT}`)
      }
    })
  })
  .catch((err) => {
    console.error('Database connection failed:', err)
    process.exit(1) // Exit process if DB connection fails
  })
