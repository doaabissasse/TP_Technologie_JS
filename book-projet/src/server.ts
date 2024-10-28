import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Book from './Book'; // Adjust the import based on your file structure

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookdb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route to add a book
app.post('/api/books', async (req, res) => {
    console.log('Received data:', req.body); // Log the incoming request body
    try {
        const newBook = new Book(req.body); // This should work if req.body is correct
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully!' });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Failed to add book.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
