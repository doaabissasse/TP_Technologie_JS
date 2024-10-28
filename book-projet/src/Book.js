"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.BookFormat = exports.BookStatus = void 0;
var BookStatus;
(function (BookStatus) {
    BookStatus["READ"] = "Read";
    BookStatus["RE_READ"] = "Re-read";
    BookStatus["DNF"] = "DNF";
    BookStatus["CURRENTLY_READING"] = "Currently reading";
    BookStatus["RETURNED_UNREAD"] = "Returned Unread";
    BookStatus["WANT_TO_READ"] = "Want to read";
})(BookStatus || (exports.BookStatus = BookStatus = {}));
var BookFormat;
(function (BookFormat) {
    BookFormat["PRINT"] = "Print";
    BookFormat["PDF"] = "PDF";
    BookFormat["EBOOK"] = "Ebook";
    BookFormat["AUDIOBOOK"] = "AudioBook";
})(BookFormat || (exports.BookFormat = BookFormat = {}));
class Book {
    constructor(title, author, pages, status, price, pagesRead, format, suggestedBy) {
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
    currentlyAt(pagesRead) {
        if (pagesRead > this.pages) {
            throw new Error("Pages read cannot exceed total pages.");
        }
        this.pagesRead = pagesRead;
        this.finished = this.pagesRead === this.pages;
    }
    // Serialize book data for storage
    toString() {
        return `${this.title};${this.author};${this.pages};${this.status};${this.price};${this.pagesRead};${this.format};${this.suggestedBy};${this.finished}`;
    }
    // Method to delete book (placeholder for now)
    deleteBook() {
        console.log(`Book "${this.title}" by ${this.author} deleted.`);
    }
}
exports.Book = Book;
exports.default = Book;
