'use client'
import Navbar from '@/components/Navbar'

export default function Contact() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 900, color: '#e8e8f0', marginBottom: '12px' }}>Contact Us</h1>
          <p style={{ color: '#888899', fontSize: '16px' }}>Have a question or need help? We are here for you.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {[
            { icon: '📧', title: 'Email Support', value: 'support@resumex-ai.com', desc: 'We reply within 24 hours' },
            { icon: '💬', title: 'General Inquiries', value: 'hello@resumex-ai.com', desc: 'For business and partnerships' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#111118', border: '1px solid #222230', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8e8f0', marginBottom: '4px' }}>{item.title}</div>
              <a href={`mailto:${item.value}`} style={{ fontSize: '13px', color: '#6c63ff', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>{item.value}</a>
              <div style={{ fontSize: '12px', color: '#888899' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
