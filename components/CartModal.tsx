'use client'

import { useState } from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { useTranslation } from '@/context/LanguageContext'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, dispatch } = useApp()
  const { t, formatCurrency } = useTranslation()
  
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId })
    } else {
      dispatch({ 
        type: 'UPDATE_CART_QUANTITY', 
        payload: { id: itemId, quantity } 
      })
    }
  }

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId })
  }

  const total = state.cart.reduce((sum, item) => {
    if (item && item.version && typeof item.version.price === 'number' && typeof item.quantity === 'number') {
      return sum + (item.version.price * item.quantity)
    }
    return sum
  }, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 modal-overlay">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="glass w-full max-w-2xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">{t('cart.title')}</h2>
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                {state.cart.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg smooth-transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="overflow-y-auto max-h-96 p-6">
            {state.cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('cart.empty')}</h3>
                <p className="text-gray-400 mb-4">{t('cart.empty.desc')}</p>
                <Link href="/products">
                  <button 
                    onClick={onClose}
                    className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg smooth-transition"
                  >
                    {t('products.browse')}
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {state.cart.map((item) => {
                  if (!item || !item.product || !item.version) {
                    return null
                  }

                  return (
                    <div key={`${item.productId}-${item.versionId}`} className="glass-card p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.product.images?.[0] || "/placeholder.svg"}
                          alt={item.product.name || 'Product'}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.product.name}</h4>
                          <p className="text-sm text-gray-400">{item.version.name}</p>
                          <p className="text-lg font-bold text-green-400">
                            {formatCurrency(item.version.price || 0)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(
                              `${item.productId}-${item.versionId}`, 
                              item.quantity - 1
                            )}
                            className="p-1 hover:bg-white/10 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(
                              `${item.productId}-${item.versionId}`, 
                              item.quantity + 1
                            )}
                            className="p-1 hover:bg-white/10 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(`${item.productId}-${item.versionId}`)}
                          className="p-2 hover:bg-red-500/20 text-red-400 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.cart.length > 0 && (
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">{t('cart.total')}</span>
                <span className="text-2xl font-bold text-green-400">
                  {formatCurrency(total)}
                </span>
              </div>
              
              <div className="flex space-x-4">
                <Link href="/cart" className="flex-1">
                  <button 
                    onClick={onClose}
                    className="w-full glass-card py-3 rounded-lg hover-scale smooth-transition"
                  >
                    {t('common.view')} {t('cart.title')}
                  </button>
                </Link>
                <Link href="/checkout" className="flex-1">
                  <button 
                    onClick={onClose}
                    className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg hover-scale smooth-transition pulse-glow"
                  >
                    {t('cart.checkout')}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
