import { useEffect, useState } from 'react'
import { useAccounts } from '../hooks/useAccounts'
import { transactionApi } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { PageHeader, Alert, Button, Select, Input, Spinner } from '../components/ui'
import { fmt, shortId, uid } from '../utils/helpers'

export default function SendPage() {
  const { token } = useAuth()
  const { accounts, balances, load } = useAccounts()
  const [form,    setForm]    = useState({ fromAccount: '', toAccount: '', amount: '' })
  const [loading, setLoading] = useState(false)
  const [msg,     setMsg]     = useState(null)
  const [done,    setDone]    = useState(null)

  useEffect(() => { load() }, [load])
  useEffect(() => {
    if (accounts.length > 0 && !form.fromAccount) {
      setForm((f) => ({ ...f, fromAccount: accounts[0]._id }))
    }
  }, [accounts])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    setMsg(null)
    if (!form.fromAccount || !form.toAccount || !form.amount) {
      setMsg({ type: 'error', text: 'All fields are required.' })
      return
    }
    if (Number(form.amount) <= 0) {
      setMsg({ type: 'error', text: 'Amount must be greater than 0.' })
      return
    }
    setLoading(true)
    try {
      const data = await transactionApi.create(
        form.fromAccount,
        form.toAccount,
        Number(form.amount),
        uid(),
        token
      )
      setDone(data.transaction)
      await load()
    } catch (e) {
      setMsg({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div>
        <PageHeader title="Send Money" />
        <div className="bg-surface border border-[#252830] rounded-xl p-6 max-w-[460px]">
          <div className="w-12 h-12 rounded-full bg-[rgba(0,201,167,0.12)] text-teal flex items-center justify-center text-xl mb-4">✓</div>
          <p className="text-[14px] font-semibold mb-4">Transaction complete</p>
          <Alert type="success">Funds transferred successfully</Alert>

          <div className="space-y-3 mb-6">
            <div>
              <p className="text-[10px] text-[#6B7280] mb-1">Amount sent</p>
              <p className="font-mono text-[22px] font-semibold text-teal">{fmt(done.amount)}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#6B7280] mb-1">To account</p>
              <p className="font-mono text-[12px] text-[#E8EAF0]">#{shortId(done.toAccount)}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#6B7280] mb-1">Status</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[rgba(0,201,167,0.12)] text-teal">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />{done.status}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="primary" onClick={() => { setDone(null); setForm((f) => ({ ...f, toAccount: '', amount: '' })); setMsg(null) }}>
              Send another
            </Button>
            <Button variant="ghost" onClick={() => window.history.back()}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Send Money" subtitle="Transfer funds between accounts" />

      <div className="bg-surface border border-[#252830] rounded-xl p-6 max-w-[460px]">
        <p className="text-[13px] font-semibold mb-4">New transfer</p>

        {msg && <Alert type={msg.type}>{msg.text}</Alert>}

        <Select label="From account" value={form.fromAccount} onChange={set('fromAccount')}>
          <option value="">— Select account —</option>
          {accounts.map((a) => (
            <option key={a._id} value={a._id}>
              #{shortId(a._id)} · {fmt(balances[a._id] ?? 0)}
            </option>
          ))}
        </Select>

        <div className="mb-3.5">
          <label className="block text-[11px] text-[#6B7280] font-medium mb-1.5">
            To account ID
          </label>
          <input
            className="w-full bg-bg border border-[#252830] rounded-lg px-3 py-2 text-[12px] text-[#E8EAF0] font-mono outline-none focus:border-teal transition-colors placeholder:text-[#3a3f4a]"
            placeholder="Paste recipient account ID"
            value={form.toAccount}
            onChange={set('toAccount')}
          />
        </div>

        <div className="mb-3.5">
          <label className="block text-[11px] text-[#6B7280] font-medium mb-1.5">
            Amount (INR)
          </label>
          <input
            type="number"
            min="1"
            placeholder="0.00"
            value={form.amount}
            onChange={set('amount')}
            className="w-full bg-bg border border-[#252830] rounded-lg px-3 py-2 text-[12.5px] text-[#E8EAF0] font-mono outline-none focus:border-teal transition-colors placeholder:text-[#3a3f4a]"
          />
        </div>

        <div className="bg-bg rounded-lg px-3 py-2.5 text-[11px] text-[#6B7280] mb-4">
          ⓘ Idempotency key is auto-generated to prevent duplicate transactions.
        </div>

        <Button variant="primary" onClick={submit} disabled={loading}>
          {loading
            ? <><span className="w-3.5 h-3.5 rounded-full border-2 border-bg/30 border-t-bg animate-spin inline-block" /> Processing…</>
            : `↗ Send ${form.amount ? fmt(Number(form.amount)) : 'funds'}`}
        </Button>
      </div>
    </div>
  )
}
