// src/config/db.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

// A function that connects to the database
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Export mongoose to use in other files if needed (for models, etc.)
export default mongoose;
