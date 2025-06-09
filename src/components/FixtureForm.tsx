// src/components/FixtureForm.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Fixture } from '../types'

interface Props {
  initialData: Fixture | null
  onSuccess: () => void
  onCancel: () => void
}

const FixtureForm: React.FC<Props> = ({ initialData, onSuccess, onCancel }) => {
  const [leagueId, setLeagueId] = useState<number>(0)
  const [homeTeamId, setHomeTeamId] = useState<number>(0)
  const [awayTeamId, setAwayTeamId] = useState<number>(0)
  const [venueId, setVenueId] = useState<number>(0)
  const [matchDatetime, setMatchDatetime] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leagues, setLeagues] = useState<{id:number,name:string}[]>([])
  const [teams, setTeams] = useState<{id:number,name:string}[]>([])
  const [venues, setVenues] = useState<{id:number,name:string}[]>([])

  // Cargar opciones
  useEffect(() => {
    api.get('/leagues').then(r => setLeagues(r.data))
    api.get('/teams').then(r => setTeams(r.data))
    api.get('/venues').then(r => setVenues(r.data))
  }, [])

  useEffect(() => {
    if (initialData) {
      setLeagueId(initialData.league_id)
      setHomeTeamId(initialData.home_team_id)
      setAwayTeamId(initialData.away_team_id)
      setVenueId(initialData.venue_id)
      setMatchDatetime(initialData.match_datetime.slice(0,16)) // "YYYY-MM-DDThh:mm"
    } else {
      setLeagueId(0); setHomeTeamId(0); setAwayTeamId(0); setVenueId(0); setMatchDatetime('')
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = {
        league_id: leagueId,
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
        venue_id: venueId,
        match_datetime: new Date(matchDatetime).toISOString()
      }
      if (initialData) {
        await api.put(`/fixtures/${initialData.id}`, payload)
      } else {
        await api.post('/fixtures', payload)
      }
      onSuccess()
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error guardando fixture')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 mb-4 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[ 
          { label: 'Liga', value: leagueId, setter: setLeagueId, options: leagues },
          { label: 'Local', value: homeTeamId, setter: setHomeTeamId, options: teams },
          { label: 'Visitante', value: awayTeamId, setter: setAwayTeamId, options: teams },
          { label: 'Cancha', value: venueId, setter: setVenueId, options: venues },
        ].map(({label,value,setter,options})=>(
          <div key={label}>
            <label className="block text-sm">{label}</label>
            <select
              className="mt-1 w-full p-2 border rounded"
              value={value}
              onChange={e => setter(Number(e.target.value))}
              required
            >
              <option value={0}>Selecciona...</option>
              {options.map(o=>(
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>
        ))}
        {/* Fecha y hora */}
        <div className="md:col-span-2">
          <label className="block text-sm">Fecha y hora</label>
          <input
            type="datetime-local"
            className="mt-1 w-full p-2 border rounded"
            value={matchDatetime}
            onChange={e => setMatchDatetime(e.target.value)}
            required
          />
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex justify-end space-x-2 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? 'Guardando...' : (initialData ? 'Actualizar' : 'Crear')}
        </button>
      </div>
    </form>
  )
}

export default FixtureForm
