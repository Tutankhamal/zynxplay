'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import { ArrowRight, Star, Zap, Shield } from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-black/25 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-1200"></div>
        
        {/* Plus symbols */}
        <div className="absolute top-32 right-1/4 text-blue-400 text-xl animate-pulse delay-800">+</div>
        <div className="absolute bottom-32 left-1/3 text-white text-lg animate-pulse delay-400">+</div>
        <div className="absolute top-2/3 right-16 text-blue-300 text-xl animate-pulse delay-1100">+</div>
      </div>

      <Header />
      
      <main className="relative z-10">
        {/* Central radial glow effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/20 via-blue-400/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
  
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('home.hero.title')}{' '}
              <span className="neon-text">{t('home.hero.title.gaming')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <button className="glass px-8 py-4 rounded-lg hover-scale smooth-transition flex items-center space-x-2 neon-glow">
                  <span className="text-lg font-semibold">{t('home.hero.start')}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              
              <Link href="/about">
                <button className="glass-card px-8 py-4 rounded-lg hover-scale smooth-transition text-lg font-semibold">
                  {t('home.hero.learn')}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('home.features.title')}{' '}
              <span className="neon-text">Zynx Play</span>
            </h2>
            <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 hover-scale smooth-transition">
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('home.features.fast.title')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('home.features.fast.desc')}
                </p>
              </div>

              <div className="glass-card p-8 hover-scale smooth-transition">
                <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('home.features.secure.title')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('home.features.secure.desc')}
                </p>
              </div>

              <div className="glass-card p-8 hover-scale smooth-transition">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('home.features.quality.title')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('home.features.quality.desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              {t('home.cta.subtitle')}
            </p>
            <Link href="/products">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-12 py-4 rounded-lg text-xl font-bold hover-scale smooth-transition pulse-glow">
                {t('home.cta.button')}
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
