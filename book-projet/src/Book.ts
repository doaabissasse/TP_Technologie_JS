import mongoose, { Document, Schema } from 'mongoose';

export enum BookStatus {
    READ = "Read",
    RE_READ = "Re-read",
    DNF = "DNF",
    CURRENTLY_READING = "Currently reading",
    RETURNED_UNREAD = "Returned Unread",
    WANT_TO_READ = "Want to read",
}

export enum BookFormat {
    PRINT = "Print",
    PDF = "PDF",
    EBOOK = "Ebook",
    AUDIOBOOK = "AudioBook",
}

// Interface for TypeScript type safety
export interface IBook extends Document {
    title: string;
    author: string;
    pages: number;
    status: BookStatus;
    price: number;
    pagesRead: number;
    format: BookFormat;
    suggestedBy: string;
    finished: boolean;
}

const bookSchema: Schema<IBook> = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true },
    status: { type: String, enum: Object.values(BookStatus), required: true },
    price: { type: Number, required: true },
    pagesRead: { type: Number, required: true },
    format: { type: String, enum: Object.values(BookFormat), required: true },
    suggestedBy: { type: String, required: true },
    finished: { type: Boolean, default: false },
});

// Define the Book model using the IBook interface
const BookModel = mongoose.model<IBook>('Book', bookSchema);
export default BookModel;
