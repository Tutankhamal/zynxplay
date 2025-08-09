'use client'

import { useApp } from '@/context/AppContext'
import { products } from '@/data/products'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { Heart } from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'

export default function FavoritesPage() {
  const { state } = useApp()
  const { t } = useTranslation()
  
  const favoriteProducts = products.filter(product => 
    state.favorites.includes(product.id)
  )

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="relative max-w-7xl mx-auto px-6 py-8 p">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold">{t('favorites.title')}</h1>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full">
              {state.favorites.length}
            </span>
          </div>
          <p className="text-gray-400">{t('favorites.desc')}</p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('favorites.empty')}</h3>
            <p className="text-gray-400 mb-4">{t('favorites.empty.desc')}</p>
            <a href="/products" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg smooth-transition inline-block">
              {t('products.browse')}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
