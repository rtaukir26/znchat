// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./Pages/Chat/Chat";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
