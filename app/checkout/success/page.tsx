'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import { CheckCircle, Download, Mail } from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'

export default function CheckoutSuccessPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="glass-card p-12">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold mb-4">{t('checkout.success.title')}</h1>
          <p className="text-xl text-gray-400 mb-8">
            {t('checkout.success.subtitle')}
          </p>

          <div className="glass p-6 mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Mail className="w-6 h-6 text-blue-400" />
              <span>{t('checkout.success.email.sent')}</span>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Download className="w-6 h-6 text-green-400" />
              <span>{t('checkout.success.download.ready')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg smooth-transition">
                {t('checkout.success.view.orders')}
              </button>
            </Link>
            <Link href="/products">
              <button className="glass-card px-8 py-3 rounded-lg hover-scale smooth-transition">
                {t('checkout.success.continue.shopping')}
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
