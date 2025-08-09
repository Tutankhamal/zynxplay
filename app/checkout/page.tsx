'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useApp } from '@/context/AppContext'
import { CreditCard, ShoppingCartIcon as PaypalIcon, Lock, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/context/LanguageContext'

export default function CheckoutPage() {
  const { state, dispatch } = useApp()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US'
  })

  const { t, formatCurrency } = useTranslation()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null)
  const [couponMessage, setCouponMessage] = useState('')

  const validCoupons = {
    'WELCOME10': 10,
    'SAVE20': 20,
    'NEWUSER15': 15,
    'GAMER25': 25
  }

  const applyCoupon = () => {
    const discount = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons]
    if (discount) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount })
      setCouponMessage(t('checkout.coupon.applied'))
      setCouponCode('')
    } else {
      setCouponMessage(t('checkout.coupon.invalid'))
      setAppliedCoupon(null)
    }
  }

  const total = state.cart.reduce((sum, item) => sum + (item.version.price * item.quantity), 0)
  const tax = total * 0.1 // 10% tax
  const discount = appliedCoupon ? (total * appliedCoupon.discount / 100) : 0
  const finalTotal = total + tax - discount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Aqui você integraria com Stripe ou PayPal
      if (paymentMethod === 'stripe') {
        await processStripePayment()
      } else {
        await processPayPalPayment()
      }
    } catch (error) {
      console.error('Payment failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const processStripePayment = async () => {
    // Simulação - em produção você usaria o Stripe SDK
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Limpar carrinho e redirecionar
    state.cart.forEach(item => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: `${item.productId}-${item.versionId}` })
    })
    
    router.push('/checkout/success')
  }

  const processPayPalPayment = async () => {
    // Simulação - em produção você usaria o PayPal SDK
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Limpar carrinho e redirecionar
    state.cart.forEach(item => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: `${item.productId}-${item.versionId}` })
    })
    
    router.push('/checkout/success')
  }

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="glass-card p-12">
            <h1 className="text-3xl font-bold mb-4">{t('cart.empty')}</h1>
            <p className="text-gray-400 mb-8">{t('cart.empty.desc')}</p>
            <Link href="/products">
              <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg smooth-transition">
                {t('products.browse')}
              </button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8 relative">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/cart">
            <button className="p-2 hover:bg-white/10 rounded-lg smooth-transition">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold">{t('checkout.title')}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">{t('checkout.contact')}</h2>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder={t('checkout.email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full glass p-3 rounded-lg bg-transparent border-none outline-none text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">{t('checkout.billing')}</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder={t('checkout.first.name')}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="glass p-3 rounded-lg bg-transparent border-none outline-none text-white placeholder-gray-400"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder={t('checkout.last.name')}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="glass p-3 rounded-lg bg-transparent border-none outline-none text-white placeholder-gray-400"
                  required
                />
              </div>
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder={t('checkout.address')}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full glass p-3 rounded-lg bg-transparent border-none outline-none text-white placeholder-gray-400"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder={t('checkout.city')}
                    value={formData.city}
                    onChange={handleInputChange}
                    className="glass p-3 rounded-lg bg-transparent border-none outline-none text-white placeholder-gray-400"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder={t('checkout.zip')}
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="glass p-3 rounded-lg bg-transparent border-none outline-none text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">{t('checkout.payment')}</h2>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`w-full p-4 rounded-lg border smooth-transition flex items-center space-x-3 ${
                    paymentMethod === 'stripe'
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span>{t('checkout.credit.card')}</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`w-full p-4 rounded-lg border smooth-transition flex items-center space-x-3 ${
                    paymentMethod === 'paypal'
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    PP
                  </div>
                  <span>{t('checkout.paypal')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">{t('checkout.order.summary')}</h2>
              <div className="space-y-4">
                {state.cart.map((item) => (
                  <div key={`${item.productId}-${item.versionId}`} className="flex items-center space-x-4">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.product.name}</h4>
                      <p className="text-xs text-gray-400">{item.version.name}</p>
                      <p className="text-sm">{t('checkout.qty')}: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item.version.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 mt-6 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>{t('checkout.subtotal')}:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('checkout.tax')}:</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-400">
                    <span>{t('checkout.discount')} ({appliedCoupon.code}):</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold">
                  <span>{t('checkout.total')}:</span>
                  <span className="text-green-400">{formatCurrency(finalTotal)}</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder={t('checkout.coupon')}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 glass p-3 rounded-lg bg-transparent border-none outline-none text-white placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg smooth-transition"
                >
                  {t('checkout.apply.coupon')}
                </button>
              </div>
              {couponMessage && (
                <p className={`text-sm mt-2 ${appliedCoupon ? 'text-green-400' : 'text-red-400'}`}>
                  {couponMessage}
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 px-6 py-4 rounded-lg font-semibold smooth-transition flex items-center justify-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>
                  {isProcessing ? t('checkout.processing') : `${t('checkout.pay')} ${formatCurrency(finalTotal)}`}
                </span>
              </button>
            </form>

            <div className="text-center text-sm text-gray-400">
              <p>🔒 {t('checkout.secure')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
