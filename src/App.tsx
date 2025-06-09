// src/App.tsx

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import LeaguesPage from './pages/LeaguesPage'
import TeamsPage from './pages/TeamsPage'
import PlayersPage from './pages/PlayersPage'
import VenuesPage from './pages/VenuesPage'
import FixturesPage from './pages/FixturesPage'
import PaymentsPage from './pages/PaymentsPage'

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />

    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Rutas protegidas */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute><Profile /></ProtectedRoute>}
      />
      <Route
        path="/leagues"
        element={<ProtectedRoute><LeaguesPage /></ProtectedRoute>}
      />
      <Route
        path="/teams"
        element={<ProtectedRoute><TeamsPage /></ProtectedRoute>}
      />
      <Route
        path="/players"
        element={<ProtectedRoute><PlayersPage /></ProtectedRoute>}
      />
      <Route
        path="/venues"
        element={<ProtectedRoute><VenuesPage /></ProtectedRoute>}
      />
      <Route
        path="/fixtures"
        element={<ProtectedRoute><FixturesPage /></ProtectedRoute>}
      />
      <Route
        path="/payments"
        element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>}
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
)

export default App
