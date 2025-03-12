import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

// Function to connect to the database
const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env['MONGO_URI'] ?? ''
    if (mongoURI.trim() === '') {
      throw new Error('MONGO_URI is not defined in the environment variables')
    }
    await mongoose.connect(mongoURI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1) // Exit the process in case of connection failure
  }
}

export default connectDB
