"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById('bookForm');
    if (bookForm) {
        bookForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('title')?.value || '';
            const author = document.getElementById('author')?.value || '';
            const pages = parseInt(document.getElementById('pages')?.value || '0', 10);
            const status = document.getElementById('status')?.value || '';
            const price = parseFloat(document.getElementById('price')?.value || '0');
            const pagesRead = parseInt(document.getElementById('pagesRead')?.value || '0', 10);
            const format = document.getElementById('format')?.value || '';
            const suggestedBy = document.getElementById('suggestedBy')?.value || '';
            try {
                const response = await fetch('http://localhost:5000/api/books', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, author, pages, status, price, pagesRead, format, suggestedBy }),
                });
                const data = await response.json();
                alert(data.message);
            }
            catch (error) {
                console.error("Error submitting form:", error);
            }
        });
    }
    else {
        console.error("Book form not found!");
    }
});
