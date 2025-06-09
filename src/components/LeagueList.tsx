// src/components/LeagueList.tsx
import React from 'react'
import type { League } from '../types'
import { __TYPES_LOADED } from '../types'

console.log(__TYPES_LOADED); 

interface Props {
  leagues: League[]
  onEdit: (l: League) => void
  onDelete: (id: number) => void
}

const LeagueList: React.FC<Props> = ({ leagues, onEdit, onDelete }) => (
  <table className="min-w-full bg-white border">
    <thead>
      <tr>
        <th className="px-4 py-2 border">ID</th>
        <th className="px-4 py-2 border">Nombre</th>
        <th className="px-4 py-2 border">Inicio</th>
        <th className="px-4 py-2 border">Fin</th>
        <th className="px-4 py-2 border">Presupuesto</th>
        <th className="px-4 py-2 border">Descripción</th>
        <th className="px-4 py-2 border">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {leagues.map(l => (
        <tr key={l.id} className={!l.is_active ? 'bg-gray-100' : ''}>
          <td className="px-4 py-2 border">{l.id}</td>
          <td className="px-4 py-2 border">{l.name}</td>
          <td className="px-4 py-2 border">{l.season_start}</td>
          <td className="px-4 py-2 border">{l.season_end}</td>
          <td className="px-4 py-2 border">{l.budget}</td>
          <td className="px-4 py-2 border">{l.description}</td>
          <td className="px-4 py-2 border space-x-2">
            <button onClick={() => onEdit(l)} className="text-blue-600">Editar</button>
            <button onClick={() => onDelete(l.id)} className="text-red-600">Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default LeagueList
