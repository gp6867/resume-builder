'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const inp: React.CSSProperties = { background: '#1a1a28', border: '1px solid #222230', borderRadius: '8px', color: '#e8e8f0', padding: '12px 14px', fontSize: '15px', width: '100%', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '13px', color: '#888899', marginBottom: '6px', fontWeight: 500 }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 900, color: '#e8e8f0', marginBottom: '12px' }}>Contact Us</h1>
          <p style={{ color: '#888899', fontSize: '16px' }}>Have a question or need help? We are here for you.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          {[
            { icon: '📧', title: 'Email Support', value: 'support@resumex-ai.com', desc: 'We reply within 24 hours' },
            { icon: '💬', title: 'General Inquiries', value: 'hello@resumex-ai.com', desc: 'For business and partnerships' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#111118', border: '1px solid #222230', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8e8f0', marginBottom: '4px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#6c63ff', marginBottom: '4px' }}>{item.value}</div>
              <div style={{ fontSize: '12px', color: '#888899' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111118', border: '1px solid #222230', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#e8e8f0', marginBottom: '24px' }}>Send us a Message</h2>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ color: '#e8e8f0', marginBottom: '8px' }}>Message Sent!</h3>
              <p style={{ color: '#888899' }}>We will get back to you within 24 hours.</p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div><label style={lbl}>Full Name</label><input style={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Smith" /></div>
                <div><label style={lbl}>Email</label><input style={inp} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@email.com" /></div>
              </div>
              <div style={{ marginBottom: '16px' }}><label style={lbl}>Subject</label><input style={inp} value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="How can we help?" /></div>
              <div style={{ marginBottom: '24px' }}><label style={lbl}>Message</label><textarea style={{ ...inp, resize: 'vertical' } as React.CSSProperties} rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us more about your question..." /></div>
              <button onClick={() => setSent(true)} style={{
                width: '100%', padding: '14px', fontSize: '16px', fontWeight: 700,
                background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
              }}>Send Message</button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
