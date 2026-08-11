import Navbar from '@/components/Navbar'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '15 Resume Tips to Get More Interviews in 2025 | ResumeX AI',
  description: '15 proven resume writing tips for 2025. Learn how to write a professional resume, format it correctly, and use keywords to get more interview callbacks.',
  keywords: 'resume tips, resume writing tips, how to write a resume, resume advice, resume format, resume examples, resume keywords, professional resume tips, resume checklist 2025'
}

export default function ResumeTips() {
  const h2 = { fontSize: '20px', fontWeight: 800, color: '#e8e8f0', marginBottom: '12px', marginTop: '36px' }
  const p = { color: '#888899', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }

  const tips = [
    { title: 'Tailor Your Resume for Every Job', desc: 'A generic resume is a rejected resume. Customize your skills section, summary, and bullet points for each specific job description. Use keywords from the posting.' },
    { title: 'Write a Powerful Professional Summary', desc: 'Your summary is the first thing recruiters read. Write 2-3 sentences that describe who you are, your key expertise, and your career goal. Make it specific, not generic.' },
    { title: 'Use Action Verbs to Start Every Bullet', desc: 'Start each bullet point with a strong action verb: Led, Developed, Increased, Reduced, Managed, Implemented. Never start with "Responsible for" or "Helped with".' },
    { title: 'Quantify Your Achievements', desc: 'Numbers stand out on resumes. Instead of "improved sales", write "increased sales by 35% in Q3 2024". Quantify wherever possible — percentages, dollar amounts, team sizes.' },
    { title: 'Keep It to One or Two Pages', desc: 'Unless you have 10+ years of relevant experience, keep your resume to one page. Two pages maximum. Recruiters spend an average of 7 seconds on initial review.' },
    { title: 'Use a Clean, ATS-Friendly Format', desc: 'Avoid tables, columns, graphics, and fancy fonts. Use a single-column layout with standard fonts. Fancy formatting often breaks ATS parsers and makes your resume unreadable.' },
    { title: 'Include a Dedicated Skills Section', desc: 'List your technical and soft skills clearly. This is where ATS systems scan most heavily for keyword matches. Include both tools and skills.' },
    { title: 'Match the Job Description Keywords', desc: 'Read the job description and find the top 10 keywords. Include these exact words in your resume — especially in your skills section and bullet points.' },
    { title: 'Use Standard Section Headers', desc: 'Use these exact headers: Work Experience, Education, Skills, Summary, Certifications. ATS systems are programmed to look for these specific terms.' },
    { title: 'Put Your Most Recent Job First', desc: 'Always use reverse chronological order — most recent job at the top, oldest at the bottom. This is what recruiters and ATS systems expect.' },
    { title: 'Include Relevant Certifications', desc: 'Certifications show you have validated skills. Include any relevant certifications with the full name, issuing organization, and date obtained.' },
    { title: 'Write a Tailored Cover Letter', desc: 'A strong cover letter increases your chances significantly. Customize it for each job — reference the company name, the specific role, and why you are a good fit.' },
    { title: 'Proofread Carefully', desc: 'Spelling errors and grammar mistakes are immediate red flags. Proofread your resume at least three times. Read it backward to catch errors your brain might skip.' },
    { title: 'Save as PDF', desc: 'Always save and submit your resume as PDF unless specified otherwise. PDF preserves your formatting and is readable by modern ATS systems.' },
    { title: 'Use an AI Resume Builder', desc: 'AI resume builders like ResumeX AI write optimized content for you automatically — including ATS-friendly keywords, achievement bullet points, and a professional summary tailored to your target role.' },
  ]

  return (
    <>
      <Navbar />
      <main style={{ background: '#0a0a0f', minHeight: '100vh', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <Link href="/blog" style={{ color: '#6c63ff', textDecoration: 'none', fontSize: '14px' }}>← Back to Blog</Link>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', margin: '20px 0' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#6c63ff', background: '#6c63ff15', border: '1px solid #6c63ff30', borderRadius: '999px', padding: '3px 10px' }}>Resume Tips</span>
              <span style={{ fontSize: '12px', color: '#444466' }}>July 2025 · 7 min read</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#e8e8f0', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: '20px' }}>
              15 Resume Tips That Will Get You More Interviews in 2025
            </h1>
            <p style={{ ...p, fontSize: '17px', color: '#9999bb' }}>
              The job market is more competitive than ever. These 15 proven resume writing tips will help your resume stand out, pass ATS systems, and land you more interview callbacks.
            </p>
          </div>

          {tips.map((tip, i) => (
            <div key={i} style={{ marginBottom: '8px', background: '#111118', border: '1px solid #1e1e30', borderRadius: '12px', padding: '24px', display: 'flex', gap: '20px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: 'white', flexShrink: 0 }}>{i + 1}</div>
              <div>
                <h2 style={{ ...h2, marginTop: 0, fontSize: '16px' }}>{tip.title}</h2>
                <p style={{ ...p, marginBottom: 0 }}>{tip.desc}</p>
              </div>
            </div>
          ))}

          <div style={{ background: 'linear-gradient(135deg, #1a1040, #0a0a1f)', border: '1px solid #6c63ff33', borderRadius: '16px', padding: '32px', textAlign: 'center', marginTop: '48px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#e8e8f0', marginBottom: '12px' }}>Apply All 15 Tips Automatically</h3>
            <p style={{ color: '#888899', marginBottom: '24px', fontSize: '14px' }}>ResumeX AI applies all these best practices automatically when it builds your resume. Free to start.</p>
            <Link href="/builder">
              <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: '14px 32px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700 }}>
                Build My Resume Free →
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
