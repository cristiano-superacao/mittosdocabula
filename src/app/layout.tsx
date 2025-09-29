import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MittoS do Cabula - Plataforma de Torneios',
  description: 'A melhor plataforma para criar e participar de torneios de fantasy football',
  keywords: 'fantasy football, torneios, cartola, futebol, brasil',
  authors: [{ name: 'MittoS do Cabula' }],
  openGraph: {
    title: 'MittoS do Cabula - Plataforma de Torneios',
    description: 'A melhor plataforma para criar e participar de torneios de fantasy football',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}