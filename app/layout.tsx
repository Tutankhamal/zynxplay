import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/context/AppContext'
import { LanguageProvider } from '@/context/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zynx Play - Futuristic Gaming Store',
  description: 'The ultimate destination for gaming mods and digital products',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <LanguageProvider>
          <AppProvider>
            {/* Efeitos de luz de fundo */}
            <div className="main-light-effect"></div>
            <div className="secondary-light"></div>
            
            {/* Seletor de idioma flutuante */}
            <LanguageSelector />
            
            {children}
          </AppProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
