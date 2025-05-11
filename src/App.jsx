import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MeetGreet from "./pages/MeetGreet";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="bg-white shadow px-4 py-2 flex gap-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/meet" className="hover:underline">Meet & Greet</a>
          <a href="/profile" className="hover:underline">Profile</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meet" element={<MeetGreet />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
