import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAccounts } from '../hooks/useAccounts'
import AccountCard from '../components/AccountCard'
import { PageHeader, SectionRow, Button, Spinner, Empty } from '../components/ui'
import { fmt } from '../utils/helpers'

export default function DashboardPage() {
  const { user } = useAuth()
  const { accounts, balances, loading, load } = useAccounts()

  useEffect(() => { load() }, [load])

  const total = Object.values(balances).reduce((s, v) => s + v, 0)
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <div>
      <PageHeader
        title={`Good day, ${firstName} 👋`}
        subtitle="Your financial overview"
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total balance',   value: fmt(total), mono: true },
          { label: 'Accounts',        value: accounts.length },
          { label: 'Default currency',value: 'INR', mono: true, color: 'text-teal' },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-[#252830] rounded-xl p-4">
            <p className={`font-semibold text-[18px] animate-tick ${s.mono ? 'font-mono' : ''} ${s.color ?? ''}`}>
              {s.value}
            </p>
            <p className="text-[11px] text-[#6B7280] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Accounts */}
      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : accounts.length === 0 ? (
        <Empty
          icon="◈"
          message="No accounts yet"
          action={<Link to="/accounts"><Button variant="primary">Create account</Button></Link>}
        />
      ) : (
        <>
          <SectionRow
            title="Accounts"
            action={
              <Link to="/accounts">
                <Button variant="ghost" className="text-[11px] py-1 px-2.5">View all</Button>
              </Link>
            }
          />
          <div className="grid grid-cols-2 gap-3">
            {accounts.slice(0, 4).map((a) => (
              <AccountCard key={a._id} account={a} balance={balances[a._id] ?? 0} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
