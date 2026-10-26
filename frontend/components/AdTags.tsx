'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

// Pages where no ad should ever load
const SKIP = ['/login', '/signup', '/forgot-password', '/reset-password', '/auth', '/pricing']

// Seconds to wait after page load before the tags are added
const DELAY_SECONDS = 0

export default function AdTags() {
  const pathname = usePathname() || '/'
  const { user, loading } = useAuth()
  const plan = user?.plan

  useEffect(() => {
    if (loading) return
    if (plan && plan !== 'free') return
    if (SKIP.some(p => pathname === p || pathname.startsWith(p + '/'))) return

    const added: HTMLScriptElement[] = []

    const timer = setTimeout(() => {
      // Tag 1: notification zone
      const s1 = document.createElement('script')
      s1.src = 'https://5gvci.com/act/files/tag.min.js?z=12124581'
      s1.async = true
      s1.setAttribute('data-cfasync', 'false')
      document.body.appendChild(s1)
      added.push(s1)

      // Tag 2: poster / in-page zone
      const s2 = document.createElement('script')
      s2.dataset.zone = '12124584'
      s2.src = 'https://nap5k.com/tag.min.js'
      document.body.appendChild(s2)
      added.push(s2)
    }, DELAY_SECONDS * 1000)

    return () => {
      clearTimeout(timer)
      added.forEach(s => s.remove())
    }
  }, [pathname, plan, loading])

  return null
}
