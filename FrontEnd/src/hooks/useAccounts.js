import { useState, useCallback } from 'react'
import { accountApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

export function useAccounts() {
  const { token } = useAuth()
  const [accounts,  setAccounts]  = useState([])
  const [balances,  setBalances]  = useState({})
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await accountApi.getAll(token)
      const accs = data.accounts ?? []
      setAccounts(accs)

      const bals = {}
      await Promise.all(
        accs.map(async (a) => {
          try {
            const b = await accountApi.getBalance(a._id, token)
            bals[a._id] = b.balance
          } catch {
            bals[a._id] = 0
          }
        })
      )
      setBalances(bals)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  const create = async () => {
    await accountApi.create(token)
    await load()
  }

  return { accounts, balances, loading, error, load, create }
}
