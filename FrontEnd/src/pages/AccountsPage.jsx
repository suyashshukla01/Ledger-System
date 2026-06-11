import { useEffect, useState } from 'react'
import { useAccounts } from '../hooks/useAccounts'
import AccountCard from '../components/AccountCard'
import { PageHeader, Alert, Button, Spinner, Empty } from '../components/ui'

export default function AccountsPage() {
  const { accounts, balances, loading, load, create } = useAccounts()
  const [creating, setCreating] = useState(false)
  const [msg,      setMsg]      = useState(null)

  useEffect(() => { load() }, [load])

  const handleCreate = async () => {
    setCreating(true)
    setMsg(null)
    try {
      await create()
      setMsg({ type: 'success', text: 'Account created successfully!' })
      setTimeout(() => setMsg(null), 3000)
    } catch (e) {
      setMsg({ type: 'error', text: e.message })
    } finally {
      setCreating(false)
    }
  }

  return (
    <div>
      <PageHeader title="Accounts" subtitle="Manage your ledger accounts" />

      {msg && <Alert type={msg.type}>{msg.text}</Alert>}

      <div className="mb-5">
        <Button variant="primary" onClick={handleCreate} disabled={creating}>
          {creating
            ? <><span className="w-3.5 h-3.5 rounded-full border-2 border-bg/30 border-t-bg animate-spin inline-block" /> Creating…</>
            : '+ New account'}
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : accounts.length === 0 ? (
        <Empty icon="▣" message="No accounts yet. Create one above." />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {accounts.map((a) => (
            <AccountCard key={a._id} account={a} balance={balances[a._id] ?? 0} />
          ))}
        </div>
      )}
    </div>
  )
}
