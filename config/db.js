const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quizmasterDB';

  if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
    console.error('MONGODB_URI must start with mongodb:// or mongodb+srv://');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);

    if (err.message.includes('IP') || err.message.includes('whitelist') || err.message.includes('Could not connect')) {
      console.error('Check MongoDB Atlas Network Access and add your current IP address.');
    }

    process.exit(1);
  }
};

module.exports = connectDB;
