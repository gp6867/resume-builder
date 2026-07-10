'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Script from 'next/script'

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ResumeX AI",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered resume builder that creates professional ATS-optimized resumes in minutes",
    "url": "https://resumex-ai.com",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    }
  }

  return (
    <>
      <Script id="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        <section style={{
          minHeight: '90vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '60px 20px',
          background: 'radial-gradient(ellipse at top, #1a1040 0%, #0a0a0f 60%)'
        }}>
          <div style={{
            background: '#6c63ff22', border: '1px solid #6c63ff44',
            borderRadius: '999px', padding: '6px 20px', fontSize: '13px',
            color: '#6c63ff', marginBottom: '28px', fontWeight: 600
          }}>
            #1 AI-Powered Resume Builder
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900,
            lineHeight: 1.1, marginBottom: '24px', maxWidth: '800px', color: '#e8e8f0'
          }}>
            Free AI Resume Builder —{' '}
            <span style={{ color: '#6c63ff' }}>Get Hired Faster</span>
          </h1>
          <p style={{
            fontSize: '18px', color: '#888899', maxWidth: '580px',
            lineHeight: 1.7, marginBottom: '16px'
          }}>
            Create professional, ATS-optimized resumes in minutes. Used by job seekers worldwide to land interviews at top companies.
          </p>
          <p style={{ fontSize: '14px', color: '#666677', marginBottom: '40px' }}>
            Free resume builder • ATS score checker • AI cover letter generator • Professional templates
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/builder">
              <button style={{
                background: '#6c63ff', color: 'white', padding: '14px 36px',
                borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 600
              }}>Build My Resume — Free</button>
            </Link>
            <Link href="/pricing">
              <button style={{
                background: 'transparent', color: '#6c63ff', padding: '14px 36px',
                borderRadius: '8px', border: '2px solid #6c63ff', cursor: 'pointer', fontSize: '16px', fontWeight: 600
              }}>View Pricing</button>
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
            The Best Free AI Resume Builder Online
          </h2>
          <p style={{ textAlign: 'center', color: '#888899', marginBottom: '56px', fontSize: '16px', maxWidth: '600px', margin: '0 auto 56px' }}>
            ResumeX AI uses advanced artificial intelligence to create professional resumes that pass ATS systems and impress hiring managers.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: 'AI', title: 'AI Resume Generation', desc: 'Our AI instantly creates a professional resume tailored to your target job. Get achievement-focused bullet points and industry-specific language automatically.' },
              { icon: 'ATS', title: 'ATS Score Checker', desc: 'Check your resume ATS compatibility score before applying. Get specific feedback to maximize your chances of passing automated screening systems.' },
              { icon: 'CL', title: 'AI Cover Letter Generator', desc: 'Generate personalized cover letters matched to any job description. Save hours of writing time with AI-powered cover letter creation.' },
              { icon: 'TM', title: 'Professional Templates', desc: 'Choose from multiple clean, professional resume templates designed to impress hiring managers at top companies worldwide.' },
              { icon: 'DL', title: 'Instant PDF Download', desc: 'Download your completed resume as a professional PDF instantly. Ready to send to employers right away with no watermarks.' },
              { icon: 'DB', title: 'Resume Dashboard', desc: 'Save and manage all your resumes in one place. Access, edit, and download your resumes anytime from any device.' },
            ].map((f) => (
              <div key={f.title} style={{
                background: '#111118', border: '1px solid #222230',
                borderRadius: '12px', padding: '24px'
              }}>
                <div style={{
                  background: '#6c63ff22', border: '1px solid #6c63ff44',
                  borderRadius: '8px', padding: '8px 12px', display: 'inline-block',
                  fontSize: '12px', fontWeight: 700, color: '#6c63ff', marginBottom: '14px'
                }}>{f.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px', color: '#e8e8f0' }}>{f.title}</h3>
                <p style={{ color: '#888899', fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '60px 40px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 800, marginBottom: '48px', color: '#e8e8f0' }}>
            How to Build Your Resume with AI
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { step: '1', title: 'Create Free Account', desc: 'Sign up in seconds. No credit card required to get started.' },
              { step: '2', title: 'Enter Your Details', desc: 'Fill in your work experience, education, skills and target job title.' },
              { step: '3', title: 'AI Builds Your Resume', desc: 'Our AI instantly generates a professional, tailored resume for you.' },
              { step: '4', title: 'Download and Apply', desc: 'Download your ATS-optimized resume and start applying to jobs today.' },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: 'center', padding: '24px', background: '#111118', borderRadius: '12px', border: '1px solid #222230' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#6c63ff', color: 'white', fontSize: '20px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{s.step}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e8e8f0', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: '#888899', fontSize: '14px', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 800, marginBottom: '48px', color: '#e8e8f0' }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'Is ResumeX AI free to use?', a: 'Yes! ResumeX AI offers a free plan that includes one AI-generated resume with ATS score checking and PDF download. Upgrade to Pro for unlimited resumes and all features.' },
            { q: 'What is an ATS resume?', a: 'ATS stands for Applicant Tracking System. These are software tools companies use to automatically screen resumes. Our AI builds resumes optimized to pass ATS filters and reach human recruiters.' },
            { q: 'How does the AI resume builder work?', a: 'Simply enter your personal details, work experience, education, and skills. Our AI analyzes your information and generates a professional resume with tailored bullet points, a strong summary, and industry-specific language.' },
            { q: 'Can I download my resume as PDF?', a: 'Yes! You can download your completed resume as a PDF file instantly. The download is available on all plans including the free plan.' },
            { q: 'How is ResumeX AI different from other resume builders?', a: 'ResumeX AI uses advanced AI to generate tailored resume content — not just fill-in-the-blank templates. We also provide ATS compatibility scoring, AI cover letter generation, and job description matching to maximize your chances of getting hired.' },
          ].map((faq) => (
            <div key={faq.q} style={{ marginBottom: '16px', background: '#111118', border: '1px solid #222230', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e8e8f0', marginBottom: '10px' }}>{faq.q}</h3>
              <p style={{ color: '#888899', fontSize: '14px', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </section>

        <section style={{
          textAlign: 'center', padding: '80px 20px',
          background: 'linear-gradient(135deg, #1a1040 0%, #0a0a0f 100%)',
          borderTop: '1px solid #222230'
        }}>
          <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '16px', color: '#e8e8f0' }}>
            Start Building Your Resume Today
          </h2>
          <p style={{ color: '#888899', fontSize: '16px', marginBottom: '36px' }}>
            Join thousands of job seekers using AI to land their dream jobs. Free to start, no credit card required.
          </p>
          <Link href="/signup">
            <button style={{
              background: '#6c63ff', color: 'white', padding: '16px 48px',
              borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '17px', fontWeight: 700
            }}>
              Build Your Free Resume Now
            </button>
          </Link>
        </section>
      </main>
    </>
  )
}
