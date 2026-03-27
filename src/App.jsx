import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import ScannerPage from './pages/ScannerPage';
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';

// Placeholder Pages
const ProfilePage = () => <div style={{ padding: '20px' }}> <h1 className="animate-fade-in">Profile</h1> </div>;

function App() {
  return (
    <Router>
      <div className="container">
        <div className="content" style={{ minHeight: '100vh', padding: '20px 0' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/scan" element={<ScannerPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
