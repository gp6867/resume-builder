'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!name || !email || !password) { setError('All fields are required'); return }
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true); setError('')
    try {
      await register(name, email, password)
      router.push('/dashboard')
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Registration failed')
    }
    setLoading(false)
  }

  const handleGoogle = () => {
    window.location.href = 'https://resume-builder-1-jeiw.onrender.com/api/auth/google/login'
  }

  const inp: React.CSSProperties = { background: '#1a1a28', border: '1px solid #222230', borderRadius: '8px', color: '#e8e8f0', padding: '12px 14px', fontSize: '15px', width: '100%', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '13px', color: '#888899', marginBottom: '6px', fontWeight: 500 }

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#6c63ff' }}>✦ ResumeAI</span>
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#e8e8f0', marginTop: '16px' }}>Create your account</h1>
          <p style={{ color: '#888899', marginTop: '8px' }}>Start building professional resumes today</p>
        </div>

        <div style={{ background: '#111118', border: '1px solid #222230', borderRadius: '16px', padding: '32px' }}>
          {/* Google Signup */}
          <button onClick={handleGoogle} style={{
            width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333',
            background: '#1a1a28', color: '#e8e8f0', fontSize: '15px', fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px'
          }}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: '#222230' }} />
            <span style={{ color: '#888899', fontSize: '13px' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#222230' }} />
          </div>

          {error && (
            <div style={{ background: '#ff658422', border: '1px solid #ff658444', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#ff6584', fontSize: '14px' }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={lbl}>Full Name</label>
            <input style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={lbl}>Email</label>
            <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@email.com" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={lbl}>Password</label>
            <input style={inp} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" />
          </div>
          <div style={{ marginBottom: '28px' }}>
            <label style={lbl}>Confirm Password</label>
            <input style={inp} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', padding: '14px', fontSize: '16px', fontWeight: 700,
            background: loading ? '#444' : '#6c63ff', color: 'white',
            border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer'
          }}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#888899', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#6c63ff', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
