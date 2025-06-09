// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext
} from 'react'
import api from '../api'

/** 
 * Tipos del contexto 
 */
type AuthContextType = {
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

/** Contexto con valores por defecto */
const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  logout: () => {}
})

/**  
 * Proveedor de autenticación: mantiene token en estado y localStorage  
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)

  // Al montar, leemos token de localStorage
  useEffect(() => {
    const stored = localStorage.getItem('token')
    if (stored) setToken(stored)
  }, [])

  /** Login: llama /auth/login y guarda el token */
  const login = async (username: string, password: string) => {
    // FastAPI espera form data para OAuth2PasswordRequestForm
    const form = new URLSearchParams()
    form.append('username', username)
    form.append('password', password)

    const response = await api.post('/auth/login', form)
    const { access_token } = response.data
    localStorage.setItem('token', access_token)
    setToken(access_token)
  }

  /** Logout: limpia token */
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/** Hook para consumir el contexto fácilmente */
export const useAuth = () => useContext(AuthContext)
