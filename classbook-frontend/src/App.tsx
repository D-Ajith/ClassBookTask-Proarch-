import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Sessions from './pages/Sessions';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';

const App: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/sessions" replace />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to={isAdmin ? "/admin" : "/sessions"} replace />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={isAdmin ? "/admin" : "/sessions"} replace />} />
          <Route path="/sessions" element={user ? <Sessions /> : <Navigate to="/login" replace />} />
          <Route path="/bookings" element={user ? <Bookings /> : <Navigate to="/login" replace />} />
          <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/sessions" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;