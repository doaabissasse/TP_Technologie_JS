"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const Book_1 = __importDefault(require("./Book")); // Ensure path is correct
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Connexion à MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/bookdb')
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error('Erreur de connexion MongoDB :', err));
// Route to add a book
app.post('/api/books', async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const newBook = new Book_1.default(req.body); // Use the Mongoose model here
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully!' });
    }
    catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Failed to add book.' });
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
