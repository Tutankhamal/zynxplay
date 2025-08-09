'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'
import { Product } from '@/types/product'
import { Search, Filter, Grid, List } from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'

export default function ProductsPage() {
  const { t } = useTranslation()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  useEffect(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.baseDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return Math.min(...a.versions.map(v => v.price)) - Math.min(...b.versions.map(v => v.price))
        case 'price-high':
          return Math.min(...b.versions.map(v => v.price)) - Math.min(...a.versions.map(v => v.price))
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('products.title')}</h1>
          <p className="text-gray-400">{t('products.subtitle')}</p>
        </div>

        {/* Filters and Search */}
        <div className="glass p-6 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('products.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass rounded-lg bg-transparent border-none outline-none text-white placeholder-gray-400"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="glass-card px-4 py-2 rounded-lg bg-transparent border-none outline-none text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category === 'all' ? t('products.all.categories') : category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass-card px-4 py-2 rounded-lg bg-transparent border-none outline-none text-white"
              >
                <option value="name" className="bg-gray-800">{t('products.sort.name')}</option>
                <option value="price-low" className="bg-gray-800">{t('products.sort.price.low')}</option>
                <option value="price-high" className="bg-gray-800">{t('products.sort.price.high')}</option>
                <option value="rating" className="bg-gray-800">{t('products.sort.rating')}</option>
              </select>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500' : 'glass'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500' : 'glass'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            {t('products.showing')} {filteredProducts.length} {t('products.of')} {products.length} {t('products.products')}
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              viewMode={viewMode}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">{t('products.no.found')}</h3>
            <p className="text-gray-400">{t('products.no.found.desc')}</p>
          </div>
        )}
      </main>
    </div>
  )
}
