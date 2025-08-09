'use client'

import { useApp } from '@/context/AppContext'
import Header from '@/components/Header'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/context/LanguageContext'

export default function CartPage() {
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

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/products">
            <button className="p-2 hover:bg-white/10 rounded-lg smooth-transition">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </Link>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">{t('cart.title')}</h1>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full">
              {state.cart.length}
            </span>
          </div>
        </div>

        {state.cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass-card p-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('cart.empty')}</h3>
              <p className="text-gray-400 mb-4">{t('cart.empty.desc')}</p>
              <Link href="/products">
                <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg smooth-transition">
                  {t('products.browse')}
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.cart.map((item) => {
                if (!item || !item.product || !item.version) {
                  return null
                }

                return (
                  <div key={`${item.productId}-${item.versionId}`} className="glass-card p-6">
                    <div className="flex items-center space-x-6">
                      <Link href={`/product/${item.productId}`}>
                        <Image
                          src={item.product.images?.[0] || "/placeholder.svg"}
                          alt={item.product.name || 'Product'}
                          width={120}
                          height={120}
                          className="rounded-lg object-cover hover-scale smooth-transition"
                        />
                      </Link>
                      
                      <div className="flex-1">
                        <Link href={`/product/${item.productId}`}>
                          <h3 className="text-xl font-semibold hover:text-blue-400 smooth-transition">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-400 mb-2">{item.version.name}</p>
                        <p className="text-2xl font-bold text-green-400">
                          {formatCurrency(item.version.price || 0)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center glass-card rounded-lg">
                          <button
                            onClick={() => updateQuantity(
                              `${item.productId}-${item.versionId}`, 
                              item.quantity - 1
                            )}
                            className="p-2 hover:bg-white/10 rounded-l-lg smooth-transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 min-w-[60px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(
                              `${item.productId}-${item.versionId}`, 
                              item.quantity + 1
                            )}
                            className="p-2 hover:bg-white/10 rounded-r-lg smooth-transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(`${item.productId}-${item.versionId}`)}
                          className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg smooth-transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">{t('cart.subtotal')}</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')} ({state.cart.length} {t('cart.items')}):</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.tax')}:</span>
                    <span>{formatCurrency(total * 0.1)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>{t('cart.total')}:</span>
                      <span className="text-green-400">{formatCurrency(total * 1.1)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <button className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold smooth-transition hover-scale pulse-glow">
                    {t('cart.checkout')}
                  </button>
                </Link>

                <Link href="/products">
                  <button className="w-full glass-card py-3 rounded-lg mt-3 hover-scale smooth-transition">
                    {t('cart.continue')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
