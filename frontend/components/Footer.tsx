import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0f', borderTop: '1px solid #1e1e30', padding: '40px', marginTop: '0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          <div>
            <span style={{ fontSize: '20px', fontWeight: 800, background: 'linear-gradient(135deg, #6c63ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦ ResumeX AI</span>
            <p style={{ color: '#444466', fontSize: '13px', marginTop: '12px', lineHeight: 1.6 }}>
              Build professional, ATS-optimized resumes in minutes with the power of AI.
            </p>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8e8f0', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Product</div>
            {[['/', 'Home'], ['/builder', 'Resume Builder'], ['/pricing', 'Pricing'], ['/blog', 'Blog']].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', color: '#444466', textDecoration: 'none', fontSize: '14px', marginBottom: '10px' }}>{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8e8f0', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Company</div>
            {[['/contact', 'Contact Us'], ['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Service']].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', color: '#444466', textDecoration: 'none', fontSize: '14px', marginBottom: '10px' }}>{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8e8f0', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Support</div>
            <a href="mailto:support@resumex-ai.com" style={{ display: 'block', color: '#444466', textDecoration: 'none', fontSize: '14px', marginBottom: '10px' }}>support@resumex-ai.com</a>
            <a href="mailto:hello@resumex-ai.com" style={{ display: 'block', color: '#444466', textDecoration: 'none', fontSize: '14px', marginBottom: '10px' }}>hello@resumex-ai.com</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1e1e30', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#333355', fontSize: '13px' }}>© 2026 ResumeX AI. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/privacy" style={{ color: '#333355', fontSize: '13px', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: '#333355', fontSize: '13px', textDecoration: 'none' }}>Terms of Service</Link>
            <Link href="/blog" style={{ color: '#333355', fontSize: '13px', textDecoration: 'none' }}>Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
