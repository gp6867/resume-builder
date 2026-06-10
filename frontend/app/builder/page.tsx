'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8000', headers: { 'Content-Type': 'application/json' } })

export default function Builder() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [generating, setGenerating] = useState(false)
  const [resume, setResume] = useState<any>(null)
  const [preview, setPreview] = useState('')
  const [atsScore, setAtsScore] = useState<any>(null)
  const [coverLetter, setCoverLetter] = useState('')
  const [activeTab, setActiveTab] = useState('resume')
  const [limitReached, setLimitReached] = useState(false)

  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', location: '',
    job_title: '', years_experience: 1, skills: '',
    job_description: '', company_name: '',
    work_experience: [{ job_title: '', company: '', location: '', start_date: '', end_date: 'Present', description: '' }],
    education: [{ degree: '', institution: '', location: '', start_date: '', end_date: '', gpa: '' }]
  })

  useEffect(() => {
    if (!loading && !user) router.push('/signup')
    if (user) setForm(f => ({ ...f, full_name: user.name || '', email: user.email || '' }))
  }, [user, loading])

  const update = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }))

  const updateWork = (i: number, field: string, value: string) => {
    const arr = [...form.work_experience]
    arr[i] = { ...arr[i], [field]: value }
    setForm(f => ({ ...f, work_experience: arr }))
  }

  const updateEdu = (i: number, field: string, value: string) => {
    const arr = [...form.education]
    arr[i] = { ...arr[i], [field]: value }
    setForm(f => ({ ...f, education: arr }))
  }

  const handleGenerate = async () => {
    if (!form.full_name || !form.email || !form.job_title) {
      alert('Name, Email and Job Title are required!')
      return
    }
    setGenerating(true)
    setLimitReached(false)
    try {
      const payload = {
        ...form,
        user_id: user?.id,
        skills: form.skills.split(',').map((s: string) => s.trim()).filter(Boolean),
        years_experience: Number(form.years_experience)
      }
      const res = await API.post('/api/resume/generate', payload)
      const resumeData = {
        ...res.data.resume,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        location: form.location
      }
      setResume(resumeData)
      const prev = await API.post('/api/export/preview', { resume: resumeData })
      setPreview(prev.data)
      const resumeText = `${form.full_name} ${form.job_title} ${form.skills}`
      const ats = await API.post('/api/ats/score', { resume_text: resumeText, job_description: form.job_description })
      setAtsScore(ats.data)
      setStep(2)
    } catch (e: any) {
      if (e.response?.status === 403) {
        setLimitReached(true)
      } else {
        alert('Error: ' + (e.response?.data?.detail || e.message))
      }
    }
    setGenerating(false)
  }

  const handleCoverLetter = async () => {
    setGenerating(true)
    try {
      const res = await API.post('/api/cover-letter/generate', {
        full_name: form.full_name, email: form.email,
        job_title: form.job_title, company_name: form.company_name || 'the company',
        job_description: form.job_description, resume_summary: resume?.summary || ''
      })
      setCoverLetter(res.data.cover_letter)
    } catch (e: any) {
      alert('Error: ' + (e.response?.data?.detail || e.message))
    }
    setGenerating(false)
  }

  const downloadHTML = () => {
    const blob = new Blob([preview], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.full_name.replace(' ', '_')}_resume.html`
    a.click()
  }

  if (loading) return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#6c63ff', fontSize: '18px' }}>Loading...</div>
    </main>
  )

  const inp: React.CSSProperties = { background: '#1a1a28', border: '1px solid #222230', borderRadius: '8px', color: '#e8e8f0', padding: '10px 14px', fontSize: '14px', width: '100%', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '13px', color: '#888899', marginBottom: '6px', fontWeight: 500 }
  const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }
  const card: React.CSSProperties = { background: '#111118', border: '1px solid #222230', borderRadius: '12px', padding: '24px', marginBottom: '24px' }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>

        {/* Free Limit Banner */}
        {limitReached && (
          <div style={{
            background: 'linear-gradient(135deg, #1a1040, #2a1060)',
            border: '1px solid #6c63ff',
            borderRadius: '12px', padding: '24px',
            marginBottom: '28px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚀</div>
            <h3 style={{ color: '#e8e8f0', fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
              Free Plan Limit Reached
            </h3>
            <p style={{ color: '#888899', marginBottom: '20px' }}>
              You've used your 1 free resume. Upgrade to Pro for unlimited resumes, all templates, and AI cover letters.
            </p>
            <Link href="/pricing">
              <button style={{
                background: '#6c63ff', color: 'white', padding: '12px 32px',
                border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '16px'
              }}>
                Upgrade to Pro — $9/mo ⚡
              </button>
            </Link>
          </div>
        )}

        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', color: '#e8e8f0' }}>
          {step === 1 ? '📝 Build Your Resume' : '✅ Your Resume is Ready!'}
        </h1>
        <p style={{ color: '#888899', marginBottom: '36px' }}>
          {step === 1 ? 'Fill in your details and AI will create a professional resume' : 'Review, download or generate a cover letter'}
        </p>

        {step === 1 && (
          <div>
            <div style={card}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#6c63ff' }}>👤 Personal Info</h2>
              <div style={row}>
                <div style={{ marginBottom: '16px' }}><label style={lbl}>Full Name *</label><input style={inp} value={form.full_name} onChange={e => update('full_name', e.target.value)} placeholder="John Smith" /></div>
                <div style={{ marginBottom: '16px' }}><label style={lbl}>Email *</label><input style={inp} value={form.email} onChange={e => update('email', e.target.value)} placeholder="john@email.com" /></div>
                <div style={{ marginBottom: '16px' }}><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 234 567 8900" /></div>
                <div style={{ marginBottom: '16px' }}><label style={lbl}>Location</label><input style={inp} value={form.location} onChange={e => update('location', e.target.value)} placeholder="New York, USA" /></div>
                <div style={{ marginBottom: '16px' }}><label style={lbl}>Target Job Title *</label><input style={inp} value={form.job_title} onChange={e => update('job_title', e.target.value)} placeholder="Software Engineer" /></div>
                <div style={{ marginBottom: '16px' }}><label style={lbl}>Years of Experience</label><input style={inp} type="number" min={0} max={50} value={form.years_experience} onChange={e => update('years_experience', e.target.value)} /></div>
              </div>
              <div style={{ marginBottom: '16px' }}><label style={lbl}>Skills (comma separated) *</label><input style={inp} value={form.skills} onChange={e => update('skills', e.target.value)} placeholder="Python, React, Node.js, AWS" /></div>
              <div style={{ marginBottom: '16px' }}><label style={lbl}>Job Description (optional)</label><textarea style={{ ...inp, resize: 'vertical' } as React.CSSProperties} rows={3} value={form.job_description} onChange={e => update('job_description', e.target.value)} placeholder="Paste the job description here for better AI matching..." /></div>
              <div style={{ marginBottom: '16px' }}><label style={lbl}>Target Company</label><input style={inp} value={form.company_name} onChange={e => update('company_name', e.target.value)} placeholder="Google, Amazon, etc." /></div>
            </div>

            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#6c63ff' }}>💼 Work Experience</h2>
                <button onClick={() => setForm(f => ({ ...f, work_experience: [...f.work_experience, { job_title: '', company: '', location: '', start_date: '', end_date: 'Present', description: '' }] }))}
                  style={{ background: 'transparent', color: '#6c63ff', padding: '6px 14px', borderRadius: '8px', border: '2px solid #6c63ff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                  + Add More
                </button>
              </div>
              {form.work_experience.map((w, i) => (
                <div key={i} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: i < form.work_experience.length - 1 ? '1px solid #222230' : 'none' }}>
                  <div style={row}>
                    <div style={{ marginBottom: '16px' }}><label style={lbl}>Job Title</label><input style={inp} value={w.job_title} onChange={e => updateWork(i, 'job_title', e.target.value)} placeholder="Software Engineer" /></div>
                    <div style={{ marginBottom: '16px' }}><label style={lbl}>Company</label><input style={inp} value={w.company} onChange={e => updateWork(i, 'company', e.target.value)} placeholder="Tech Corp" /></div>
                    <div style={{ marginBottom: '16px' }}><label style={lbl}>Location</label><input style={inp} value={w.location} onChange={e => updateWork(i, 'location', e.target.value)} placeholder="New York" /></div>
                    <div style={{ marginBottom: '16px' }}><label style={lbl}>Start Date</label><input style={inp} value={w.start_date} onChange={e => updateWork(i, 'start_date', e.target.value)} placeholder="Jan 2022" /></div>
                    <div style={{ marginBottom: '16px' }}><label style={lbl}>End Date</label><input style={inp} value={w.end_date} onChange={e => updateWork(i, 'end_date', e.target.value)} placeholder="Present" /></div>
                  </div>
                  <div><label style={lbl}>Description</label><textarea style={{ ...inp, resize: 'vertical' } as React.CSSProperties} rows={2} value={w.description} onChange={e => updateWork(i, 'description', e.target.value)} placeholder="What did you accomplish here?" /></div>
                </div>
              ))}
            </div>

            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#6c63ff' }}>🎓 Education</h2>
                <button onClick={() => setForm(f => ({ ...f, education: [...f.education, { degree: '', institution: '', location: '', start_date: '', end_date: '', gpa: '' }] }))}
                  style={{ background: 'transparent', color: '#6c63ff', padding: '6px 14px', borderRadius: '8px', border: '2px solid #6c63ff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                  + Add More
                </button>
              </div>
              {form.education.map((e, i) => (
                <div key={i} style={row}>
                  <div style={{ marginBottom: '16px' }}><label style={lbl}>Degree</label><input style={inp} value={e.degree} onChange={ev => updateEdu(i, 'degree', ev.target.value)} placeholder="B.S. Computer Science" /></div>
                  <div style={{ marginBottom: '16px' }}><label style={lbl}>Institution</label><input style={inp} value={e.institution} onChange={ev => updateEdu(i, 'institution', ev.target.value)} placeholder="MIT" /></div>
                  <div style={{ marginBottom: '16px' }}><label style={lbl}>Start Year</label><input style={inp} value={e.start_date} onChange={ev => updateEdu(i, 'start_date', ev.target.value)} placeholder="2018" /></div>
                  <div style={{ marginBottom: '16px' }}><label style={lbl}>End Year</label><input style={inp} value={e.end_date} onChange={ev => updateEdu(i, 'end_date', ev.target.value)} placeholder="2022" /></div>
                  <div style={{ marginBottom: '16px' }}><label style={lbl}>GPA (optional)</label><input style={inp} value={e.gpa} onChange={ev => updateEdu(i, 'gpa', ev.target.value)} placeholder="3.8" /></div>
                </div>
              ))}
            </div>

            <button onClick={handleGenerate} disabled={generating} style={{
              width: '100%', padding: '16px', fontSize: '18px', fontWeight: 700,
              background: generating ? '#444' : '#6c63ff', color: 'white',
              border: 'none', borderRadius: '8px', cursor: generating ? 'not-allowed' : 'pointer'
            }}>
              {generating ? '⏳ Generating your resume...' : '🚀 Generate My Resume with AI'}
            </button>
          </div>
        )}

        {step === 2 && resume && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {['resume', 'ats', 'cover'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  background: activeTab === tab ? '#6c63ff' : '#111118',
                  color: activeTab === tab ? 'white' : '#888899',
                  fontWeight: 600, fontSize: '14px'
                }}>
                  {tab === 'resume' ? '📄 Resume' : tab === 'ats' ? '📊 ATS Score' : '✉️ Cover Letter'}
                </button>
              ))}
              <button onClick={downloadHTML} style={{
                marginLeft: 'auto', padding: '10px 20px', background: '#6c63ff',
                color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px'
              }}>⬇ Download</button>
              <button onClick={() => setStep(1)} style={{
                padding: '10px 20px', background: 'transparent', color: '#6c63ff',
                border: '2px solid #6c63ff', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px'
              }}>← Edit</button>
            </div>

            {activeTab === 'resume' && (
              <div style={{ background: 'white', border: '1px solid #222230', borderRadius: '12px', overflow: 'hidden' }}>
                <iframe srcDoc={preview} style={{ width: '100%', height: '750px', border: 'none' }} title="Resume Preview" />
              </div>
            )}

            {activeTab === 'ats' && atsScore && (
              <div style={{ background: '#111118', border: '1px solid #222230', borderRadius: '12px', padding: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#e8e8f0' }}>ATS Analysis</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                  <div style={{
                    width: '110px', height: '110px', borderRadius: '50%',
                    background: `conic-gradient(#6c63ff ${atsScore.score}%, #222230 0)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px', fontWeight: 900, color: '#e8e8f0'
                  }}>{atsScore.score}</div>
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#6c63ff' }}>Grade: {atsScore.grade}</div>
                    <div style={{ color: '#888899' }}>ATS Compatibility Score</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <h3 style={{ color: '#ff6584', marginBottom: '12px' }}>⚠️ Issues</h3>
                    {atsScore.issues?.map((item: string) => <div key={item} style={{ padding: '8px 0', borderBottom: '1px solid #222230', fontSize: '14px', color: '#e8e8f0' }}>• {item}</div>)}
                  </div>
                  <div>
                    <h3 style={{ color: '#6c63ff', marginBottom: '12px' }}>✅ Improvements</h3>
                    {atsScore.improvements?.map((item: string) => <div key={item} style={{ padding: '8px 0', borderBottom: '1px solid #222230', fontSize: '14px', color: '#e8e8f0' }}>• {item}</div>)}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cover' && (
              <div style={{ background: '#111118', border: '1px solid #222230', borderRadius: '12px', padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#e8e8f0' }}>✉️ Cover Letter</h2>
                  {!coverLetter ? (
                    <button onClick={handleCoverLetter} disabled={generating} style={{
                      background: '#6c63ff', color: 'white', padding: '10px 20px',
                      border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
                    }}>{generating ? 'Generating...' : '🤖 Generate with AI'}</button>
                  ) : (
                    <button onClick={() => { navigator.clipboard.writeText(coverLetter); alert('Copied!') }} style={{
                      background: 'transparent', color: '#6c63ff', padding: '10px 20px',
                      border: '2px solid #6c63ff', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
                    }}>📋 Copy</button>
                  )}
                </div>
                {coverLetter ? (
                  <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} rows={16}
                    style={{ background: '#1a1a28', border: '1px solid #222230', borderRadius: '8px', color: '#e8e8f0', padding: '16px', fontSize: '14px', width: '100%', lineHeight: 1.7, resize: 'vertical' }} />
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px', color: '#888899' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
                    <p>Click "Generate with AI" to create a personalized cover letter</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </>
  )
}
