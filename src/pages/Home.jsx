import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import api from '../utils/axios';

function Home() {
  console.log('Home component rendering');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newBook, setNewBook] = useState({
    title: "",
    author: ""
  });

  // Fetch books when component mounts
  useEffect(() => {
    console.log('Home component mounted');
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    console.log('Fetching books...');
    try {
      const response = await api.get('/books');
      console.log('Books fetched:', response.data);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to load books');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newBook.title.trim() || !newBook.author.trim()) {
      toast.error('Please fill in both title and author');
      return;
    }

    try {
      const response = await api.post(
        '/books',
        {
          title: newBook.title.trim(),
          author: newBook.author.trim()
        }
      );
      
      setBooks(prev => [...prev, response.data]);
      setNewBook({
        title: "",
        author: ""
      });
      toast.success('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add book';
      toast.error(errorMessage);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(prev => prev.filter(book => book._id !== id));
      toast.success('Book removed from list');
    } catch (error) {
      console.error('Error deleting book:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete book';
      toast.error(errorMessage);
    }
  };

  const handleToggleFinished = async (id) => {
    try {
      const book = books.find(b => b._id === id);
      const response = await api.put(
        `/books/${id}`,
        { isFinished: !book.isFinished }
      );
      
      setBooks(prev => prev.map(book => 
        book._id === id ? response.data : book
      ));
      
      toast.success(response.data.isFinished ? 'Book marked as finished!' : 'Book marked as unfinished');
    } catch (error) {
      console.error('Error updating book:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update book status';
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 dark:text-gray-200">
        <div className="animate-pulse">Loading your books...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">My Reading List</h1>

      <form onSubmit={handleAddBook} className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              placeholder="Enter book title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              required
            />
          </div>
          
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              placeholder="Enter author name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors dark:bg-primary-700 dark:hover:bg-primary-800"
        >
          Add Book
        </button>
      </form>

      <div className="space-y-4">
        {books.length > 0 ? (
          books.map(book => (
            <div key={book._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="font-semibold dark:text-white">{book.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">by {book.author}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleFinished(book._id)}
                  className={`px-3 py-1 rounded ${
                    book.isFinished
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {book.isFinished ? 'Finished' : 'Not Read'}
                </button>
                <button
                  onClick={() => handleDeleteBook(book._id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No books in your list yet. Add some books to get started!
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
