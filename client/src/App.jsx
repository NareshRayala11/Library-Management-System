
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [quantity, setQuantity] = useState(1);
const [publishedYear, setPublishedYear] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        quantity: Number(quantity),
        publishedYear: publishedYear ? Number(publishedYear) : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    const newBook = await response.json();

    setBooks((previousBooks) => [...previousBooks, newBook]);

    setTitle("");
    setAuthor("");
    setQuantity(1);
    setPublishedYear("");

    alert("Book added successfully!");
  } catch (error) {
    console.error(error);
    alert("Could not add book. Please try again.");
  }
};
  useEffect(() => {
  fetch("http://localhost:5000/api/books")
    .then((response) => response.json())
    .then((data) => setBooks(data))
    .catch((error) => console.error("Error loading books:", error));
}, []);

  return (
    <div className="app">
      <header>
        <h1>📚 Library Management System</h1>


        
        <p>Manage your books easily</p>
      </header>

      <main>
        <section className="card">
          <h2>Add a Book</h2>

          <form onSubmit={handleSubmit}>
            <input
  type="text"
  placeholder="Book Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  required
/>

<input
  type="text"
  placeholder="Author Name"
  value={author}
  onChange={(e) => setAuthor(e.target.value)}
  required
/>

<input
  type="number"
  placeholder="Quantity"
  min="1"
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
  required
/>

<input
  type="number"
  placeholder="Published Year"
  value={publishedYear}
  onChange={(e) => setPublishedYear(e.target.value)}
/>
            <button type="submit">Add Book</button>
          </form>
        </section>

        <section className="card">
          <h2>Available Books</h2>

          {books.length === 0 ? (
            <p>No books displayed yet.</p>
          ) : (
            books.map((book) => (
  <p key={book._id}>
    {book.title} — {book.author} | Quantity: {book.quantity}
    <button onClick={() => handleDelete(book._id)}>
      Delete
    </button>
  </p>
))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
