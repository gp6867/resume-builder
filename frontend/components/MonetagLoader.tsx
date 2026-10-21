'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const SRC = 'https://quge5.com/88/tag.min.js'
const ZONE = '299433'
const SKIP = ['/login', '/signup', '/forgot-password', '/reset-password', '/auth', '/pricing']
const VISIBLE_MS = 20000

function delaySeconds(pathname: string) {
  if (pathname === '/') return 0
  if (pathname.startsWith('/blog')) return 0
  if (pathname.startsWith('/dashboard')) return 0
  if (pathname.startsWith('/builder')) return 0
  return 0
}

export default function MonetagLoader() {
  const pathname = usePathname() || '/'
  const { user, loading } = useAuth()
  const plan = user?.plan

  useEffect(() => {
    if (loading) return
    if (plan && plan !== 'free') return
    if (SKIP.some(p => pathname === p || pathname.startsWith(p + '/'))) return

    let script: HTMLScriptElement | null = null
    let removeTimer: ReturnType<typeof setTimeout> | undefined

    const showTimer = setTimeout(() => {
      script = document.createElement('script')
      script.src = SRC
      script.async = true
      script.setAttribute('data-zone', ZONE)
      script.setAttribute('data-cfasync', 'false')
      document.body.appendChild(script)
      removeTimer = setTimeout(() => {
        script?.remove()
        script = null
      }, VISIBLE_MS)
    }, delaySeconds(pathname) * 1000)

    return () => {
      clearTimeout(showTimer)
      if (removeTimer) clearTimeout(removeTimer)
      script?.remove()
    }
  }, [pathname, plan, loading])

  return null
}
