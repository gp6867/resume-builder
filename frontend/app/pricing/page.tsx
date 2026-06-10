'use client'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Script from 'next/script'

declare global { interface Window { Razorpay: any } }

export default function Pricing() {
  const { user } = useAuth()
  const router = useRouter()

  const handlePayment = (plan: { name: string; price: number; amount: number }) => {
    if (!user) { router.push('/signup'); return }

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID',  // razorpay.com pe free account banao
      amount: plan.amount,
      currency: 'USD',
      name: 'ResumeAI',
      description: `${plan.name} Plan`,
      image: '',
      handler: function (response: any) {
        alert(`✅ Payment successful! ID: ${response.razorpay_payment_id}`)
        router.push('/dashboard')
      },
      prefill: { name: user.name, email: user.email },
      theme: { color: '#6c63ff' },
      modal: { ondismiss: () => {} }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const plans = [
    {
      name: 'Free', price: '$0', period: 'forever', color: '#888899', amount: 0,
      features: ['1 Resume', 'Basic Templates', 'PDF Download', 'ATS Score Check'],
      cta: 'Get Started Free', highlight: false, free: true
    },
    {
      name: 'Pro', price: '$9', period: 'per month', color: '#6c63ff', amount: 90000,
      features: ['Unlimited Resumes', 'All Templates', 'AI Cover Letters', 'Advanced ATS', 'Priority Support'],
      cta: 'Start Pro — $9/mo', highlight: true, free: false
    },
    {
      name: 'Lifetime', price: '$49', period: 'one time', color: '#ff6584', amount: 490000,
      features: ['Everything in Pro', 'Lifetime Access', 'Future Updates', 'Commercial Use'],
      cta: 'Get Lifetime — $49', highlight: false, free: false
    }
  ]

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
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
                onClick={() => plan.free ? router.push('/builder') : handlePayment(plan)}
                style={{
                  width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 700,
                  fontSize: '14px', cursor: 'pointer', border: `2px solid ${plan.color}`,
                  background: plan.highlight ? plan.color : 'transparent',
                  color: plan.highlight ? 'white' : plan.color
                }}>{plan.cta}</button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px', color: '#888899', fontSize: '14px' }}>
          🔒 Secure payment by Razorpay &nbsp;•&nbsp; Cancel anytime &nbsp;•&nbsp; 7-day money back guarantee
        </div>
      </main>
    </>
  )
}
