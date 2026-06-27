const express = require('express');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8')
        .split(/\r?\n/)
        .filter((line) => line && !line.trim().startsWith('#'))
        .forEach((line) => {
            const [key, ...valueParts] = line.split('=');
            if (key && !process.env[key.trim()]) {
                const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
                process.env[key.trim()] = value;
            }
        });
}

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db');

const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger);

app.get('/', (req, res) => res.redirect('/quizzes'));

app.use('/', quizRoutes);
app.use('/', questionRoutes);
app.use('/', resultRoutes);

app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Page not found',
        message: 'The page you requested could not be found.'
    });
});

app.use(errorHandler);

const startServer = async () => {
    await connectDB();

    const server = app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use. Set PORT to another value and restart the app.`);
            process.exit(1);
        }

        throw error;
    });
};

startServer();
