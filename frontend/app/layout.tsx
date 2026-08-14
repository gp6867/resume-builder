import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import Footer from '@/components/Footer'
import Script from 'next/script'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  title: 'ResumeX AI — Free AI Resume Builder | ATS Optimized Resumes',
  description: 'Create professional ATS-optimized resumes in minutes using AI. Free resume builder with cover letter generator, ATS score checker and professional templates. Get hired faster.',
  keywords: 'AI resume builder, free resume builder, ATS resume, professional resume, resume maker, CV builder, cover letter generator',
  robots: 'index, follow',
  verification: {
    google: 'dbUJSdlebTL1TFveLy-o_AteoGfpmXZy_Uwz_W4a-e8'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1C43B9S5Y4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1C43B9S5Y4');
          `}
        </Script>
      </head>
      <body>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
