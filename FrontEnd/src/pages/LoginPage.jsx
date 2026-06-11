import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Alert, Button, Input } from '../components/ui'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate   = useNavigate()
  const [mode,     setMode]    = useState('login')
  const [form,     setForm]    = useState({ name: '', email: '', password: '' })
  const [error,    setError]   = useState('')
  const [loading,  setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const { register } = useAuth()

  const submit = async () => {
    setError('')
    if (!form.email || !form.password) { setError('Email and password are required'); return }
    if (mode === 'register' && !form.name) { setError('Name is required'); return }
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        await register(form.name, form.email, form.password)
      }
      navigate('/')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-[360px] bg-surface border border-[#252830] rounded-2xl p-8">
        <p className="font-mono text-[16px] font-semibold text-teal mb-1">ledger/</p>
        <p className="text-xs text-[#6B7280] mb-6">
          {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
        </p>

        {error && <Alert type="error">{error}</Alert>}

        {mode === 'register' && (
          <Input label="Name" placeholder="Your name" value={form.name} onChange={set('name')} />
        )}
        <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={set('password')}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />

        <Button
          variant="primary"
          className="w-full justify-center mt-1"
          onClick={submit}
          disabled={loading}
        >
          {loading
            ? <span className="w-4 h-4 rounded-full border-2 border-bg/30 border-t-bg animate-spin inline-block" />
            : mode === 'login' ? 'Sign in' : 'Create account'}
        </Button>

        <p className="mt-4 text-xs text-[#6B7280] text-center">
          {mode === 'login' ? (
            <>No account?{' '}
              <button className="text-teal" onClick={() => { setMode('register'); setError('') }}>Register</button>
            </>
          ) : (
            <>Already have one?{' '}
              <button className="text-teal" onClick={() => { setMode('login'); setError('') }}>Sign in</button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
