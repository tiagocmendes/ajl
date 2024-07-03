import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import LiveScore from './pages/LiveScore';
import Management from './pages/Management';
import MatchList from './pages/Management/MatchesList';
import MatchManagement from './pages/Management/MatchManagement';
import Header from './components/Header';
import { AuthProvider } from './store/AuthContext';

import './App.css';
import Teams from './pages/Teams';
import TeamDetails from './pages/Teams/TeamDetails';
import Results from './pages/Results';
import Score from './pages/Score';
import { routes } from './routes';
import TopScorers from './pages/TopScorers';
import TeamManagement from './pages/Management/TeamManagement';
import TeamManagementDetails from './pages/Management/TeamManagement/TeamManagementDetails';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKnockoutsScoreboard = async () => {
      try {
        await axios.get(routes.knockoutsScoreboard);
      } catch (error) {
        console.error(error);
      }
    };
    fetchKnockoutsScoreboard();
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <AuthProvider>
      <Router>
        {(!isLoading || window.location.pathname !== '/') && <Header />}
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} />} />
          <Route path="/results" element={<Results />} />
          <Route path="/scoreboard" element={<Score />} />
          <Route path="/scorers" element={<TopScorers />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<TeamDetails />} />
          <Route path="/live/:matchId" element={<LiveScore />} />
          <Route path="/management" element={<Management />} />
          <Route path="/management/matches" element={<MatchList />} />
          <Route
            path="/management/matches/:matchId"
            element={<MatchManagement />}
          />
          <Route path="/management/teams" element={<TeamManagement />} />
          <Route
            path="/management/teams/:teamId"
            element={<TeamManagementDetails />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
