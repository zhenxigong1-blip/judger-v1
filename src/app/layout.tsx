import type { Metadata } from 'next'
import '@/styles/globals.css'
import { SessionProvider } from '@/components/SessionProvider'
import { Navbar } from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Judger - 招聘与招聘判断平台',
  description: '为求职者和企业提供高效的招聘解决方案',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen">
        <SessionProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}