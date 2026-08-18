import { Workbench, Martian_Mono } from 'next/font/google'

export const workbench = Workbench({
  subsets: ['latin'],
  variable: '--font-display-active',
  display: 'swap',
  axes: ['BLED', 'SCAN'],
})

export const martian = Martian_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-martian',
  display: 'swap',
})

export const allFontVars = [workbench.variable, martian.variable].join(' ')
