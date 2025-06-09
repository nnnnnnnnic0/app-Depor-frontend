// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

interface Counts {
  leagues: number
  teams: number
  players: number
  payments: number
}

const Dashboard: React.FC = () => {
  const [counts, setCounts] = useState<Counts>({ leagues: 0, teams: 0, players: 0, payments: 0 })
  const [nextFixtures, setNextFixtures] = useState<Fixture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const [lRes, tRes, pRes, payRes, fRes] = await Promise.all([
          api.get('/leagues'),
          api.get('/teams'),
          api.get('/players'),
          api.get('/payments'),
          api.get<Fixture[]>('/fixtures')
        ])
        setCounts({
          leagues: lRes.data.length,
          teams: tRes.data.length,
          players: pRes.data.length,
          payments: payRes.data.length
        })
        // Ordenar y tomar los 3 más próximos
        const sorted = fRes.data
          .filter(f => f.is_active)
          .sort((a, b) =>
            new Date(a.match_datetime).getTime() - new Date(b.match_datetime).getTime()
          )
        setNextFixtures(sorted.slice(0, 3))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  if (loading) return <p className="p-6">Cargando dashboard...</p>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link to="/leagues" className="bg-white p-4 rounded shadow hover:shadow-md">
          <h2 className="text-lg font-semibold">Ligas</h2>
          <p className="text-2xl">{counts.leagues}</p>
        </Link>
        <Link to="/teams" className="bg-white p-4 rounded shadow hover:shadow-md">
          <h2 className="text-lg font-semibold">Equipos</h2>
          <p className="text-2xl">{counts.teams}</p>
        </Link>
        <Link to="/players" className="bg-white p-4 rounded shadow hover:shadow-md">
          <h2 className="text-lg font-semibold">Jugadores</h2>
          <p className="text-2xl">{counts.players}</p>
        </Link>
        <Link to="/payments" className="bg-white p-4 rounded shadow hover:shadow-md">
          <h2 className="text-lg font-semibold">Pagos</h2>
          <p className="text-2xl">{counts.payments}</p>
        </Link>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Próximos partidos</h2>
        {nextFixtures.length === 0 ? (
          <p>No hay fixtures próximos.</p>
        ) : (
          <ul className="space-y-2">
            {nextFixtures.map(f => (
              <li key={f.id} className="bg-white p-3 rounded shadow flex justify-between">
                <span>
                  <strong>{f.home_team_id}</strong> vs <strong>{f.away_team_id}</strong> en cancha #{f.venue_id}
                </span>
                <span>{new Date(f.match_datetime).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Dashboard
