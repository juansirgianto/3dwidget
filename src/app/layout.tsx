// app/layout.tsx (App Router)
import './globals.css'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',   // opsional kalau mau pakai di CSS
})

export const metadata = {
  title: '3D Widget',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>{children}</body>
    </html>
  )
}
