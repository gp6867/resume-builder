import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ResumeX AI — Free AI Resume Builder | ATS Optimized Resumes',
  description: 'Build professional ATS-optimized resumes in minutes with AI. Free resume builder with cover letter generator, ATS score checker and professional templates. Get hired faster.',
  keywords: 'AI resume builder, free resume builder, ATS resume, professional resume, resume maker, CV builder, cover letter generator, ATS score checker, resume templates, job resume',
  authors: [{ name: 'ResumeX AI' }],
  creator: 'ResumeX AI',
  publisher: 'ResumeX AI',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://resumex-ai.com'
  },
  openGraph: {
    type: 'website',
    url: 'https://resumex-ai.com',
    title: 'ResumeX AI — Free AI Resume Builder',
    description: 'Build professional ATS-optimized resumes in minutes with AI. Free resume builder with cover letter generator and ATS score checker.',
    siteName: 'ResumeX AI',
    images: [{ url: 'https://resumex-ai.com/og-image.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeX AI — Free AI Resume Builder',
    description: 'Build professional ATS-optimized resumes in minutes with AI.',
    images: ['https://resumex-ai.com/og-image.png']
  },
  verification: {
    google: 'dbUJSdlebTL1TFveLy-o_AteoGfpmXZy_Uwz_W4a-e8'
  }
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
