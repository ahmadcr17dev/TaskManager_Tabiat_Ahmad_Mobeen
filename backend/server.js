const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Uses Google and Cloudflare DNS

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/TaskRoutes');
const errorHandler = require('./middleware/ErrorHandler');

const app = express();
require('dotenv').config();

// Middleware 
app.use(cors());  // it allows frontend to call backend
app.use(express.json())  // parse incoming JSON body

// Routes
app.use('/tasks', taskRoutes);

// Health Check - No auth needed
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Task Manager API is running',
    });
})

// Unknown Routes - Must come after all real routes
app.use((req, res) => {
    app.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Route does not exist',
    })
})

// Global Error Handler
app.use(errorHandler);

// connect to DB & start server
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`)
    })
}).catch((err) => {
    console.error('MongoDB Connection failed', err.message);
    process.exit(1); // It will stop the app if DB fails
})