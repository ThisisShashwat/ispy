import './globals.css'
import { allFontVars } from '../lib/fonts'

export const metadata = {
  title: 'ISPY | build spyware, get spy gear',
  description: 'Join the Hack Club Slack and head to #ispy channel!',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={allFontVars} style={{ '--accent': '#E5231B' }}>
      <body>{children}</body>
    </html>
  )
}
