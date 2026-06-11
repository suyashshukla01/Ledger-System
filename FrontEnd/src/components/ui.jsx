// ── Spinner ───────────────────────────────────────────────────────────────────
export function Spinner({ size = 'sm' }) {
  const s = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'
  return (
    <span
      className={`${s} rounded-full border-2 border-[#252830] border-t-teal inline-block animate-spin`}
    />
  )
}

// ── Alert ─────────────────────────────────────────────────────────────────────
export function Alert({ type = 'error', children }) {
  const styles = {
    error:   'bg-[rgba(255,77,106,0.12)] text-[#FF4D6A] border border-[rgba(255,77,106,0.25)]',
    success: 'bg-[rgba(0,201,167,0.12)]  text-teal      border border-[rgba(0,201,167,0.25)]',
  }
  return (
    <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs mb-3 ${styles[type]}`}>
      {type === 'error' ? '⚠' : '✓'} {children}
    </div>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────────
const badgeStyles = {
  ACTIVE:    'bg-[rgba(0,201,167,0.12)]       text-teal',
  COMPLETED: 'bg-[rgba(0,201,167,0.12)]       text-teal',
  PENDING:   'bg-[rgba(245,158,11,0.12)]      text-[#F59E0B]',
  FAILED:    'bg-[rgba(255,77,106,0.12)]      text-[#FF4D6A]',
  REVERSED:  'bg-[rgba(107,114,128,0.15)]     text-[#6B7280]',
  FROZEN:    'bg-[rgba(123,158,255,0.12)]     text-[#7B9EFF]',
  CLOSED:    'bg-[rgba(255,77,106,0.12)]      text-[#FF4D6A]',
}

export function Badge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeStyles[status] ?? ''}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

// ── Button ────────────────────────────────────────────────────────────────────
export function Button({ variant = 'primary', children, className = '', ...props }) {
  const base = 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-medium cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-teal text-bg hover:bg-[#00e0bc]',
    ghost:   'bg-transparent text-[#6B7280] border border-[#252830] hover:text-[#E8EAF0] hover:border-[#353840]',
    danger:  'bg-[rgba(255,77,106,0.12)] text-[#FF4D6A] border-0 hover:bg-[rgba(255,77,106,0.2)]',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// ── Input ─────────────────────────────────────────────────────────────────────
export function Input({ label, ...props }) {
  return (
    <div className="mb-3.5">
      {label && (
        <label className="block text-[11px] text-[#6B7280] font-medium mb-1.5">
          {label}
        </label>
      )}
      <input
        className="w-full bg-bg border border-[#252830] rounded-lg px-3 py-2 text-[12.5px] text-[#E8EAF0] font-sans outline-none focus:border-teal transition-colors placeholder:text-[#3a3f4a]"
        {...props}
      />
    </div>
  )
}

// ── Select ────────────────────────────────────────────────────────────────────
export function Select({ label, children, ...props }) {
  return (
    <div className="mb-3.5">
      {label && (
        <label className="block text-[11px] text-[#6B7280] font-medium mb-1.5">
          {label}
        </label>
      )}
      <select
        className="w-full bg-bg border border-[#252830] rounded-lg px-3 py-2 text-[12.5px] text-[#E8EAF0] font-sans outline-none focus:border-teal transition-colors"
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface border border-[#252830] rounded-xl p-5 transition-colors hover:border-[#353840] ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

// ── Page Header ───────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold text-[#E8EAF0]">{title}</h1>
      {subtitle && <p className="text-xs text-[#6B7280] mt-1">{subtitle}</p>}
    </div>
  )
}

// ── Section Row ───────────────────────────────────────────────────────────────
export function SectionRow({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-[13px] font-semibold text-[#E8EAF0]">{title}</h2>
      {action}
    </div>
  )
}

// ── Empty State ───────────────────────────────────────────────────────────────
export function Empty({ icon, message, action }) {
  return (
    <div className="py-12 text-center text-[#6B7280]">
      <div className="text-3xl mb-3">{icon}</div>
      <p className="text-sm">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
