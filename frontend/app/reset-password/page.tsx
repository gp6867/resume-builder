'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const handleReset = async () => {
    if (!password || !confirm) { setError('All fields required'); return }
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://resume-builder-79tf.onrender.com/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      })
      const data = await res.json()
      if (res.ok) {
        setDone(true)
        setTimeout(() => router.push('/login'), 2000)
      } else {
        setError(data.detail || 'Reset failed')
      }
    } catch (e) {
      setError('Something went wrong')
    }
    setLoading(false)
  }

  const inp: React.CSSProperties = { background: '#1a1a28', border: '1px solid #222230', borderRadius: '8px', color: '#e8e8f0', padding: '12px 14px', fontSize: '15px', width: '100%', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '13px', color: '#888899', marginBottom: '6px', fontWeight: 500 }

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#6c63ff' }}>✦ ResumeX AI</span>
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#e8e8f0', marginTop: '16px' }}>Set New Password</h1>
        </div>

        <div style={{ background: '#111118', border: '1px solid #222230', borderRadius: '16px', padding: '32px' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ color: '#e8e8f0', marginBottom: '8px' }}>Password Reset!</h3>
              <p style={{ color: '#888899' }}>Redirecting to login...</p>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ background: '#ff658422', border: '1px solid #ff658444', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#ff6584', fontSize: '14px' }}>
                  {error}
                </div>
              )}
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>New Password</label>
                <input style={inp} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={lbl}>Confirm Password</label>
                <input style={inp} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" />
              </div>
              <button onClick={handleReset} disabled={loading} style={{
                width: '100%', padding: '14px', fontSize: '16px', fontWeight: 700,
                background: loading ? '#444' : '#6c63ff', color: 'white',
                border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer'
              }}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
