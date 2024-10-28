"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("./Book");
const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value, 10);
    const status = document.getElementById("status").value;
    const price = parseFloat(document.getElementById("price").value);
    const pagesRead = parseInt(document.getElementById("pagesRead").value, 10);
    const format = document.getElementById("format").value;
    const suggestedBy = document.getElementById("suggestedBy").value;
    const newBook = new Book_1.Book(title, author, pages, status, price, pagesRead, format, suggestedBy);
    // Save book data to a text file
    saveBookToFile(newBook);
});
// Function to simulate saving to a file
function saveBookToFile(book) {
    const fileData = book.toString();
    // Display the fileData in the div
    const displayDiv = document.getElementById("fileDataDisplay");
    displayDiv.innerText = "Book Data: " + fileData;
    // Trigger download (if desired)
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${book.title.replace(/\s+/g, "_")}_data.txt`;
    a.click();
    URL.revokeObjectURL(url);
}
