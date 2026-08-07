'use client'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Pricing() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handlePayment = async (plan: { name: string; price: string; free: boolean }) => {
    if (plan.free) { router.push('/builder'); return }
    if (!user) { router.push('/signup'); return }

    setLoading(plan.name)
    try {
      const res = await fetch('https://resume-builder-1-jeiw.onrender.com/api/payment/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_name: plan.name,
          user_email: user.email,
          user_id: user.id
        })
      })
      const data = await res.json()
      if (data.session_url) {
        window.location.href = data.session_url
      }
    } catch (e) {
      alert('Payment failed. Please try again.')
    }
    setLoading(null)
  }

  const plans = [
    {
      name: 'Free', price: '$0', period: 'forever', color: '#888899',
      features: ['1 Resume', 'Basic Templates', 'PDF Download', 'ATS Score Check'],
      cta: 'Get Started Free', highlight: false, free: true
    },
    {
      name: 'Pro', price: '$9', period: 'per month', color: '#6c63ff',
      features: ['Unlimited Resumes', 'All Templates', 'AI Cover Letters', 'Advanced ATS', 'Priority Support'],
      cta: 'Start Pro — $9/mo', highlight: true, free: false
    },
    {
      name: 'Lifetime', price: '$49', period: 'one time', color: '#ff6584',
      features: ['Everything in Pro', 'Lifetime Access', 'Future Updates', 'Commercial Use'],
      cta: 'Get Lifetime — $49', highlight: false, free: false
    }
  ]

  return (
    <>
      <Navbar />
      <main style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '16px', color: '#e8e8f0' }}>Simple Pricing</h1>
          <p style={{ color: '#888899', fontSize: '18px' }}>Start free, upgrade when you need more</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{
              background: '#111118',
              border: `${plan.highlight ? '2px' : '1px'} solid ${plan.highlight ? plan.color : '#222230'}`,
              borderRadius: '12px', padding: '32px', position: 'relative',
              transform: plan.highlight ? 'scale(1.03)' : 'none'
            }}>
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                  background: '#6c63ff', color: 'white', padding: '4px 16px',
                  borderRadius: '999px', fontSize: '12px', fontWeight: 700
                }}>MOST POPULAR</div>
              )}
              <div style={{ color: plan.color, fontSize: '13px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{plan.name}</div>
              <div style={{ fontSize: '44px', fontWeight: 900, marginBottom: '4px', color: '#e8e8f0' }}>{plan.price}</div>
              <div style={{ color: '#888899', fontSize: '13px', marginBottom: '28px' }}>{plan.period}</div>
              <ul style={{ listStyle: 'none', marginBottom: '32px' }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ padding: '8px 0', borderBottom: '1px solid #222230', fontSize: '14px', color: '#e8e8f0' }}>
                    <span style={{ color: plan.color, marginRight: '8px' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePayment(plan)}
                disabled={loading === plan.name}
                style={{
                  width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 700,
                  fontSize: '14px', cursor: loading === plan.name ? 'not-allowed' : 'pointer',
                  border: `2px solid ${plan.color}`,
                  background: plan.highlight ? plan.color : 'transparent',
                  color: plan.highlight ? 'white' : plan.color,
                  opacity: loading === plan.name ? 0.7 : 1
                }}>
                {loading === plan.name ? 'Processing...' : plan.cta}
              </button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px', color: '#888899', fontSize: '14px' }}>
          Secure payment by Stripe — Cancel anytime — 7-day money back guarantee
        </div>
      </main>
    </>
  )
}
