import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '思目咖啡厅 - Podcast',
  description: 'Connie康妮大哥的播客独立站',
  keywords: ['播客', 'Podcast', '思目咖啡厅', 'Connie康妮大哥'],
  authors: [{ name: 'Connie康妮大哥' }],
  openGraph: {
    title: '思目咖啡厅',
    description: 'Connie康妮大哥的播客独立站',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
