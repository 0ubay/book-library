import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import MeetGreet from './pages/MeetGreet';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { setNavigate } from './utils/axios';

// Wrapper component to set up navigation
const AppContent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Set up navigation for axios interceptors
    setNavigate(navigate);

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);

  // Handle theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Public Route component - redirects to home if user is logged in
  const PublicRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div className="flex items-center py-4">
                <Link to="/" className="font-semibold text-primary-600 dark:text-primary-400 text-lg">
                  Book Library
                </Link>
              </div>
              {user && (
                <div className="flex items-center space-x-4">
                  <Link to="/" className="py-4 px-2 text-gray-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Home
                  </Link>
                  <Link to="/meet-greet" className="py-4 px-2 text-gray-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Meet & Greet
                  </Link>
                  <Link to="/profile" className="py-4 px-2 text-gray-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Profile
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-600 dark:text-gray-300">Welcome, {user.name}</span>
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Toggle dark mode"
                  >
                    {isDark ? (
                      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="py-2 px-4 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors dark:bg-primary-600 dark:hover:bg-primary-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login setUser={setUser} />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meet-greet"
            element={
              <ProtectedRoute>
                <MeetGreet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#059669',
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: '#dc2626',
            },
          },
        }}
      />
    </div>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

