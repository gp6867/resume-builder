import Navbar from '@/components/Navbar'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Write a Cover Letter That Gets Read in 2025 | ResumeX AI',
  description: 'Step-by-step guide to writing a compelling cover letter. Includes examples, templates, and tips to make hiring managers read your resume every time.',
  keywords: 'how to write a cover letter, cover letter examples, cover letter template, cover letter tips, professional cover letter, AI cover letter generator, cover letter format 2025'
}

export default function CoverLetterGuide() {
  const h2 = { fontSize: '24px', fontWeight: 800, color: '#e8e8f0', marginBottom: '16px', marginTop: '48px' }
  const p = { color: '#888899', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }

  return (
    <>
      <Navbar />
      <main style={{ background: '#0a0a0f', minHeight: '100vh', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <Link href="/blog" style={{ color: '#6c63ff', textDecoration: 'none', fontSize: '14px' }}>← Back to Blog</Link>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', margin: '20px 0' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#6c63ff', background: '#6c63ff15', border: '1px solid #6c63ff30', borderRadius: '999px', padding: '3px 10px' }}>Cover Letter</span>
              <span style={{ fontSize: '12px', color: '#444466' }}>July 2025 · 5 min read</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#e8e8f0', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: '20px' }}>
              How to Write a Cover Letter That Gets Read (With Examples)
            </h1>
            <p style={{ ...p, fontSize: '17px', color: '#9999bb' }}>
              Most cover letters are ignored. Here is the exact formula for writing a cover letter that makes hiring managers want to immediately read your resume — and invite you for an interview.
            </p>
          </div>

          <h2 style={h2}>Do Cover Letters Still Matter in 2025?</h2>
          <p style={p}>Yes — but only if they are good. A generic cover letter hurts more than it helps. A tailored, specific cover letter can be the difference between getting an interview and getting ignored, especially for competitive roles.</p>
          <p style={p}>Studies show that 53% of hiring managers say a great cover letter can get a candidate an interview even when their resume alone would not. The key word is "great" — not generic.</p>

          <h2 style={h2}>The 4-Paragraph Cover Letter Formula</h2>

          <h2 style={{ ...h2, fontSize: '18px', marginTop: '24px' }}>Paragraph 1: The Hook</h2>
          <p style={p}>Open with something specific that shows you know the company and the role. Do not start with "I am writing to apply for..." — this is what everyone writes. Instead, reference something specific about the company, a recent project they launched, or a challenge in the industry they are addressing.</p>

          <h2 style={{ ...h2, fontSize: '18px', marginTop: '24px' }}>Paragraph 2: Why You Are the Right Fit</h2>
          <p style={p}>Connect your specific experience and skills to the job requirements. Pick two or three key requirements from the job description and show — with specific examples — how your background directly addresses them. Use numbers where possible.</p>

          <h2 style={{ ...h2, fontSize: '18px', marginTop: '24px' }}>Paragraph 3: Why This Company</h2>
          <p style={p}>Show that you have done your research. Mention something specific about the company — their mission, a recent product, their culture, or their position in the market. Explain why this specific company excites you, not just any company in the industry.</p>

          <h2 style={{ ...h2, fontSize: '18px', marginTop: '24px' }}>Paragraph 4: The Close</h2>
          <p style={p}>End with a clear call to action. Express genuine enthusiasm, thank them for their time, and invite next steps. Keep it confident but not arrogant.</p>

          <h2 style={h2}>Cover Letter Mistakes to Avoid</h2>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            {[
              'Starting with "I am writing to apply for..." — everyone does this',
              'Summarizing your resume instead of adding new information',
              'Being too long — keep it to one page, ideally 3-4 short paragraphs',
              'Using a generic template without customizing for the company',
              'Not addressing the specific job requirements',
              'Forgetting to include the hiring manager\'s name if available',
            ].map(item => <li key={item} style={{ color: '#888899', fontSize: '15px', lineHeight: 1.8, marginBottom: '8px' }}>{item}</li>)}
          </ul>

          <h2 style={h2}>Use AI to Write Your Cover Letter</h2>
          <p style={p}>Writing a tailored cover letter for every job is time-consuming. ResumeX AI generates a personalized cover letter in seconds — you just paste the job description and the AI writes a tailored letter based on your resume and the specific role.</p>

          <div style={{ background: 'linear-gradient(135deg, #1a1040, #0a0a1f)', border: '1px solid #6c63ff33', borderRadius: '16px', padding: '32px', textAlign: 'center', marginTop: '48px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#e8e8f0', marginBottom: '12px' }}>Generate Your Cover Letter with AI</h3>
            <p style={{ color: '#888899', marginBottom: '24px', fontSize: '14px' }}>ResumeX AI writes personalized cover letters in seconds. Included free with your resume.</p>
            <Link href="/builder">
              <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: '14px 32px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700 }}>
                Build My Resume & Cover Letter →
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
