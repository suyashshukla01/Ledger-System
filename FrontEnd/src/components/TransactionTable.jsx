import { Badge } from './ui'
import { fmt, shortId, timeAgo } from '../utils/helpers'

export default function TransactionTable({ transactions, myAccountIds }) {
  return (
    <div className="bg-surface border border-[#252830] rounded-xl overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Type', 'Amount', 'Account', 'Status', 'When'].map((h) => (
              <th
                key={h}
                className="text-[10px] uppercase tracking-widest text-[#6B7280] font-medium px-4 py-2.5 text-left border-b border-[#252830]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => {
            const isCredit = myAccountIds.includes(t.toAccount)
            return (
              <tr key={t._id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-xs border-b border-[#252830]">
                  {isCredit
                    ? <span className="text-teal">⬇ Incoming</span>
                    : <span className="text-[#FF4D6A]">⬆ Outgoing</span>}
                </td>
                <td className={`px-4 py-3 font-mono text-[12px] font-semibold border-b border-[#252830] ${isCredit ? 'text-teal' : 'text-[#FF4D6A]'}`}>
                  {isCredit ? '+' : '−'}{fmt(t.amount)}
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-[#6B7280] border-b border-[#252830]">
                  #{shortId(isCredit ? t.toAccount : t.fromAccount)}
                </td>
                <td className="px-4 py-3 border-b border-[#252830]">
                  <Badge status={t.status} />
                </td>
                <td className="px-4 py-3 text-xs text-[#6B7280] border-b border-[#252830]">
                  {timeAgo(t.createdAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
