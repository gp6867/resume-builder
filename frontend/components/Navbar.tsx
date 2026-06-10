'use client'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <nav style={{
      background: '#0a0a0f', borderBottom: '1px solid #222230',
      padding: '0 40px', height: '64px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '22px', fontWeight: 800, color: '#6c63ff' }}>✦ ResumeAI</span>
      </Link>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#888899', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
        <Link href="/builder" style={{ color: '#888899', textDecoration: 'none', fontSize: '14px' }}>Builder</Link>
        <Link href="/pricing" style={{ color: '#888899', textDecoration: 'none', fontSize: '14px' }}>Pricing</Link>
        {user ? (
          <>
            <Link href="/dashboard" style={{ color: '#888899', textDecoration: 'none', fontSize: '14px' }}>Dashboard</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: '#6c63ff22', border: '1px solid #6c63ff44',
                borderRadius: '999px', padding: '6px 14px', fontSize: '13px', color: '#6c63ff', fontWeight: 600
              }}>👤 {user.name.split(' ')[0]}</div>
              <button onClick={() => { logout(); router.push('/') }} style={{
                background: 'transparent', color: '#ff6584', padding: '7px 16px',
                border: '1px solid #ff658444', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600
              }}>Log Out</button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link href="/login">
              <button style={{
                background: 'transparent', color: '#e8e8f0', padding: '8px 18px',
                border: '1px solid #333', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600
              }}>Log In</button>
            </Link>
            <Link href="/signup">
              <button style={{
                background: '#6c63ff', color: 'white', padding: '8px 18px',
                border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600
              }}>Get Started Free</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
