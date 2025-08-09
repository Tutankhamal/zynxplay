'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft, Languages } from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useTranslation()
  const pathname = usePathname()
  
  const isHomePage = pathname === '/'

  const languages = [
    {
      code: 'pt',
      name: 'Português',
      flag: 'https://static.todamateria.com.br/upload/ba/nd/bandeira-do-brasil-og.jpg'
    },
    {
      code: 'en',
      name: 'English',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg'
    }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  // Posicionamento diferente para home vs outras páginas
  const positionClasses = isHomePage 
    ? "fixed left-0 top-1/2 transform -translate-y-1/2 z-50"
    : "fixed left-0 top-24 z-50"

  return (
    <div className={positionClasses}>
      <div className={`flex items-center smooth-transition ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Language Panel - só aparece quando aberto */}
        <div className="glass-card p-4 rounded-r-lg border-l-0">
          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'pt' | 'en')
                  setIsOpen(false)
                }}
                className={`flex items-center space-x-3 p-2 rounded-lg smooth-transition hover:bg-white/10 w-full ${
                  language === lang.code ? 'bg-blue-500/20 border border-blue-400' : ''
                }`}
              >
                <Image
                  src={lang.flag || "/placeholder.svg"}
                  alt={lang.name}
                  width={32}
                  height={24}
                  className="rounded-sm object-cover"
                />
                <span className="text-sm font-medium whitespace-nowrap">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Button - sempre visível */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`glass-card p-3 rounded-r-lg border-l-0 hover:bg-white/10 smooth-transition flex items-center absolute ${
          isOpen ? 'left-44' : 'left-0'
        } top-0 transition-all duration-300`}
        title="Selecionar idioma / Select language"
      >
        <div className="flex items-center space-x-2">
          {!isOpen && (
            <div className="flex items-center space-x-1">
              <Languages className="w-4 h-4" />
              <Image
                src={currentLanguage?.flag || ''}
                alt={currentLanguage?.name || ''}
                width={20}
                height={15}
                className="rounded-sm object-cover"
              />
            </div>
          )}
          {isOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
      </button>
    </div>
  )
}
