import Navbar from '@/components/Navbar'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Write an ATS-Optimized Resume in 2025 | ResumeX AI',
  description: 'Learn how to write an ATS-optimized resume that passes applicant tracking systems. Complete guide with keywords, formatting tips, and free resume builder.',
  keywords: 'ATS resume, ATS optimized resume, applicant tracking system, how to write ATS resume, ATS friendly resume, resume keywords, ATS resume checker, ATS resume builder'
}

export default function ATSGuide() {
  const h2 = { fontSize: '24px', fontWeight: 800, color: '#e8e8f0', marginBottom: '16px', marginTop: '48px' }
  const p = { color: '#888899', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }
  const li = { color: '#888899', fontSize: '15px', lineHeight: 1.8, marginBottom: '8px' }

  return (
    <>
      <Navbar />
      <main style={{ background: '#0a0a0f', minHeight: '100vh', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <Link href="/blog" style={{ color: '#6c63ff', textDecoration: 'none', fontSize: '14px' }}>← Back to Blog</Link>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', margin: '20px 0' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#6c63ff', background: '#6c63ff15', border: '1px solid #6c63ff30', borderRadius: '999px', padding: '3px 10px' }}>ATS Resume</span>
              <span style={{ fontSize: '12px', color: '#444466' }}>August 2026 · 8 min read</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#e8e8f0', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: '20px' }}>
              How to Write an ATS-Optimized Resume in 2025 (Complete Guide)
            </h1>
            <p style={{ ...p, fontSize: '17px', color: '#9999bb' }}>
              Over 95% of Fortune 500 companies use Applicant Tracking Systems to filter resumes before a human ever sees them. If your resume is not ATS-optimized, you are invisible — no matter how qualified you are. This guide shows you exactly how to fix that.
            </p>
          </div>

          <h2 style={h2}>What Is an ATS (Applicant Tracking System)?</h2>
          <p style={p}>An Applicant Tracking System (ATS) is software that companies use to automatically scan, sort, and rank job applications. When you submit your resume online, it goes directly into an ATS — not to a human recruiter.</p>
          <p style={p}>The ATS scans your resume for keywords, formatting, and relevance to the job description. Resumes that score below a certain threshold are automatically rejected. The human recruiter only sees the resumes that pass the ATS filter.</p>

          <h2 style={h2}>Why Most Resumes Fail ATS Systems</h2>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            {[
              'Using tables, columns, or graphics that ATS cannot read',
              'Missing keywords from the job description',
              'Using fancy fonts or formatting that confuses the parser',
              'Saving as .jpg or image format instead of PDF or Word',
              'Not including a skills section with relevant keywords',
              'Using headers that ATS does not recognize (e.g. "My Experience" instead of "Work Experience")',
            ].map(item => <li key={item} style={li}>{item}</li>)}
          </ul>

          <h2 style={h2}>How to Write an ATS-Friendly Resume: Step by Step</h2>

          <h2 style={{ ...h2, fontSize: '18px', marginTop: '24px' }}>1. Use Standard Section Headers</h2>
          <p style={p}>ATS systems are programmed to look for specific section headers. Use these exact terms: Work Experience, Education, Skills, Summary, Certifications. Avoid creative labels like "My Journey" or "What I Know".</p>

          <h2 style={{ ...h2, fontSize: '18px', marginTop: '24px' }}>2. Match Keywords from the Job Description</h2>
          <p style={p}>Read the job description carefully and identify the key skills, tools, and qualifications listed. Include these exact keywords naturally throughout your resume — especially in your skills section and bullet points. ATS systems match keywords literally.</p>

          <h2 style={{ ...h2, fontSize: '18px', marginTop: '24px' }}>3. Use a Simple, Clean Format</h2>
          <p style={p}>Stick to a single-column layout. Avoid tables, text boxes, headers, footers, and graphics. Use standard fonts like Arial, Calibri, or Times New Roman. ATS parsers struggle with complex formatting and may misread or skip content.</p>

          <h2 style={{ ...h2, fontSize: '18px', marginTop: '24px' }}>4. Write Achievement-Focused Bullet Points</h2>
          <p style={p}>Each bullet point in your Work Experience section should describe an achievement, not just a duty. Use the format: Action verb + task + measurable result. Example: "Reduced page load time by 40% through code optimization, improving user retention by 25%."</p>

          <h2 style={{ ...h2, fontSize: '18px', marginTop: '24px' }}>5. Include a Dedicated Skills Section</h2>
          <p style={p}>Create a clear Skills section that lists your technical skills, tools, and soft skills as individual items. This is where ATS systems do most of their keyword scanning. Include both the full name and abbreviation (e.g. "Search Engine Optimization (SEO)").</p>

          <h2 style={{ ...h2, fontSize: '18px', marginTop: '24px' }}>6. Save as PDF</h2>
          <p style={p}>Always submit your resume as a PDF unless the job posting specifically requests a Word document. PDF preserves your formatting and is readable by modern ATS systems.</p>

          <h2 style={h2}>Use an AI Resume Builder to Do This Automatically</h2>
          <p style={p}>Writing an ATS-optimized resume from scratch is time-consuming. Our free AI resume builder does it for you automatically. You enter your details, and Claude AI writes a complete, ATS-optimized resume with the right keywords, formatting, and bullet points — in under 60 seconds.</p>

          <div style={{ background: 'linear-gradient(135deg, #1a1040, #0a0a1f)', border: '1px solid #6c63ff33', borderRadius: '16px', padding: '32px', textAlign: 'center', marginTop: '48px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#e8e8f0', marginBottom: '12px' }}>Build Your ATS Resume Free</h3>
            <p style={{ color: '#888899', marginBottom: '24px', fontSize: '14px' }}>Our AI resume builder creates ATS-optimized resumes automatically. No credit card required.</p>
            <Link href="/builder">
              <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: '14px 32px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700 }}>
                Build My ATS Resume Free →
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
