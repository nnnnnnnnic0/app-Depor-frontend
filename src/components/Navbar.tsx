// src/components/Navbar.tsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar: React.FC = () => {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex space-x-4">
        {token ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/leagues" className="hover:underline">Ligas</Link>
            <Link to="/teams" className="hover:underline">Equipos</Link>
            <Link to="/players" className="hover:underline">Jugadores</Link>
            <Link to="/venues" className="hover:underline">Canchas</Link>
            <Link to="/fixtures" className="hover:underline">Fixtures</Link>
            <Link to="/payments" className="hover:underline">Pagos</Link>
            <Link to="/profile" className="hover:underline">Perfil</Link>
          </>
        ) : (
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </div>
      {token && (
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  )
}

export default Navbar
