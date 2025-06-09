// src/components/TeamList.tsx
import React from 'react'
import type { Team } from '../types'

interface Props {
  teams: Team[]
  onEdit: (t: Team) => void
  onDelete: (id: number) => void
}

const TeamList: React.FC<Props> = ({ teams, onEdit, onDelete }) => (
  <table className="min-w-full bg-white border">
    <thead>
      <tr>
        <th className="px-4 py-2 border">ID</th>
        <th className="px-4 py-2 border">Nombre</th>
        <th className="px-4 py-2 border">Liga ID</th>
        <th className="px-4 py-2 border">Fundado</th>
        <th className="px-4 py-2 border">Presupuesto</th>
        <th className="px-4 py-2 border">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {teams.map(t => (
        <tr key={t.id} className={!t.is_active ? 'bg-gray-100' : ''}>
          <td className="px-4 py-2 border">{t.id}</td>
          <td className="px-4 py-2 border">{t.name}</td>
          <td className="px-4 py-2 border">{t.league_id}</td>
          <td className="px-4 py-2 border">{t.founded}</td>
          <td className="px-4 py-2 border">{t.budget}</td>
          <td className="px-4 py-2 border space-x-2">
            <button onClick={() => onEdit(t)} className="text-blue-600">Editar</button>
            <button onClick={() => onDelete(t.id)} className="text-red-600">Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default TeamList
