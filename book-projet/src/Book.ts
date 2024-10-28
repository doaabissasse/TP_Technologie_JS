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

export class Book {
    title: string;
    author: string;
    pages: number;
    status: BookStatus;
    price: number;
    pagesRead: number;
    format: BookFormat;
    suggestedBy: string;
    finished: boolean;

    constructor(
        title: string,
        author: string,
        pages: number,
        status: BookStatus,
        price: number,
        pagesRead: number,
        format: BookFormat,
        suggestedBy: string
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = pagesRead >= pages;
    }

    // Update the current reading status
    currentlyAt(pagesRead: number): void {
        if (pagesRead > this.pages) {
            throw new Error("Pages read cannot exceed total pages.");
        }
        this.pagesRead = pagesRead;
        this.finished = this.pagesRead === this.pages;
    }

    // Serialize book data for storage
    toString(): string {
        return `${this.title};${this.author};${this.pages};${this.status};${this.price};${this.pagesRead};${this.format};${this.suggestedBy};${this.finished}`;
    }

    // Method to delete book (placeholder for now)
    deleteBook(): void {
        console.log(`Book "${this.title}" by ${this.author} deleted.`);
    }
}

const bookSchema: Schema<IBook> = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(BookStatus),
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    pagesRead: {
        type: Number,
        required: true,
    },
    format: {
        type: String,
        enum: Object.values(BookFormat),
        required: true,
    },
    suggestedBy: {
        type: String,
        required: true,
    },
    finished: {
        type: Boolean,
        default: false,
    },
});

// Define the Book model using the IBook interface
const BookModel = mongoose.model<IBook>('Book', bookSchema);
export default BookModel;
