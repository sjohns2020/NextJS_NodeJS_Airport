import './globals.css'
import { Inter } from 'next/font/google'
import Header from './header'
import Footer from './footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airport App',
  description: 'NEXTJS Edinburgh Airport App',
}

export default function RootLayout({ children, title }) {
  return (
    <html lang="en">
      <body>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  )
}
