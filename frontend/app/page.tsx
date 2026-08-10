'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Script from 'next/script'
import { useState, useEffect } from 'react'

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ResumeX AI",
  "applicationCategory": "BusinessApplication",
  "description": "AI-powered resume builder that creates professional ATS-optimized resumes in minutes",
  "url": "https://resumex-ai.com",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1250" }
}

const ROLES = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'Marketing Manager', 'DevOps Engineer']

export default function Home() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length)
        setVisible(true)
      }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Script id="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <main style={{ background: '#0a0a0f', color: '#e8e8f0' }}>

        {/* HERO */}
        <section style={{
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 20px 60px',
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a0a4a 0%, #0a0a0f 70%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Glow orbs */}
          <div style={{ position: 'absolute', top: '10%', left: '15%', width: '300px', height: '300px', background: '#6c63ff', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '20%', right: '10%', width: '200px', height: '200px', background: '#a855f7', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.12, pointerEvents: 'none' }} />

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#6c63ff18', border: '1px solid #6c63ff40',
            borderRadius: '999px', padding: '6px 16px',
            fontSize: '13px', color: '#a78bfa', fontWeight: 600,
            marginBottom: '32px', letterSpacing: '0.5px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6c63ff', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            Powered by Claude AI
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: '20px',
            maxWidth: '900px',
            letterSpacing: '-2px'
          }}>
            Your AI Resume for<br />
            <span style={{
              display: 'inline-block',
              color: '#6c63ff',
              minWidth: '400px',
              transition: 'opacity 0.4s',
              opacity: visible ? 1 : 0
            }}>
              {ROLES[roleIdx]}
            </span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#9999bb',
            maxWidth: '520px',
            lineHeight: 1.7,
            marginBottom: '48px'
          }}>
            Stop getting rejected by ATS systems. Our AI writes a tailored, professional resume in 60 seconds — optimized to get you interviews.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '60px' }}>
            <Link href="/builder">
              <button style={{
                background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
                color: 'white', padding: '16px 40px',
                borderRadius: '12px', border: 'none', cursor: 'pointer',
                fontSize: '17px', fontWeight: 700,
                boxShadow: '0 0 40px #6c63ff44',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 60px #6c63ff66' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px #6c63ff44' }}
              >
                Build My Resume — Free
              </button>
            </Link>
            <Link href="/pricing">
              <button style={{
                background: 'transparent', color: '#e8e8f0', padding: '16px 36px',
                borderRadius: '12px', border: '1px solid #333', cursor: 'pointer',
                fontSize: '17px', fontWeight: 600, transition: 'border 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#6c63ff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}
              >
                View Pricing
              </button>
            </Link>
          </div>

          {/* Social proof */}
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { num: '50,000+', label: 'Resumes Created' },
              { num: '94%', label: 'ATS Pass Rate' },
              { num: '60 sec', label: 'Build Time' },
              { num: '4.9★', label: 'User Rating' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#e8e8f0' }}>{s.num}</div>
                <div style={{ fontSize: '12px', color: '#666688', marginTop: '4px', letterSpacing: '0.5px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* RESUME PREVIEW MOCKUP */}
        <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>See It In Action</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, marginBottom: '48px', letterSpacing: '-1px' }}>
            From zero to hired-ready<br />in under 60 seconds
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { step: '01', title: 'Enter Your Details', desc: 'Job title, skills, experience. Takes 30 seconds.' },
              { step: '02', title: 'AI Builds Your Resume', desc: 'Claude AI writes tailored bullet points, summary, and skills section.' },
              { step: '03', title: 'Download & Apply', desc: 'ATS-optimized PDF ready to send to any employer.' },
            ].map(s => (
              <div key={s.step} style={{
                background: '#111118',
                border: '1px solid #1e1e30',
                borderRadius: '16px',
                padding: '32px 24px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: '-10px', right: '-10px',
                  fontSize: '80px', fontWeight: 900,
                  color: '#6c63ff08', lineHeight: 1
                }}>{s.step}</div>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6c63ff22, #a855f722)',
                  border: '1px solid #6c63ff33',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 800, color: '#6c63ff',
                  marginBottom: '20px'
                }}>{s.step}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '10px', color: '#e8e8f0' }}>{s.title}</h3>
                <p style={{ color: '#666688', fontSize: '14px', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: '80px 20px', background: '#0d0d15' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Features</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-1px' }}>
                Everything you need<br />to land the interview
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[
                {
                  icon: '🤖',
                  title: 'AI Resume Generation',
                  desc: 'Claude AI reads your experience and writes achievement-focused bullet points, a compelling summary, and a tailored skills section — all in under a minute.',
                  tag: 'Core Feature'
                },
                {
                  icon: '📊',
                  title: 'ATS Score Checker',
                  desc: 'Get a real ATS compatibility score out of 100. See exactly which keywords are missing and what formatting issues are getting you filtered out.',
                  tag: 'Save Time'
                },
                {
                  icon: '✉️',
                  title: 'AI Cover Letter',
                  desc: 'Paste the job description and get a personalized cover letter in seconds. Tailored to the role, the company, and your background.',
                  tag: 'Exclusive'
                },
                {
                  icon: '🎨',
                  title: 'Professional Templates',
                  desc: 'Clean, modern templates designed specifically to pass ATS systems while looking sharp to human recruiters.',
                  tag: 'Design'
                },
                {
                  icon: '📥',
                  title: 'Instant PDF Download',
                  desc: 'Download your completed resume as a professional PDF. No watermarks, no branding — just your resume, ready to send.',
                  tag: 'Instant'
                },
                {
                  icon: '🔗',
                  title: 'Refer & Earn Free Resumes',
                  desc: 'Invite 7 friends and get 1 extra free resume. Share your unique link and grow your resume credits automatically.',
                  tag: 'New'
                },
              ].map(f => (
                <div key={f.title} style={{
                  background: '#111118',
                  border: '1px solid #1e1e30',
                  borderRadius: '16px',
                  padding: '28px',
                  transition: 'border-color 0.2s, transform 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#6c63ff44'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e30'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span style={{ fontSize: '32px' }}>{f.icon}</span>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, color: '#6c63ff',
                      background: '#6c63ff15', border: '1px solid #6c63ff30',
                      borderRadius: '999px', padding: '3px 10px', letterSpacing: '0.5px'
                    }}>{f.tag}</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: '#e8e8f0' }}>{f.title}</h3>
                  <p style={{ color: '#666688', fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>FAQ</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-1px' }}>Common questions</h2>
          </div>
          {[
            { q: 'Is ResumeX AI really free?', a: 'Yes. The free plan includes one AI-generated resume with ATS scoring and PDF download. No credit card required. Upgrade to Pro for unlimited resumes and all features.' },
            { q: 'What is ATS and why does it matter?', a: 'ATS (Applicant Tracking System) is software that companies use to automatically filter resumes before a human sees them. Over 95% of large companies use ATS. Our AI optimizes your resume to pass these filters.' },
            { q: 'How does the AI write my resume?', a: 'You enter your job title, skills, and experience. Claude AI — one of the most advanced AI models — analyzes your input and writes tailored bullet points, a professional summary, and a skills section specific to your target role.' },
            { q: 'Can I download my resume as a PDF?', a: 'Yes. Your completed resume downloads as a clean PDF instantly — no watermarks, no ResumeX AI branding. Just your resume.' },
            { q: 'How do I get more free resumes?', a: 'Use the referral system in your dashboard. Share your unique link — when 7 friends sign up, you automatically get 1 extra free resume.' },
          ].map(faq => (
            <div key={faq.q} style={{
              marginBottom: '12px',
              background: '#111118',
              border: '1px solid #1e1e30',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#e8e8f0', marginBottom: '10px' }}>{faq.q}</h3>
              <p style={{ color: '#666688', fontSize: '14px', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </section>

        {/* FINAL CTA */}
        <section style={{
          textAlign: 'center',
          padding: '100px 20px',
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, #1a0a4a 0%, #0a0a0f 70%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '300px', height: '300px', background: '#6c63ff', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.1, pointerEvents: 'none' }} />

          <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Get Started Today</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px', lineHeight: 1.1 }}>
            Your next interview<br />starts with a better resume.
          </h2>
          <p style={{ color: '#9999bb', fontSize: '16px', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
            Join thousands of job seekers using AI to get noticed. Free to start — no credit card needed.
          </p>
          <Link href="/signup">
            <button style={{
              background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
              color: 'white', padding: '18px 56px',
              borderRadius: '12px', border: 'none', cursor: 'pointer',
              fontSize: '18px', fontWeight: 700,
              boxShadow: '0 0 60px #6c63ff44',
              transition: 'transform 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Build Your Free Resume Now
            </button>
          </Link>
          <p style={{ color: '#444466', fontSize: '13px', marginTop: '16px' }}>Free forever • No credit card • Takes 60 seconds</p>
        </section>

      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  )
}
