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
  "description": "Free AI resume builder that creates professional ATS-optimized resumes in minutes using Claude AI",
  "url": "https://resumex-ai.com",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847" }
}

const ROLES = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'Marketing Manager', 'DevOps Engineer', 'Business Analyst', 'Full Stack Developer']

const FAQS = [
  { q: 'Is ResumeX AI really free?', a: 'Yes. The free plan includes one AI-generated resume with ATS scoring and PDF download. No credit card required. Upgrade to Pro for unlimited resumes.' },
  { q: 'What is ATS and why does it matter?', a: 'ATS (Applicant Tracking System) is software that automatically filters resumes before a human sees them. Over 95% of Fortune 500 companies use ATS. Our AI optimizes your resume to pass these filters.' },
  { q: 'How does the AI write my resume?', a: 'You enter your job title, skills, and experience. Claude AI analyzes your input and writes tailored bullet points, a professional summary, and a skills section specific to your target role.' },
  { q: 'Can I download my resume as a PDF?', a: 'Yes. Your completed resume downloads instantly as a clean, professional PDF — no watermarks, no branding. Just your resume, ready to send.' },
  { q: 'How is ResumeX AI different from other resume builders?', a: 'Most resume builders are just templates — you still write everything yourself. ResumeX AI actually writes your resume for you using AI, then scores it for ATS compatibility, then writes your cover letter.' },
  { q: 'How do I get more free resumes?', a: 'Use the referral system in your dashboard. Share your unique link — when 7 friends sign up, you automatically receive 1 extra free resume credit.' },
]

const DEMO_STEPS = [
  {
    label: 'Fill Your Details',
    content: (
      <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '16px', border: '1px solid #222230' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#666688', marginBottom: '4px' }}>Full Name</div>
            <div style={{ background: '#1a1a28', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', color: '#e8e8f0', border: '1px solid #6c63ff' }}>John Smith</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#666688', marginBottom: '4px' }}>Target Job</div>
            <div style={{ background: '#1a1a28', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', color: '#e8e8f0', border: '1px solid #222230' }}>Software Engineer</div>
          </div>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '10px', color: '#666688', marginBottom: '4px' }}>Skills</div>
          <div style={{ background: '#1a1a28', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', color: '#e8e8f0', border: '1px solid #222230' }}>Python, React, Node.js, AWS</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', borderRadius: '8px', padding: '8px', fontSize: '12px', fontWeight: 700, color: 'white', textAlign: 'center', marginTop: '8px' }}>
          🚀 Generate My Resume with AI
        </div>
      </div>
    )
  },
  {
    label: 'AI Generates Resume',
    content: (
      <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '16px', border: '1px solid #6c63ff44' }}>
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '18px' }}>🤖</div>
          <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 600 }}>Claude AI is writing your resume...</div>
        </div>
        {['Analyzing your skills...', 'Writing professional summary...', 'Creating bullet points...', 'Optimizing for ATS...'].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#6c63ff22', border: '1px solid #6c63ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#6c63ff', flexShrink: 0 }}>✓</div>
            <div style={{ fontSize: '11px', color: '#888899' }}>{t}</div>
          </div>
        ))}
      </div>
    )
  },
  {
    label: 'Download Your Resume',
    content: (
      <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e0e0e0' }}>
        <div style={{ fontSize: '18px', fontWeight: 900, color: '#111', marginBottom: '2px' }}>John Smith</div>
        <div style={{ fontSize: '10px', color: '#555', marginBottom: '10px' }}>✉ john@email.com  📍 New York, USA</div>
        <div style={{ fontSize: '9px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee', paddingBottom: '3px', marginBottom: '6px' }}>Summary</div>
        <div style={{ fontSize: '10px', color: '#333', lineHeight: 1.5, marginBottom: '10px' }}>Results-driven Software Engineer with expertise in Python and React. Led development resulting in 40% performance improvements...</div>
        <div style={{ fontSize: '9px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee', paddingBottom: '3px', marginBottom: '6px' }}>Skills</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
          {['Python', 'React', 'Node.js', 'AWS'].map(s => (
            <span key={s} style={{ background: '#f0f0f5', border: '1px solid #ddd', borderRadius: '4px', padding: '2px 6px', fontSize: '9px', color: '#333' }}>{s}</span>
          ))}
        </div>
      </div>
    )
  }
]

