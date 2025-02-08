// src/config/db.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

export default mongoose;
