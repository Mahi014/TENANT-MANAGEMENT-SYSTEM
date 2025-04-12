import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/admin-dashboard';
import CreatePage from './components/CreatePage';
import UpdatePage from './components/UpdatePage';
import ViewPage from './components/ViewPage';

// Add this Auth Wrapper component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/status', {
          credentials: 'include' 
        });
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/create" element={
          <ProtectedRoute>
            <CreatePage />
          </ProtectedRoute>
        }/>
        <Route path="/update" element={
          <ProtectedRoute>
            <UpdatePage />
          </ProtectedRoute>
        }/>
        <Route path="/view" element={
          <ProtectedRoute>
            <ViewPage />
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
};

export default App;