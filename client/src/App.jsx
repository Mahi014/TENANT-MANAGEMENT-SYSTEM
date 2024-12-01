import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/admin-dashboard';
import CreatePage from './components/CreatePage';
import UpdatePage from './components/UpdatePage';
import ViewPage from './components/ViewPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
