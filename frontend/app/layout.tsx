import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ResumeX AI — Build Your Perfect Resume with AI',
  description: 'Create professional ATS-optimized resumes in minutes using AI. Free resume builder with cover letter generator and ATS score checker.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
