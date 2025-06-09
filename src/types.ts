// src/types.ts
export interface League {
  id: number
  name: string
  season_start: string   // ISO date string
  season_end: string
  budget: number
  description?: string
  is_active: boolean
  created_at: string     // ISO datetime
}

export interface Team {
  id: number
  name: string
  league_id: number
  founded?: string      // fecha ISO (opcional)
  budget?: number
  is_active: boolean
  created_at: string    // ISO datetime
}

export interface Player {
  id: number
  name: string
  team_id: number
  position?: string
  number?: number
  is_active: boolean
  created_at: string    // ISO datetime
}

export interface Venue {
  id: number
  name: string
  address?: string
  capacity?: number
  is_active: boolean
  created_at: string    // ISO datetime
}

export interface Fixture {
  id: number
  league_id: number
  home_team_id: number
  away_team_id: number
  venue_id: number
  match_datetime: string  // ISO datetime
  is_active: boolean
  created_at: string      // ISO datetime
}

export interface Payment {
  id: number
  player_id: number
  amount: number
  payment_date: string   // ISO date “YYYY-MM-DD”
  method?: string
  is_active: boolean
  created_at: string     // ISO datetime
}

export interface Profile {
  id: number
  name: string
  email: string
  // Agrega más campos según tu modelo de usuario
}

export const __TYPES_LOADED = '✅ types module loaded';