'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 20px',
          background: 'radial-gradient(ellipse at top, #1a1040 0%, #0a0a0f 60%)'
        }}>
          <div style={{
            background: '#6c63ff22',
            border: '1px solid #6c63ff44',
            borderRadius: '999px',
            padding: '6px 20px',
            fontSize: '13px',
            color: '#6c63ff',
            marginBottom: '28px',
            fontWeight: 600
          }}>
            ✦ AI-Powered Resume Builder
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '800px',
            color: '#e8e8f0'
          }}>
            Build Your Perfect Resume{' '}
            <span style={{ color: '#6c63ff' }}>With AI</span>
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#888899',
            maxWidth: '560px',
            lineHeight: 1.7,
            marginBottom: '40px'
          }}>
            Create ATS-optimized resumes in minutes. Get hired faster with AI-generated content tailored to your dream job.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/builder">
              <button style={{
                background: '#6c63ff', color: 'white', padding: '14px 36px',
                borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontSize: '16px', fontWeight: 600
              }}>
                Build My Resume — Free →
              </button>
            </Link>
            <Link href="/pricing">
              <button style={{
                background: 'transparent', color: '#6c63ff', padding: '14px 36px',
                borderRadius: '8px', border: '2px solid #6c63ff', cursor: 'pointer',
                fontSize: '16px', fontWeight: 600
              }}>
                View Pricing
              </button>
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '48px', marginTop: '72px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { num: '50,000+', label: 'Resumes Created' },
              { num: '94%', label: 'ATS Pass Rate' },
              { num: '3 min', label: 'Average Build Time' },
              { num: '4.9★', label: 'User Rating' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#6c63ff' }}>{s.num}</div>
                <div style={{ fontSize: '13px', color: '#888899', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '80px 40px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 800, marginBottom: '16px', color: '#e8e8f0' }}>
            Everything You Need
          </h2>
          <p style={{ textAlign: 'center', color: '#888899', marginBottom: '56px', fontSize: '16px' }}>
            Powerful features to land your dream job
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🤖', title: 'AI Resume Generation', desc: 'Enter your details and AI writes a professional resume instantly.' },
              { icon: '📊', title: 'ATS Score Checker', desc: 'Know exactly how your resume scores against tracking systems.' },
              { icon: '✉️', title: 'Cover Letter Writer', desc: 'AI generates cover letters matched to job descriptions.' },
              { icon: '🎨', title: 'Beautiful Templates', desc: '5+ professional templates that stand out and get noticed.' },
              { icon: '📥', title: 'PDF Download', desc: 'Download your resume as a clean, print-ready file instantly.' },
              { icon: '⚡', title: 'Done in 3 Minutes', desc: 'Go from zero to complete resume faster than making coffee.' },
            ].map((f) => (
              <div key={f.title} style={{
                background: '#111118', border: '1px solid #222230',
                borderRadius: '12px', padding: '24px', transition: 'border 0.2s',
                cursor: 'default'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px', color: '#e8e8f0' }}>{f.title}</h3>
                <p style={{ color: '#888899', fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          textAlign: 'center', padding: '80px 20px',
          background: 'linear-gradient(135deg, #1a1040 0%, #0a0a0f 100%)',
          borderTop: '1px solid #222230'
        }}>
          <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '16px', color: '#e8e8f0' }}>
            Ready to Get Hired?
          </h2>
          <p style={{ color: '#888899', fontSize: '16px', marginBottom: '36px' }}>
            Join thousands who landed their dream jobs with ResumeAI
          </p>
          <Link href="/builder">
            <button style={{
              background: '#6c63ff', color: 'white', padding: '16px 48px',
              borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '17px', fontWeight: 700
            }}>
              Start Building — It's Free →
            </button>
          </Link>
        </section>
      </main>
    </>
  )
}
