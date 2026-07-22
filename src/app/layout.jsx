import './globals.css'
import ScanlineOverlay from '../components/ScanlineOverlay'
import EnvelopeIntro from '../components/EnvelopeIntro'
import { CloseAttemptProvider } from '../context/CloseAttemptContext'

export const metadata = {
  title: 'ISpy | become Palintir and get rewarded by building',
  description: 'Join the Hack Club Slack and head to #ispy channel!',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="relative">
          <EnvelopeIntro />
          <ScanlineOverlay />
          <CloseAttemptProvider>{children}</CloseAttemptProvider>
        </div>
      </body>
    </html>
  )
}
