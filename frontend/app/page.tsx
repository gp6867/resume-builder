'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Script from 'next/script'
import { useState, useEffect, useRef } from 'react'

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
  { q: 'What is ATS and why does it matter?', a: 'ATS (Applicant Tracking System) is software that automatically filters resumes before a human sees them. Over 95% of Fortune 500 companies use ATS. Our AI optimizes your resume to pass these filters and reach real recruiters.' },
  { q: 'How does the AI write my resume?', a: 'You enter your job title, skills, and experience. Claude AI — one of the most advanced AI models available — analyzes your input and writes tailored bullet points, a professional summary, and a skills section specific to your target role and job description.' },
  { q: 'Can I download my resume as a PDF?', a: 'Yes. Your completed resume downloads instantly as a clean, professional PDF — no watermarks, no ResumeX AI branding. Just your resume, ready to send.' },
  { q: 'How is ResumeX AI different from other resume builders?', a: 'Most resume builders are just templates — you still write everything yourself. ResumeX AI actually writes your resume for you using AI, then scores it for ATS compatibility, then writes your cover letter. It does the work, not you.' },
  { q: 'How do I get more free resumes?', a: 'Use the referral system in your dashboard. Share your unique link — when 7 friends sign up using your link, you automatically receive 1 extra free resume credit.' },
  { q: 'What types of resumes can I create?', a: 'ResumeX AI works for all industries and experience levels — software engineers, marketing professionals, healthcare workers, fresh graduates, career changers, and more. The AI adapts the content to your specific field.' },
]

