import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Learn from "./pages/Learn";
import Vocabulary from "./pages/Vocabulary";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/vocabulary" element={<Vocabulary />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
