// src/components/PlayerList.tsx
import React from 'react'
import type { Player } from '../types'

interface Props {
  players: Player[]
  onEdit: (p: Player) => void
  onDelete: (id: number) => void
}

const PlayerList: React.FC<Props> = ({ players, onEdit, onDelete }) => (
  <table className="min-w-full bg-white border">
    <thead>
      <tr>
        <th className="px-4 py-2 border">ID</th>
        <th className="px-4 py-2 border">Nombre</th>
        <th className="px-4 py-2 border">Equipo ID</th>
        <th className="px-4 py-2 border">Posición</th>
        <th className="px-4 py-2 border">Número</th>
        <th className="px-4 py-2 border">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {players.map(p => (
        <tr key={p.id} className={!p.is_active ? 'bg-gray-100' : ''}>
          <td className="px-4 py-2 border">{p.id}</td>
          <td className="px-4 py-2 border">{p.name}</td>
          <td className="px-4 py-2 border">{p.team_id}</td>
          <td className="px-4 py-2 border">{p.position}</td>
          <td className="px-4 py-2 border">{p.number}</td>
          <td className="px-4 py-2 border space-x-2">
            <button onClick={() => onEdit(p)} className="text-blue-600">Editar</button>
            <button onClick={() => onDelete(p.id)} className="text-red-600">Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default PlayerList
