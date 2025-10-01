import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Bookings from './components/Bookings/Bookings';
import Countries from './components/ContentManagement/Countries';
import Locations from './components/ContentManagement/Locations';
import Activities from './components/ContentManagement/Activities';
import ActivityCategories from './components/ContentManagement/ActivityCategories';
import GalleryCities from './components/ContentManagement/GalleryCities';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import AuditLog from './components/AuditLog/AuditLog';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-screen">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-6 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/content/countries" element={<Countries />} />
            <Route path="/content/cities" element={<GalleryCities />} />
            <Route path="/content/locations" element={<Locations />} />
            <Route path="/content/categories" element={<ActivityCategories />} />
            <Route path="/content/activities" element={<Activities />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/audit" element={<AuditLog />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;