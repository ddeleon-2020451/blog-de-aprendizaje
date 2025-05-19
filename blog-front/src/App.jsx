import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './assets/pages/HomePage';
import PostPage from "./assets/pages/PostPage";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="*" element={<p>404 | Página no encontrada</p>} />
      </Routes>
    </Router>
  );
}

export default App;
