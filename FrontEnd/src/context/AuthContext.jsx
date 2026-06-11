import { createContext, useContext, useState } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('ledger_user')) } catch { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('ledger_token'))

  const login = async (email, password) => {
    const data = await authApi.login(email, password)
    setUser(data.user)
    setToken(data.token)
    localStorage.setItem('ledger_user',  JSON.stringify(data.user))
    localStorage.setItem('ledger_token', data.token)
    return data
  }

  const register = async (name, email, password) => {
    const data = await authApi.register(name, email, password)
    setUser(data.user)
    setToken(data.token)
    localStorage.setItem('ledger_user',  JSON.stringify(data.user))
    localStorage.setItem('ledger_token', data.token)
    return data
  }

  const logout = async () => {
    try { await authApi.logout(token) } catch {}
    setUser(null)
    setToken(null)
    localStorage.removeItem('ledger_user')
    localStorage.removeItem('ledger_token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
