'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const inp: React.CSSProperties = { background: '#1a1a28', border: '1px solid #222230', borderRadius: '8px', color: '#e8e8f0', padding: '12px 14px', fontSize: '15px', width: '100%', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '13px', color: '#888899', marginBottom: '6px', fontWeight: 500 }

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#6c63ff' }}>✦ ResumeAI</span>
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#e8e8f0', marginTop: '16px' }}>Reset your password</h1>
          <p style={{ color: '#888899', marginTop: '8px' }}>Enter your email and we'll send you a reset link</p>
        </div>
        <div style={{ background: '#111118', border: '1px solid #222230', borderRadius: '16px', padding: '32px' }}>
          {!sent ? (
            <>
              <div style={{ marginBottom: '24px' }}>
                <label style={lbl}>Email address</label>
                <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@email.com" />
              </div>
              <button onClick={() => email && setSent(true)} style={{
                width: '100%', padding: '14px', fontSize: '16px', fontWeight: 700,
                background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
              }}>Send Reset Link</button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
              <h3 style={{ color: '#e8e8f0', marginBottom: '8px' }}>Check your inbox</h3>
              <p style={{ color: '#888899', fontSize: '14px' }}>We sent a reset link to {email}</p>
            </div>
          )}
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#888899', fontSize: '14px' }}>
            <Link href="/login" style={{ color: '#6c63ff', textDecoration: 'none' }}>← Back to Login</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
