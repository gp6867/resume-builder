'use client'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const BANNER_HTML = `<!DOCTYPE html>
<html><head><style>html,body{margin:0;padding:0;background:transparent}</style></head>
<body>
<script>
  atOptions = {
    'key' : 'd418cd9ab42db71af10006d11c8c67f3',
    'format' : 'iframe',
    'height' : 60,
    'width' : 468,
    'params' : {}
  };
<\/script>
<script src="https://bauval.org/22/d418cd9ab42db71af10006d11c8c67f3"><\/script>
</body></html>`

const SOCIAL_BAR_SRC = 'https://bauval.org/14/0b12c9c36d93569bc372acbfc68697f1'

export default function BlogAds() {
  const { user, loading } = useAuth()
  const showAds = !loading && (!user?.plan || user.plan === 'free')

  useEffect(() => {
    if (!showAds) return
    const s = document.createElement('script')
    s.src = SOCIAL_BAR_SRC
    s.async = true
    s.setAttribute('data-cfasync', 'false')
    document.body.appendChild(s)
    return () => { s.remove() }
  }, [showAds])

  if (!showAds) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0', overflowX: 'auto' }}>
      <iframe
        srcDoc={BANNER_HTML}
        width={468}
        height={60}
        scrolling="no"
        title="Advertisement"
        style={{ border: 'none', maxWidth: '100%' }}
      />
    </div>
  )
}
