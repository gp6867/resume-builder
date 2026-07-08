import Navbar from '@/components/Navbar'

export default function Privacy() {
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
          <h1 style={{ fontSize: '40px', fontWeight: 900, color: '#e8e8f0', marginBottom: '12px' }}>Privacy Policy</h1>
          <p style={{ color: '#888899' }}>Last updated: July 2025</p>
        </div>

        {section('1. Information We Collect', 'We collect information you provide directly to us when creating an account, such as your name, email address, and password. We also collect the resume information you input into our platform including work experience, education, and skills. This information is used solely to provide and improve our resume building service.')}
        {section('2. How We Use Your Information', 'We use the information we collect to provide, maintain, and improve our services, process transactions, send technical notices and support messages, and respond to your comments and questions. We do not sell, trade, or otherwise transfer your personally identifiable information to third parties.')}
        {section('3. Data Storage and Security', 'Your data is stored securely on our servers. We implement industry-standard security measures including encryption in transit and at rest. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.')}
        {section('4. Cookies', 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.')}
        {section('5. Third-Party Services', 'Our service may contain links to third-party websites. We have no control over the content, privacy policies, or practices of any third-party sites or services. We use Stripe for payment processing and Google for authentication, both of which have their own privacy policies.')}
        {section('6. Data Retention', 'We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your account and associated data at any time by contacting us at support@resumex-ai.com.')}
        {section('7. Your Rights', 'You have the right to access, update, or delete the information we have on you. You may also object to processing of your personal information, ask us to restrict processing, and request portability of your personal information. To exercise these rights, please contact us.')}
        {section('8. Changes to This Policy', 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the date at the top. You are advised to review this Privacy Policy periodically for any changes.')}
        {section('9. Contact Us', 'If you have any questions about this Privacy Policy, please contact us at support@resumex-ai.com or through our Contact page.')}
      </main>
    </>
  )
}
