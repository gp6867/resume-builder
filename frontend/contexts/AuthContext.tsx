'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

const API = axios.create({ baseURL: 'https://resume-builder-1-jeiw.onrender.com', headers: { 'Content-Type': 'application/json' } })

interface User { id: string; name: string; email: string; plan: string }
interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUserManually: (user: User, token: string) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (t && u) { setToken(t); setUser(JSON.parse(u)) }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const res = await API.post('/api/auth/login', { email, password })
    setToken(res.data.access_token)
    setUser(res.data.user)
    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await API.post('/api/auth/register', { name, email, password })
    setToken(res.data.access_token)
    setUser(res.data.user)
    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
  }

  const setUserManually = (user: User, token: string) => {
    setUser(user)
    setToken(token)
  }

  const logout = () => {
    setUser(null); setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, setUserManually, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
