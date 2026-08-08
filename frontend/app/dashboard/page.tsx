'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import axios from 'axios'

const API = axios.create({ baseURL: 'https://resume-builder-1-jeiw.onrender.com' })

export default function Dashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [resumes, setResumes] = useState<any[]>([])
  const [referral, setReferral] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/login')
    if (user) { fetchResumes(); fetchReferral() }
  }, [user, loading])

  const fetchResumes = async () => {
    try {
      const res = await API.get(`/api/resume/my-resumes/${user?.id}`)
      setResumes(res.data.resumes)
    } catch (e) {}
  }

  const fetchReferral = async () => {
    try {
      const res = await API.post('/api/referral/get-referral-code', { user_id: user?.id })
      setReferral(res.data)
    } catch (e) {}
  }

  const copyReferralLink = () => {
    if (referral?.referral_url) {
      navigator.clipboard.writeText(referral.referral_url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const deleteResume = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return
    try {
      await API.delete(`/api/resume/delete/${id}`)
      setResumes(r => r.filter(x => x.id !== id))
    } catch (e) {}
  }

  if (loading) return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#6c63ff', fontSize: '18px' }}>Loading...</div>
    </main>
  )
  if (!user) return null

  const displayName = user.name ? user.name.split(' ')[0] : user.email.split('@')[0]
  const referred = referral?.total_referred || 0
  const progress = ((referred % 7) / 7) * 100
  const needed = 7 - (referred % 7)

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#e8e8f0' }}>Welcome back, {displayName}!</h1>
            <p style={{ color: '#888899', marginTop: '4px', fontSize: '14px' }}>{user.email}</p>
          </div>
          <button onClick={() => { logout(); router.push('/') }} style={{
            background: 'transparent', color: '#ff6584', padding: '8px 16px',
            border: '1px solid #ff658444', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px'
          }}>Log Out</button>
        </div>

        {/* Plan + Referral side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          
          {/* Plan Card */}
          <div style={{ background: '#111118', border: '1px solid #6c63ff44', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#888899', fontSize: '12px', marginBottom: '4px' }}>Current Plan</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#6c63ff', textTransform: 'uppercase' }}>{user.plan || 'Free'}</div>
              <div style={{ color: '#888899', fontSize: '12px', marginTop: '2px' }}>1 resume on free plan</div>
            </div>
            {(!user.plan || user.plan === 'free') && (
              <Link href="/pricing">
                <button style={{ background: '#6c63ff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}>
                  Upgrade ⚡
                </button>
              </Link>
            )}
          </div>

          {/* Referral Card */}
          {(!user.plan || user.plan === 'free') && (
            <div style={{ background: 'linear-gradient(135deg, #1a1040, #0a0a1f)', border: '1px solid #6c63ff44', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#e8e8f0' }}>Invite Friends — Get Free Resume!</div>
                  <div style={{ fontSize: '12px', color: '#888899', marginTop: '2px' }}>Invite 7 friends → 1 extra free resume</div>
                </div>
                <div style={{ textAlign: 'center', background: '#6c63ff22', borderRadius: '8px', padding: '6px 12px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#6c63ff' }}>{referred}/7</div>
                  <div style={{ fontSize: '11px', color: '#888899' }}>Joined</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ background: '#222230', borderRadius: '999px', height: '6px', overflow: 'hidden', marginBottom: '10px' }}>
                <div style={{ background: 'linear-gradient(90deg, #6c63ff, #a855f7)', height: '100%', width: `${progress}%`, borderRadius: '999px' }} />
              </div>

              {/* Referral Link */}
              {referral?.referral_url && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, background: '#1a1a28', border: '1px solid #222230', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', color: '#888899', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {referral.referral_url}
                  </div>
                  <button onClick={copyReferralLink} style={{
                    background: copied ? '#00d4aa' : '#6c63ff', color: 'white', padding: '6px 12px',
                    border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px', whiteSpace: 'nowrap'
                  }}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}

              {/* Share Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <a href={`https://wa.me/?text=Create%20your%20professional%20resume%20for%20free%20with%20AI!%20${encodeURIComponent(referral?.referral_url || '')}`} target="_blank" style={{
                  background: '#25D366', color: 'white', padding: '5px 10px',
                  borderRadius: '6px', textDecoration: 'none', fontSize: '11px', fontWeight: 600
                }}>WhatsApp</a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referral?.referral_url || '')}`} target="_blank" style={{
                  background: '#0077B5', color: 'white', padding: '5px 10px',
                  borderRadius: '6px', textDecoration: 'none', fontSize: '11px', fontWeight: 600
                }}>LinkedIn</a>
              </div>

              {referral?.extra_resumes > 0 && (
                <div style={{ marginTop: '8px', background: '#00d4aa22', border: '1px solid #00d4aa44', borderRadius: '6px', padding: '8px', color: '#00d4aa', fontSize: '12px' }}>
                  {referral.extra_resumes} extra free resume available!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#e8e8f0', marginBottom: '16px' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { icon: '📝', title: 'New Resume', desc: 'Create with AI', href: '/builder', color: '#6c63ff' },
            { icon: '📊', title: 'ATS Checker', desc: 'Check your score', href: '/builder', color: '#00d4aa' },
            { icon: '✉️', title: 'Cover Letter', desc: 'Generate with AI', href: '/builder', color: '#ff6584' },
            { icon: '💎', title: 'Upgrade Plan', desc: 'Get unlimited access', href: '/pricing', color: '#ffd700' },
          ].map((action) => (
            <Link key={action.title} href={action.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111118', border: '1px solid #222230', borderRadius: '12px', padding: '16px', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = action.color)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#222230')}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{action.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#e8e8f0', marginBottom: '2px' }}>{action.title}</div>
                <div style={{ fontSize: '12px', color: '#888899' }}>{action.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* My Resumes */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#e8e8f0' }}>My Resumes ({resumes.length})</h2>
          <Link href="/builder">
            <button style={{ background: '#6c63ff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
              + New Resume
            </button>
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div style={{ background: '#111118', border: '1px solid #222230', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📄</div>
            <p style={{ color: '#888899', marginBottom: '16px' }}>No resumes yet. Create your first one!</p>
            <Link href="/builder">
              <button style={{ background: '#6c63ff', color: 'white', padding: '10px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                Create Your First Resume →
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
            {resumes.map((r) => (
              <div key={r.id} style={{ background: '#111118', border: '1px solid #222230', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📄</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#e8e8f0', marginBottom: '4px' }}>{r.title}</div>
                <div style={{ fontSize: '11px', color: '#888899', marginBottom: '12px' }}>{r.created_at}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link href="/builder" style={{ flex: 1 }}>
                    <button style={{ width: '100%', padding: '6px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Edit</button>
                  </Link>
                  <button onClick={() => deleteResume(r.id)} style={{ padding: '6px 10px', background: 'transparent', color: '#ff6584', border: '1px solid #ff658444', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
