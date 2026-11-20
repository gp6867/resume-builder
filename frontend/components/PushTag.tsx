'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const SRC = 'https://5gvci.com/act/files/tag.min.js?z=12304803'
const SKIP = ['/login', '/signup', '/forgot-password', '/reset-password', '/auth', '/pricing']

export default function PushTag() {
  const pathname = usePathname() || '/'
  const { user, loading } = useAuth()
  const plan = user?.plan

  useEffect(() => {
    if (loading) return
    if (plan && plan !== 'free') return
    if (SKIP.some(p => pathname === p || pathname.startsWith(p + '/'))) return
    if (document.querySelector('script[data-push-tag]')) return

    const s = document.createElement('script')
    s.src = SRC
    s.async = true
    s.setAttribute('data-cfasync', 'false')
    s.setAttribute('data-push-tag', '1')
    document.body.appendChild(s)
  }, [pathname, plan, loading])

  return null
}