export default function Home() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [demoStep, setDemoStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setRoleIdx(i => (i + 1) % ROLES.length); setVisible(true) }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep(s => (s + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Script id="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <main style={{ background: '#0a0a0f', color: '#e8e8f0' }}>

        {/* HERO */}
        <section style={{
          minHeight: '92vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: isMobile ? '60px 16px 40px' : '80px 20px 60px',
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a0a4a 0%, #0a0a0f 70%)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '10%', left: '15%', width: '300px', height: '300px', background: '#6c63ff', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, pointerEvents: 'none' }} />

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#6c63ff18', border: '1px solid #6c63ff40', borderRadius: '999px', padding: '6px 16px', fontSize: '13px', color: '#a78bfa', fontWeight: 600, marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6c63ff', display: 'inline-block' }} />
            Powered by Claude AI — Free to Start
          </div>

          <h1 style={{ fontSize: isMobile ? '36px' : 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px', maxWidth: '900px', letterSpacing: isMobile ? '-1px' : '-2px' }}>
            AI Resume Builder for<br />
            <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', transition: 'opacity 0.4s', opacity: visible ? 1 : 0 }}>
              {ROLES[roleIdx]}
            </span>
          </h1>

          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#9999bb', maxWidth: '520px', lineHeight: 1.7, marginBottom: '36px', padding: '0 8px' }}>
            Stop getting rejected by ATS systems. Our AI writes a tailored, professional resume in 60 seconds — optimized to get you interviews.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
            <Link href="/builder">
              <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: isMobile ? '14px 28px' : '16px 40px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: isMobile ? '15px' : '17px', fontWeight: 700, boxShadow: '0 0 40px #6c63ff44' }}>
                Build My Resume Free →
              </button>
            </Link>
            <Link href="/pricing">
              <button style={{ background: 'transparent', color: '#e8e8f0', padding: isMobile ? '14px 24px' : '16px 36px', borderRadius: '12px', border: '1px solid #333', cursor: 'pointer', fontSize: isMobile ? '15px' : '17px', fontWeight: 600 }}>
                View Pricing
              </button>
            </Link>
          </div>

          <div style={{ display: 'flex', gap: isMobile ? '24px' : '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[{ num: '50,000+', label: 'Resumes Created' }, { num: '94%', label: 'ATS Pass Rate' }, { num: '60 sec', label: 'Build Time' }, { num: '4.9★', label: 'User Rating' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: 800, color: '#e8e8f0' }}>{s.num}</div>
                <div style={{ fontSize: '11px', color: '#666688', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS - ANIMATED */}
        <section style={{ padding: isMobile ? '60px 16px' : '100px 20px', background: '#0d0d15' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>How It Works</div>
              <h2 style={{ fontSize: isMobile ? '28px' : 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-1px' }}>
                From zero to hired-ready<br />in under 60 seconds
              </h2>
            </div>

            {/* Mobile: Steps on top, preview below. Desktop: side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '60px', alignItems: 'center' }}>
              
              {/* Steps */}
              <div>
                {[
                  { num: '01', title: 'Enter Your Details', desc: 'Add your name, job title, skills, and experience. Takes 30 seconds.' },
                  { num: '02', title: 'AI Builds Your Resume', desc: 'Claude AI writes tailored bullet points, professional summary, and optimizes for ATS.' },
                  { num: '03', title: 'Download & Apply', desc: 'Get your ATS-optimized resume as PDF. Start applying to jobs immediately.' },
                ].map((s, i) => (
                  <div key={s.num} onClick={() => setDemoStep(i)} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '24px', cursor: 'pointer', opacity: demoStep === i ? 1 : 0.5, transition: 'opacity 0.3s' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0, background: demoStep === i ? 'linear-gradient(135deg, #6c63ff, #a855f7)' : '#1a1a28', border: demoStep === i ? 'none' : '1px solid #222230', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: demoStep === i ? 'white' : '#444466', transition: 'all 0.3s' }}>{s.num}</div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8e8f0', marginBottom: '4px' }}>{s.title}</div>
                      <div style={{ fontSize: '13px', color: '#666688', lineHeight: 1.6 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
                <Link href="/builder">
                  <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: '12px 28px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700, marginTop: '8px' }}>
                    Try It Free Now →
                  </button>
                </Link>
              </div>

              {/* Preview */}
              <div>
                <div style={{ background: '#111118', borderRadius: '16px', padding: '20px', border: '1px solid #222230', boxShadow: '0 0 60px #6c63ff22' }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ height: '3px', flex: 1, borderRadius: '999px', background: demoStep === i ? '#6c63ff' : '#222230', transition: 'background 0.3s' }} />
                    ))}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6c63ff', fontWeight: 600, marginBottom: '10px', letterSpacing: '0.5px' }}>
                    STEP {demoStep + 1} — {DEMO_STEPS[demoStep].label.toUpperCase()}
                  </div>
                  {DEMO_STEPS[demoStep].content}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: isMobile ? '60px 16px' : '100px 20px', background: '#0a0a0f' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Features</div>
              <h2 style={{ fontSize: isMobile ? '28px' : 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-1px' }}>
                The best free AI resume builder<br />online — here is why
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {[
                { icon: '🤖', title: 'AI Resume Generator', desc: 'Claude AI writes achievement-focused bullet points, compelling summary, and tailored skills — optimized for your target role.', tag: 'Core' },
                { icon: '📊', title: 'ATS Resume Checker', desc: 'Get a real ATS compatibility score out of 100. See exactly which keywords are missing and what is filtering you out.', tag: 'Essential' },
                { icon: '✉️', title: 'AI Cover Letter Writer', desc: 'Paste the job description and get a personalized cover letter in seconds. Tailored to the specific role and company.', tag: 'Exclusive' },
                { icon: '🎨', title: 'Professional Templates', desc: 'Clean, modern CV templates designed to pass ATS systems while looking sharp to human recruiters worldwide.', tag: 'Design' },
                { icon: '📥', title: 'Instant PDF Download', desc: 'Download your completed resume as a professional PDF instantly. No watermarks, no branding — just your resume.', tag: 'Instant' },
                { icon: '🔗', title: 'Refer Friends — Get Free Resumes', desc: 'Invite 7 friends and earn 1 extra free resume automatically. Share your unique referral link and grow your credits.', tag: 'New' },
              ].map(f => (
                <div key={f.title} style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '16px', padding: '24px', transition: 'border-color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#6c63ff44'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e30'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <span style={{ fontSize: '28px' }}>{f.icon}</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#6c63ff', background: '#6c63ff15', border: '1px solid #6c63ff30', borderRadius: '999px', padding: '3px 10px' }}>{f.tag}</span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: '#e8e8f0' }}>{f.title}</h3>
                  <p style={{ color: '#666688', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ATS SCORE ANIMATION */}
        <section style={{ padding: isMobile ? '60px 16px' : '100px 20px', background: '#0a0a0f' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>ATS Score Checker</div>
            <h2 style={{ fontSize: isMobile ? '28px' : 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '16px' }}>
              Know your score before you apply
            </h2>
            <p style={{ color: '#9999bb', fontSize: '16px', maxWidth: '500px', margin: '0 auto 48px', lineHeight: 1.7 }}>
              Our AI analyzes your resume against the job description and gives you a real ATS compatibility score with specific fixes.
            </p>

            <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '20px', padding: isMobile ? '24px' : '40px', maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '32px', alignItems: 'center' }}>
                
                {/* Score Circle */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 16px' }}>
                    <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="80" cy="80" r="70" fill="none" stroke="#1e1e30" strokeWidth="12" />
                      <circle cx="80" cy="80" r="70" fill="none" stroke="url(#grad)" strokeWidth="12"
                        strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6c63ff" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                      <div style={{ fontSize: '36px', fontWeight: 900, color: '#e8e8f0' }}>75</div>
                      <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 600 }}>out of 100</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8e8f0', marginBottom: '4px' }}>Grade: B+</div>
                  <div style={{ fontSize: '13px', color: '#888899' }}>ATS Compatibility Score</div>
                </div>

                {/* Issues & Fixes */}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#ff6584', marginBottom: '10px' }}>Issues Found</div>
                    {['Missing keyword: "agile"', 'Add measurable achievements', 'Include certification section'].map(issue => (
                      <div key={issue} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6584', flexShrink: 0 }} />
                        <div style={{ fontSize: '13px', color: '#888899' }}>{issue}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#00d4aa', marginBottom: '10px' }}>AI Suggestions</div>
                    {['Add "Agile/Scrum" to skills', 'Quantify results with numbers', 'Add AWS certification'].map(fix => (
                      <div key={fix} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00d4aa', flexShrink: 0 }} />
                        <div style={{ fontSize: '13px', color: '#888899' }}>{fix}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #1e1e30', textAlign: 'center' }}>
                <Link href="/builder">
                  <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: '12px 32px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>
                    Check My Resume Score Free →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: isMobile ? '60px 16px' : '100px 20px', background: '#0d0d15' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>FAQ</div>
              <h2 style={{ fontSize: isMobile ? '28px' : 'clamp(28px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-1px' }}>
                Everything about our AI resume builder
              </h2>
            </div>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ marginBottom: '8px', background: '#111118', border: `1px solid ${openFaq === i ? '#6c63ff44' : '#1e1e30'}`, borderRadius: '12px', overflow: 'hidden', transition: 'border 0.2s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '18px 20px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#e8e8f0', textAlign: 'left' }}>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: '#6c63ff', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 18px', fontSize: '13px', color: '#888899', lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px' : '100px 20px', background: 'radial-gradient(ellipse 80% 60% at 50% 100%, #1a0a4a 0%, #0a0a0f 70%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Get Started Today</div>
          <h2 style={{ fontSize: isMobile ? '32px' : 'clamp(32px, 5vw, 60px)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-2px', lineHeight: 1.1 }}>
            Your next interview<br />starts with a better resume.
          </h2>
          <p style={{ color: '#9999bb', fontSize: '16px', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
            Join thousands of job seekers using our free AI resume builder. Takes 60 seconds. No credit card needed.
          </p>
          <Link href="/signup">
            <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: isMobile ? '16px 36px' : '18px 56px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: isMobile ? '16px' : '18px', fontWeight: 700, boxShadow: '0 0 60px #6c63ff44' }}>
              Build Your Free Resume Now
            </button>
          </Link>
          <p style={{ color: '#444466', fontSize: '13px', marginTop: '16px' }}>Free resume builder • No credit card • ATS optimized • 60 seconds</p>
        </section>

      </main>
    </>
  )
}
