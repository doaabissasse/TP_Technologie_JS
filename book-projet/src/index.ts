document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById('bookForm');
    if (bookForm) {
        bookForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const title = (document.getElementById('title') as HTMLInputElement).value;
            const author = (document.getElementById('author') as HTMLInputElement).value;
            const pages = parseInt((document.getElementById('pages') as HTMLInputElement).value, 10);
            const status = (document.getElementById('status') as HTMLSelectElement).value;
            const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
            const pagesRead = parseInt((document.getElementById('pagesRead') as HTMLInputElement).value, 10);
            const format = (document.getElementById('format') as HTMLSelectElement).value;
            const suggestedBy = (document.getElementById('suggestedBy') as HTMLInputElement).value;

            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, pages, status, price, pagesRead, format, suggestedBy }),
            });

            const data = await response.json();
            alert(data.message);
        });
    } else {
        console.error("Book form not found!");
    }
});

