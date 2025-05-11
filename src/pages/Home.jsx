import { useState } from "react";

function Home() {
  const [toRead, setToRead] = useState([]);
  const [title, setTitle] = useState("");

  const addBook = () => {
    if (title.trim()) {
      setToRead([...toRead, { id: Date.now(), title, done: false }]);
      setTitle("");
    }
  };

  const toggleDone = (id) => {
    setToRead(
      toRead.map((book) =>
        book.id === id ? { ...book, done: !book.done } : book
      )
    );
  };

  const removeBook = (id) => {
    setToRead(toRead.filter((book) => book.id !== id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📚 To-Read List</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Add a book..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addBook}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul>
        {toRead.map((book) => (
          <li
            key={book.id}
            className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow"
          >
            <span
              className={`flex-1 ${
                book.done ? "line-through text-gray-400" : ""
              }`}
            >
              {book.title}
            </span>
            <button
              onClick={() => toggleDone(book.id)}
              className="text-green-600 hover:underline text-sm"
            >
              {book.done ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => removeBook(book.id)}
              className="text-red-500 hover:underline text-sm ml-2"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
