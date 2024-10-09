const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');  // Ensure you have a proper 'db.js' to handle DB connection logic
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define API routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/employees', employeeRoutes); // Employee management routes

// Serve uploaded files statically from '/uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Handle errors in the server startup and connection
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack
    res.status(500).json({ message: 'An error occurred, please try again later' });
});

// Serve the application on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle uncaught exceptions and promise rejections to avoid crashes
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Optional: Restart the server or exit gracefully
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});
