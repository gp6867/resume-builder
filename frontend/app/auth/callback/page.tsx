'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUserManually } = useAuth()

  useEffect(() => {
    const token = searchParams.get('token')
    const userStr = searchParams.get('user')

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr))
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setUserManually(user, token)
        router.push('/dashboard')
      } catch (e) {
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
        <p style={{ color: '#888899', fontSize: '16px' }}>Signing you in with Google...</p>
      </div>
    </main>
  )
}
