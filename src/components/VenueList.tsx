// src/components/VenueList.tsx
import React from 'react'
import type { Venue } from '../types'

interface Props {
  venues: Venue[]
  onEdit: (v: Venue) => void
  onDelete: (id: number) => void
}

const VenueList: React.FC<Props> = ({ venues, onEdit, onDelete }) => (
  <table className="min-w-full bg-white border">
    <thead>
      <tr>
        <th className="px-4 py-2 border">ID</th>
        <th className="px-4 py-2 border">Nombre</th>
        <th className="px-4 py-2 border">Dirección</th>
        <th className="px-4 py-2 border">Capacidad</th>
        <th className="px-4 py-2 border">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {venues.map(v => (
        <tr key={v.id} className={!v.is_active ? 'bg-gray-100' : ''}>
          <td className="px-4 py-2 border">{v.id}</td>
          <td className="px-4 py-2 border">{v.name}</td>
          <td className="px-4 py-2 border">{v.address}</td>
          <td className="px-4 py-2 border">{v.capacity}</td>
          <td className="px-4 py-2 border space-x-2">
            <button onClick={() => onEdit(v)} className="text-blue-600">Editar</button>
            <button onClick={() => onDelete(v.id)} className="text-red-600">Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default VenueList
