// lib/db.ts
import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in your .env.local file');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    throw err;
  }
}