// Animation demo data
const DEMO_STEPS = [
  {
    label: 'Fill Your Details',
    content: (
      <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '20px', border: '1px solid #222230' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#666688', marginBottom: '4px' }}>Full Name</div>
            <div style={{ background: '#1a1a28', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#e8e8f0', border: '1px solid #6c63ff' }}>John Smith</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#666688', marginBottom: '4px' }}>Target Job</div>
            <div style={{ background: '#1a1a28', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#e8e8f0', border: '1px solid #222230' }}>Software Engineer</div>
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '10px', color: '#666688', marginBottom: '4px' }}>Skills</div>
          <div style={{ background: '#1a1a28', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#e8e8f0', border: '1px solid #222230' }}>Python, React, Node.js, AWS, PostgreSQL</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <div style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 700, color: 'white' }}>
            🚀 Generate My Resume with AI
          </div>
        </div>
      </div>
    )
  },
  {
    label: 'AI Generates Resume',
    content: (
      <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '20px', border: '1px solid #6c63ff44' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '20px' }}>🤖</div>
          <div style={{ fontSize: '13px', color: '#6c63ff', fontWeight: 600 }}>Claude AI is writing your resume...</div>
        </div>
        {['Analyzing your job title and skills...', 'Writing professional summary...', 'Creating achievement bullet points...', 'Optimizing for ATS systems...'].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#6c63ff22', border: '1px solid #6c63ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#6c63ff', flexShrink: 0 }}>✓</div>
            <div style={{ fontSize: '12px', color: '#888899' }}>{t}</div>
          </div>
        ))}
      </div>
    )
  },
  {
    label: 'Download Your Resume',
    content: (
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e0e0e0' }}>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#111', marginBottom: '4px' }}>John Smith</div>
        <div style={{ fontSize: '11px', color: '#555', marginBottom: '12px' }}>✉ john@email.com  📍 New York, USA</div>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee', paddingBottom: '4px', marginBottom: '8px' }}>Summary</div>
        <div style={{ fontSize: '11px', color: '#333', lineHeight: 1.5, marginBottom: '12px' }}>Results-driven Software Engineer with expertise in Python and React. Led development initiatives resulting in 40% performance improvements...</div>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee', paddingBottom: '4px', marginBottom: '8px' }}>Skills</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {['Python', 'React', 'Node.js', 'AWS', 'PostgreSQL'].map(s => (
            <span key={s} style={{ background: '#f0f0f5', border: '1px solid #ddd', borderRadius: '4px', padding: '2px 8px', fontSize: '10px', color: '#333' }}>{s}</span>
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
          padding: '80px 20px 60px',
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a0a4a 0%, #0a0a0f 70%)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '10%', left: '15%', width: '300px', height: '300px', background: '#6c63ff', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '20%', right: '10%', width: '200px', height: '200px', background: '#a855f7', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.12, pointerEvents: 'none' }} />

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#6c63ff18', border: '1px solid #6c63ff40', borderRadius: '999px', padding: '6px 16px', fontSize: '13px', color: '#a78bfa', fontWeight: 600, marginBottom: '32px', letterSpacing: '0.5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6c63ff', display: 'inline-block' }} />
            Powered by Claude AI — Free to Start
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.05, marginBottom: '20px', maxWidth: '900px', letterSpacing: '-2px' }}>
            AI Resume Builder for<br />
            <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', minWidth: '400px', transition: 'opacity 0.4s', opacity: visible ? 1 : 0 }}>
              {ROLES[roleIdx]}
            </span>
          </h1>

          <p style={{ fontSize: '18px', color: '#9999bb', maxWidth: '520px', lineHeight: 1.7, marginBottom: '48px' }}>
            Stop getting rejected by ATS systems. Our AI resume maker writes a tailored, professional resume in 60 seconds — optimized to get you interviews at top companies.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '60px' }}>
            <Link href="/builder">
              <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: '16px 40px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '17px', fontWeight: 700, boxShadow: '0 0 40px #6c63ff44', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Build My Resume Free →
              </button>
            </Link>
            <Link href="/pricing">
              <button style={{ background: 'transparent', color: '#e8e8f0', padding: '16px 36px', borderRadius: '12px', border: '1px solid #333', cursor: 'pointer', fontSize: '17px', fontWeight: 600, transition: 'border 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#6c63ff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}>
                View Pricing
              </button>
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[{ num: '50,000+', label: 'Resumes Created' }, { num: '94%', label: 'ATS Pass Rate' }, { num: '60 sec', label: 'Build Time' }, { num: '4.9★', label: 'User Rating' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#e8e8f0' }}>{s.num}</div>
                <div style={{ fontSize: '12px', color: '#666688', marginTop: '4px', letterSpacing: '0.5px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ANIMATED DEMO SECTION */}
        <section style={{ padding: '100px 20px', background: '#0d0d15' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>How It Works</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-1px' }}>
                From zero to hired-ready<br />in under 60 seconds
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              {/* Steps */}
              <div>
                {[
                  { num: '01', title: 'Enter Your Details', desc: 'Add your name, job title, skills, and experience. Takes 30 seconds.' },
                  { num: '02', title: 'AI Builds Your Resume', desc: 'Claude AI writes tailored bullet points, professional summary, and optimizes for ATS.' },
                  { num: '03', title: 'Download & Apply', desc: 'Get your ATS-optimized resume as PDF. Start applying to jobs immediately.' },
                ].map((s, i) => (
                  <div key={s.num}
                    onClick={() => setDemoStep(i)}
                    style={{
                      display: 'flex', gap: '20px', alignItems: 'flex-start',
                      marginBottom: '32px', cursor: 'pointer',
                      opacity: demoStep === i ? 1 : 0.5,
                      transition: 'opacity 0.3s'
                    }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                      background: demoStep === i ? 'linear-gradient(135deg, #6c63ff, #a855f7)' : '#1a1a28',
                      border: demoStep === i ? 'none' : '1px solid #222230',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: 800, color: demoStep === i ? 'white' : '#444466',
                      transition: 'all 0.3s'
                    }}>{s.num}</div>
                    <div>
                      <div style={{ fontSize: '17px', fontWeight: 700, color: '#e8e8f0', marginBottom: '6px' }}>{s.title}</div>
                      <div style={{ fontSize: '14px', color: '#666688', lineHeight: 1.6 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
                <Link href="/builder">
                  <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: '14px 32px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, marginTop: '8px' }}>
                    Try It Free Now →
                  </button>
                </Link>
              </div>

              {/* Animated Preview */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  background: '#111118', borderRadius: '16px', padding: '24px',
                  border: '1px solid #222230',
                  boxShadow: '0 0 60px #6c63ff22'
                }}>
                  {/* Step indicator */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        height: '3px', flex: 1, borderRadius: '999px',
                        background: demoStep === i ? '#6c63ff' : '#222230',
                        transition: 'background 0.3s'
                      }} />
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>
                    STEP {demoStep + 1} — {DEMO_STEPS[demoStep].label.toUpperCase()}
                  </div>
                  <div style={{ transition: 'opacity 0.3s' }}>
                    {DEMO_STEPS[demoStep].content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: '100px 20px', background: '#0a0a0f' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Features</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-1px' }}>
                The best free AI resume builder<br />online — here's why
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[
                { icon: '🤖', title: 'AI Resume Generator', desc: 'Claude AI reads your experience and writes achievement-focused bullet points, compelling summary, and tailored skills — all optimized for your target role.', tag: 'Core' },
                { icon: '📊', title: 'ATS Resume Checker', desc: 'Get a real ATS compatibility score out of 100. See exactly which keywords are missing and what formatting issues are filtering you out automatically.', tag: 'Essential' },
                { icon: '✉️', title: 'AI Cover Letter Writer', desc: 'Paste the job description and get a personalized, professional cover letter in seconds. Tailored to the specific role, company, and your background.', tag: 'Exclusive' },
                { icon: '🎨', title: 'Professional Resume Templates', desc: 'Clean, modern CV templates designed to pass ATS systems while looking sharp to human recruiters at top companies worldwide.', tag: 'Design' },
                { icon: '📥', title: 'Instant PDF Resume Download', desc: 'Download your completed resume as a professional PDF instantly. No watermarks, no branding — just your resume, ready to send to employers.', tag: 'Instant' },
                { icon: '🔗', title: 'Refer Friends — Get Free Resumes', desc: 'Invite 7 friends and earn 1 extra free resume automatically. Share your unique referral link and grow your resume credits with zero effort.', tag: 'New' },
              ].map(f => (
                <div key={f.title} style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '16px', padding: '28px', transition: 'border-color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#6c63ff44'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e30'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span style={{ fontSize: '32px' }}>{f.icon}</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#6c63ff', background: '#6c63ff15', border: '1px solid #6c63ff30', borderRadius: '999px', padding: '3px 10px' }}>{f.tag}</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: '#e8e8f0' }}>{f.title}</h3>
                  <p style={{ color: '#666688', fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section style={{ padding: '100px 20px', background: '#0d0d15' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>FAQ</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-1px' }}>
                Everything you need to know about<br />our AI resume builder
              </h2>
            </div>

            {FAQS.map((faq, i) => (
              <div key={i} style={{ marginBottom: '8px', background: '#111118', border: `1px solid ${openFaq === i ? '#6c63ff44' : '#1e1e30'}`, borderRadius: '12px', overflow: 'hidden', transition: 'border 0.2s' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#e8e8f0', textAlign: 'left' }}>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: '#6c63ff', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: '14px', color: '#888899', lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ textAlign: 'center', padding: '100px 20px', background: 'radial-gradient(ellipse 80% 60% at 50% 100%, #1a0a4a 0%, #0a0a0f 70%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '300px', height: '300px', background: '#6c63ff', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.1, pointerEvents: 'none' }} />
          <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Get Started Today</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px', lineHeight: 1.1 }}>
            Your next interview<br />starts with a better resume.
          </h2>
          <p style={{ color: '#9999bb', fontSize: '16px', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
            Join thousands of job seekers using our free AI resume builder to get noticed. Takes 60 seconds. No credit card needed.
          </p>
          <Link href="/signup">
            <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: '18px 56px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 700, boxShadow: '0 0 60px #6c63ff44', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Build Your Free Resume Now
            </button>
          </Link>
          <p style={{ color: '#444466', fontSize: '13px', marginTop: '16px' }}>Free resume builder • No credit card • ATS optimized • 60 seconds</p>
        </section>

      </main>
    </>
  )
}
