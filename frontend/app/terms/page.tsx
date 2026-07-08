import Navbar from '@/components/Navbar'

export default function Terms() {
  const section = (title: string, content: string) => (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#e8e8f0', marginBottom: '12px' }}>{title}</h2>
      <p style={{ color: '#888899', lineHeight: 1.8, fontSize: '15px' }}>{content}</p>
    </div>
  )

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 900, color: '#e8e8f0', marginBottom: '12px' }}>Terms of Service</h1>
          <p style={{ color: '#888899' }}>Last updated: July 2025</p>
        </div>

        {section('1. Acceptance of Terms', 'By accessing and using ResumeX AI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.')}
        {section('2. Use of Service', 'ResumeX AI provides an AI-powered resume building platform. You may use this service only for lawful purposes and in accordance with these Terms. You agree not to use the service in any way that violates any applicable local, national, or international law or regulation.')}
        {section('3. User Accounts', 'When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.')}
        {section('4. Intellectual Property', 'The service and its original content, features, and functionality are and will remain the exclusive property of ResumeX AI. The resumes and content you create using our platform belong to you. We claim no intellectual property rights over the content you generate.')}
        {section('5. Payment Terms', 'Paid plans are billed in advance on a monthly basis. All payments are non-refundable except where required by law. We reserve the right to change our pricing at any time with 30 days notice to existing subscribers. Lifetime plans are a one-time payment with no recurring charges.')}
        {section('6. Free Plan Limitations', 'The free plan is limited to one resume generation. We reserve the right to modify free plan limitations at any time. Users on the free plan may upgrade to a paid plan at any time to access additional features.')}
        {section('7. Termination', 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.')}
        {section('8. Disclaimer of Warranties', 'The service is provided on an as-is and as-available basis without any warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, timely, secure, or error-free.')}
        {section('9. Limitation of Liability', 'In no event shall ResumeX AI be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.')}
        {section('10. Changes to Terms', 'We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes. Your continued use of the service after any changes constitutes your acceptance of the new Terms.')}
        {section('11. Contact Us', 'If you have any questions about these Terms, please contact us at support@resumex-ai.com.')}
      </main>
    </>
  )
}
