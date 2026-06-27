const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const envPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8')
        .split(/\r?\n/)
        .filter((line) => line && !line.trim().startsWith('#'))
        .forEach((line) => {
            const [key, ...valueParts] = line.split('=');
            if (key && !process.env[key.trim()]) {
                process.env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
            }
        });
}

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('MONGODB_URI is missing. Add it to your .env file.');
    process.exit(1);
}

if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    console.error('MONGODB_URI must start with mongodb:// or mongodb+srv://');
    process.exit(1);
}

mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
    .then(async () => {
        console.log('MongoDB connection OK');
        await mongoose.disconnect();
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);

        if (error.message.includes('IP') || error.message.includes('whitelist') || error.message.includes('Could not connect')) {
            console.error('Fix: MongoDB Atlas > Network Access > Add IP Address > Add Current IP Address.');
        }

        process.exit(1);
    });
