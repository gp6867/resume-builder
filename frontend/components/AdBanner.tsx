'use client'
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

export default function AdBanner() {
  const { user, loading } = useAuth()
  const showAds = !loading && (!user?.plan || user.plan === 'free')

  if (!showAds) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
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
