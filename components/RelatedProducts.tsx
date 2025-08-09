'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, Star, ShoppingCart } from 'lucide-react'
import { Product } from '@/types/product'
import { useApp } from '@/context/AppContext'
import { useTranslation } from '@/context/LanguageContext'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const { state, dispatch } = useApp()
  const { t, formatCurrency } = useTranslation()

  const toggleFavorite = (e: React.MouseEvent, productId: string) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: productId
    })
  }

  const addToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
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

  if (products.length === 0) return null

  return (
    <section className="mt-16">
      <div className="flex items-center space-x-2 mb-8">
        <div className="w-1 h-8 bg-blue-500 rounded"></div>
        <h2 className="text-2xl font-bold">{t('product.related')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isFavorite = state.favorites.includes(product.id)
          const minPrice = Math.min(...product.versions.map(v => v.price))
          const maxOriginalPrice = Math.max(...product.versions.map(v => v.originalPrice || v.price))
          const discount = maxOriginalPrice > minPrice 
            ? Math.round(((maxOriginalPrice - minPrice) / maxOriginalPrice) * 100)
            : null
          
          // Contagem simples de reviews
          const reviewCount = Array.isArray(product.reviews) ? product.reviews.length : 0

          return (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="glass-card p-4 hover-scale smooth-transition group">
                <div className="relative mb-4">
                  {discount && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs z-10">
                      -{discount}%
                    </span>
                  )}
                  
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 smooth-transition z-10">
                    <button
                      onClick={(e) => toggleFavorite(e, product.id)}
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
                    onClick={(e) => addToCart(e, product)}
                    className="w-full bg-black/80 text-white py-2 rounded-b-lg opacity-0 group-hover:opacity-100 smooth-transition absolute bottom-0 left-0"
                  >
                    {t('product.add.cart')}
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400 font-bold">{formatCurrency(minPrice)}</span>
                    {maxOriginalPrice > minPrice && (
                      <span className="text-gray-500 line-through text-sm">{formatCurrency(maxOriginalPrice)}</span>
                    )}
                  </div>

                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">({reviewCount})</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
