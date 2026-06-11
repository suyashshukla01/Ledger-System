import { Badge, Card } from './ui'
import { fmt, shortId, timeAgo } from '../utils/helpers'

export default function AccountCard({ account, balance }) {
  return (
    <Card>
      <p className="text-[10px] uppercase tracking-widest text-[#6B7280] mb-2">Balance</p>
      <p className="font-mono text-[22px] font-semibold text-teal animate-tick">
        {typeof balance === 'number' ? fmt(balance) : '—'}
      </p>
      <p className="font-mono text-[10px] text-[#6B7280] mt-1.5">#{shortId(account._id)}</p>
      <div className="mt-2">
        <Badge status={account.status} />
      </div>
      <p className="text-[10px] text-[#6B7280] mt-2">
        {account.currency} · {timeAgo(account.createdAt)}
      </p>
    </Card>
  )
}
