'use client'

import { useState } from 'react'
import { Star, Shield, CheckCircle } from 'lucide-react'
import { Product, Review } from '@/types/product'
import Image from 'next/image'
import { useTranslation } from '@/context/LanguageContext'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'howto'>('description')
  const { t } = useTranslation()

  const reviewsCount = Array.isArray(product.reviews) ? product.reviews.length : 0

  const tabs = [
    { id: 'description', label: t('product.description'), count: null },
    { id: 'reviews', label: t('product.reviews'), count: reviewsCount },
    { id: 'howto', label: t('product.how.to.use'), count: null }
  ]

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ))
  }

  return (
    <div className="glass-card p-6 mt-8">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-black/20 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 px-4 rounded-lg smooth-transition flex items-center justify-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'description' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('product.description')}</h3>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {product.details?.description || t('product.no.description')}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">{t('product.specifications')}</h4>
                <div className="space-y-2">
                  {product.details?.specifications && Object.entries(product.details.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">{key}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {product.details?.systemRequirements && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">{t('product.system.requirements')}</h4>
                  <div className="space-y-2">
                    {Object.entries(product.details.systemRequirements).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-700">
                        <span className="text-gray-400">{key}:</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{t('product.customer.reviews')}</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(product.rating || 0)}
                </div>
                <span className="text-lg font-semibold">{product.rating || 0}</span>
                <span className="text-gray-400">({reviewsCount} {t('product.reviews')})</span>
              </div>
            </div>

            {reviewsCount === 0 ? (
              <div className="text-center py-12">
                <Star className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                <h4 className="text-lg font-semibold mb-2">{t('product.no.reviews')}</h4>
                <p className="text-gray-400">{t('product.be.first')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Array.isArray(product.reviews) && product.reviews.map((review) => (
                  <div key={review.id} className="glass-card p-4">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={review.userAvatar || '/placeholder.svg?height=75&width=75&text=U'}
                        alt={review.userName || 'User'}
                        width={75}
                        height={75}
                        className="rounded-full object-cover flex-shrink-0 w-[75px] h-[75px]"
                        style={{ width: '75px', height: '75px' }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold">{review.userName}</span>
                          {review.verified && (
                            <div className="flex items-center space-x-1 text-green-400">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs">{t('product.verified.purchase')}</span>
                            </div>
                          )}
                          <span className="text-gray-400 text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {renderStars(review.rating || 0)}
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'howto' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{t('product.how.to.use')}</h3>
            <div className="space-y-4">
              {Array.isArray(product.details?.howToUse) && product.details.howToUse.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-4 mt-6">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">{t('product.important.note')}</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t('product.note.desc')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
