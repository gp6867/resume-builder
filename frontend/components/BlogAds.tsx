'use client'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const BANNER_HTML = `<!DOCTYPE html>
<html><head><style>html,body{margin:0;padding:0;background:transparent}</style></head>
<body>
<script>
  atOptions = {
    'key' : '4f2835e99258a6a6624e1772521345b1',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
<\/script>
<script src="https://bauval.org/22/4f2835e99258a6a6624e1772521345b1"><\/script>
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
        width={300}
        height={250}
        scrolling="no"
        title="Advertisement"
        style={{ border: 'none', maxWidth: '100%' }}
      />
    </div>
  )
}
