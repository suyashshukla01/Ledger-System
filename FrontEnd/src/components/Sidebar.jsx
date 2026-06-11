import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { to: '/',             icon: '◈', label: 'Dashboard'    },
  { to: '/accounts',     icon: '▣', label: 'Accounts'     },
  { to: '/transactions', icon: '⇄', label: 'Transactions' },
  { to: '/send',         icon: '↗', label: 'Send Money'   },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-[200px] min-w-[200px] bg-surface border-r border-[#252830] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-[18px] border-b border-[#252830] font-mono text-[14px] font-semibold text-teal">
        ledger<span className="text-[#6B7280] font-normal">/app</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 flex flex-col gap-0.5 pt-3">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium transition-all
              ${isActive
                ? 'bg-[rgba(0,201,167,0.12)] text-teal'
                : 'text-[#6B7280] hover:bg-[#252830] hover:text-[#E8EAF0]'
              }`
            }
          >
            <span className="w-4 text-center text-[15px]">{n.icon}</span>
            {n.label}
          </NavLink>
        ))}

        <div className="flex-1" />

        <button
          onClick={logout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium text-[#FF4D6A] hover:bg-[rgba(255,77,106,0.1)] transition-all mt-2 w-full"
        >
          <span className="w-4 text-center text-[15px]">⏻</span>
          Sign out
        </button>
      </nav>

      {/* User */}
      <div className="p-2 border-t border-[#252830]">
        <div className="flex items-center gap-2.5 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-[rgba(0,201,167,0.12)] text-teal flex items-center justify-center text-[11px] font-semibold font-mono shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-[12px] font-medium text-[#E8EAF0] truncate">{user?.name}</p>
            <p className="text-[10px] text-[#6B7280] truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
