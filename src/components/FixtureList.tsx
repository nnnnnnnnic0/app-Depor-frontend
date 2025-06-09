// src/components/FixtureList.tsx
import React from 'react'
import type { Fixture } from '../types'

interface Props {
  fixtures: Fixture[]
  onEdit: (f: Fixture) => void
  onDelete: (id: number) => void
}

const FixtureList: React.FC<Props> = ({ fixtures, onEdit, onDelete }) => (
  <table className="min-w-full bg-white border">
    <thead>
      <tr>
        <th className="px-4 py-2 border">ID</th>
        <th className="px-4 py-2 border">Liga ID</th>
        <th className="px-4 py-2 border">Local ID</th>
        <th className="px-4 py-2 border">Visitante ID</th>
        <th className="px-4 py-2 border">Cancha ID</th>
        <th className="px-4 py-2 border">Fecha y Hora</th>
        <th className="px-4 py-2 border">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {fixtures.map(f => (
        <tr key={f.id} className={!f.is_active ? 'bg-gray-100' : ''}>
          <td className="px-4 py-2 border">{f.id}</td>
          <td className="px-4 py-2 border">{f.league_id}</td>
          <td className="px-4 py-2 border">{f.home_team_id}</td>
          <td className="px-4 py-2 border">{f.away_team_id}</td>
          <td className="px-4 py-2 border">{f.venue_id}</td>
          <td className="px-4 py-2 border">{new Date(f.match_datetime).toLocaleString()}</td>
          <td className="px-4 py-2 border space-x-2">
            <button onClick={() => onEdit(f)} className="text-blue-600">Editar</button>
            <button onClick={() => onDelete(f.id)} className="text-red-600">Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default FixtureList
