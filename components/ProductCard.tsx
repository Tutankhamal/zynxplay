'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, Star, ShoppingCart } from 'lucide-react'
import { Product } from '@/types/product'
import { useApp } from '@/context/AppContext'
import { useTranslation } from '@/context/LanguageContext'

interface ProductCardProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { state, dispatch } = useApp()
  const { t, formatCurrency } = useTranslation()
  const isFavorite = state.favorites.includes(product.id)
  const minPrice = Math.min(...product.versions.map(v => v.price))
  const maxOriginalPrice = Math.max(...product.versions.map(v => v.originalPrice || v.price))
  
  // Contagem segura de reviews
  const reviewCount = Array.isArray(product.reviews) ? product.reviews.length : 0

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: product.id
    })
  }

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (product.versions && product.versions.length > 0) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          productId: product.id,
          versionId: product.versions[0].id,
          quantity: 1,
          product,
          version: product.versions[0]
        }
      })
    }
  }

  if (viewMode === 'list') {
    return (
      <Link href={`/product/${product.id}`}>
        <div className="glass-card p-6 hover-scale smooth-transition group flex items-center space-x-6">
          <div className="relative">
            <Image
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.name}
              width={120}
              height={120}
              className="rounded-lg object-cover"
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-400 text-sm">{product.baseDescription}</p>
            
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-400">({reviewCount})</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-green-400">{t('common.from')} {formatCurrency(minPrice)}</span>
              {maxOriginalPrice > minPrice && (
                <span className="text-gray-500 line-through">{formatCurrency(maxOriginalPrice)}</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded hover-scale ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
            >
              <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={addToCart}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg smooth-transition"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="glass-card p-4 hover-scale smooth-transition group">
        <div className="relative mb-4">
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 smooth-transition z-10">
            <button
              onClick={toggleFavorite}
              className={`p-1 bg-black/50 rounded hover:bg-black/70 ${
                isFavorite ? 'text-red-500' : 'text-white'
              }`}
            >
              <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button className="p-1 bg-black/50 rounded hover:bg-black/70 text-white">
              <Eye className="w-4 h-4" />
            </button>
          </div>

          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            width={250}
            height={200}
            className="w-full h-full object-cover rounded-lg"
          />

          <button
            onClick={addToCart}
            className="w-full bg-black/80 text-white py-2 rounded-b-lg opacity-0 group-hover:opacity-100 smooth-transition absolute bottom-0 left-0"
          >
            {t('product.add.cart')}
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-sm">{product.name}</h3>
          
          <div className="flex items-center space-x-2">
            <span className="text-blue-400 font-bold">{t('common.from')} {formatCurrency(minPrice)}</span>
            {maxOriginalPrice > minPrice && (
              <span className="text-gray-500 line-through text-sm">{formatCurrency(maxOriginalPrice)}</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">{reviewCount} {t('common.reviews')}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
