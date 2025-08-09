'use client'

import { useState } from 'react'
import { Heart, Star, Minus, Plus, Truck, Shield, Check } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useTranslation } from '@/context/LanguageContext'
import { Product } from '@/types/product'

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { state, dispatch } = useApp()
  const { t, formatCurrency } = useTranslation()
  const [quantity, setQuantity] = useState(1)
  const [selectedVersionIndex, setSelectedVersionIndex] = useState(0)
  
  // Verificações de segurança
  if (!product || !product.versions || product.versions.length === 0) {
    return (
      <div className="glass-card p-6">
        <p className="text-gray-400">Product information not available</p>
      </div>
    )
  }
  
  const selectedVersion = product.versions[selectedVersionIndex]
  const isFavorite = state.favorites.includes(product.id)
  const reviewCount = Array.isArray(product.reviews) ? product.reviews.length : 0

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(selectedVersion.stock, quantity + change)))
  }

  const handleVersionChange = (index: number) => {
    setSelectedVersionIndex(index)
    setQuantity(1) // Reset quantity when version changes
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        versionId: selectedVersion.id,
        quantity,
        product,
        version: selectedVersion
      }
    })
  }

  const toggleFavorite = () => {
    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: product.id
    })
  }

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold">
            {product.name} - {selectedVersion.name}
          </h1>
          <button
            onClick={toggleFavorite}
            className={`p-2 hover-scale smooth-transition ${
              isFavorite ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <Heart className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Rating and Stock */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                }`}
              />
            ))}
            <span className="text-sm text-gray-400">({reviewCount} {t('product.reviews')})</span>
          </div>
          <span className={`text-sm ${selectedVersion.stock > 10 ? 'text-green-400' : 'text-orange-400'}`}>
            {selectedVersion.stock} {t('product.in.stock')}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3">
          <div className="text-3xl font-bold text-green-400">
            {formatCurrency(selectedVersion.price)}
          </div>
          {selectedVersion.originalPrice && (
            <div className="text-xl text-gray-500 line-through">
              {formatCurrency(selectedVersion.originalPrice)}
            </div>
          )}
          {selectedVersion.originalPrice && (
            <div className="bg-red-500 text-white px-2 py-1 rounded text-sm">
              {Math.round(((selectedVersion.originalPrice - selectedVersion.price) / selectedVersion.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed">
          {selectedVersion.description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2">
          {selectedVersion.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <Check className="w-4 h-4 text-green-400" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Quantity and Buy Button */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center glass-card rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-[0.8rem] hover:bg-blue-500/20 rounded-l-lg smooth-transition"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-[0.8rem] hover:bg-blue-500/20 rounded-r-lg smooth-transition"
              disabled={quantity >= selectedVersion.stock}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold smooth-transition hover-scale pulse-glow"
          >
            {t('product.buy.now')} - {formatCurrency(selectedVersion.price * quantity)}
          </button>
        </div>
      </div>

      {/* Version Selection */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold">{t('product.version')}</h3>
        <div className="space-y-2">
          {product.versions.map((version, index) => (
            <button
              key={version.id}
              onClick={() => handleVersionChange(index)}
              className={`w-full p-[0.7rem] rounded-lg text-left smooth-transition hover-scale ${
                selectedVersionIndex === index
                  ? 'glass-card ![background:rgb(0_97_255_/_41%)] hover:![background:rgb(0_97_255_/_55%)]'
                  : 'glass-card hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{version.name}</div>
                  <div className="text-sm text-gray-400">{version.stock} {t('product.available')}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">
                    {formatCurrency(version.price)}
                  </div>
                  {version.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatCurrency(version.originalPrice)}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
