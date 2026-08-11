import Navbar from '@/components/Navbar'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Tips & Career Advice Blog | ResumeX AI',
  description: 'Free resume writing tips, ATS optimization guides, cover letter examples, and career advice. Learn how to write a professional resume that gets interviews.',
  keywords: 'resume tips, how to write a resume, ATS resume, resume builder guide, cover letter tips, resume examples, job search tips, career advice, resume format, resume writing'
}

const posts = [
  {
    slug: 'how-to-write-ats-resume',
    title: 'How to Write an ATS-Optimized Resume in 2025 (Complete Guide)',
    excerpt: 'Learn exactly how Applicant Tracking Systems work and how to write a resume that passes ATS filters every time. Includes keywords, formatting tips, and examples.',
    date: 'August 2025',
    readTime: '8 min read',
    tag: 'ATS Resume'
  },
  {
    slug: 'ai-resume-builder-guide',
    title: 'How to Use an AI Resume Builder to Land More Interviews',
    excerpt: 'AI resume builders have changed job searching forever. Learn how to use AI to write a professional resume, cover letter, and optimize for any job description.',
    date: 'August 2025',
    readTime: '6 min read',
    tag: 'AI Resume Builder'
  },
  {
    slug: 'resume-tips-2025',
    title: '15 Resume Tips That Will Get You More Interviews in 2025',
    excerpt: 'The job market has changed. These 15 proven resume writing tips will help you stand out from hundreds of applicants and land more interview callbacks.',
    date: 'July 2025',
    readTime: '7 min read',
    tag: 'Resume Tips'
  },
  {
    slug: 'cover-letter-guide',
    title: 'How to Write a Cover Letter That Gets Read (With Examples)',
    excerpt: 'Most cover letters get ignored. Learn the exact formula for writing a compelling cover letter that makes hiring managers want to read your resume.',
    date: 'July 2025',
    readTime: '5 min read',
    tag: 'Cover Letter'
  },
]

export default function Blog() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#0a0a0f', minHeight: '100vh', padding: '80px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Resume Tips & Career Advice</div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#e8e8f0', letterSpacing: '-1px', marginBottom: '16px' }}>
              Resume Writing Tips<br />& Career Advice Blog
            </h1>
            <p style={{ color: '#888899', fontSize: '16px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Free guides on resume writing, ATS optimization, cover letters, and job search strategies to help you land your dream job faster.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '16px', padding: '32px', transition: 'border-color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#6c63ff44'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e30'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#6c63ff', background: '#6c63ff15', border: '1px solid #6c63ff30', borderRadius: '999px', padding: '3px 10px' }}>{post.tag}</span>
                    <span style={{ fontSize: '12px', color: '#444466' }}>{post.date} · {post.readTime}</span>
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#e8e8f0', marginBottom: '10px', lineHeight: 1.3 }}>{post.title}</h2>
                  <p style={{ color: '#666688', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>{post.excerpt}</p>
                  <span style={{ fontSize: '13px', color: '#6c63ff', fontWeight: 600 }}>Read Article →</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '80px', background: 'linear-gradient(135deg, #1a1040, #0a0a1f)', border: '1px solid #6c63ff33', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#e8e8f0', marginBottom: '12px' }}>Ready to build your resume?</h3>
            <p style={{ color: '#888899', marginBottom: '24px' }}>Use our free AI resume builder to create a professional, ATS-optimized resume in 60 seconds.</p>
            <Link href="/builder">
              <button style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: 'white', padding: '14px 32px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700 }}>
                Build My Free Resume →
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
