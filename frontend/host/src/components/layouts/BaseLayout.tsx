import { ReactNode } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import { ScrollRestoration } from 'react-router-dom'

interface BaseLayoutProps {
  children: ReactNode
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
