import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LiveScore from "./pages/LiveScore";
import Management from "./pages/Management";
import GamesList from "./pages/Management/GamesList";
import GameManagement from "./pages/Management/GameManagement";
import { AuthProvider } from "./store/AuthContext";


import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live/:gameId" element={<LiveScore />} />
          <Route path="/management" element={<Management />} />
          <Route path="/management/games" element={<GamesList />} />
          <Route path="/management/games/:gameId" element={<GameManagement />} />
        </Routes>    
      </Router>
    </AuthProvider>
);
}

export default App;
