'use client'

import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import CartModal from './CartModal'
import { useTranslation } from '@/context/LanguageContext'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const router = useRouter()
  const { state } = useApp()
  const { t } = useTranslation()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-center py-2 text-sm">
        Instant Delivery + 30% Discounted on all Items!
      </div>

      {/* Main Header */}
      <header className="glass-header sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold hover-scale">
              Zynx Play
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-blue-400 smooth-transition">
                {t('header.nav.home')}
              </Link>
              <Link href="/products" className="hover:text-blue-400 smooth-transition">
                {t('header.nav.products')}
              </Link>
              <Link href="/contact" className="hover:text-blue-400 smooth-transition">
                {t('header.nav.contact')}
              </Link>
              <Link href="/about" className="hover:text-blue-400 smooth-transition">
                {t('header.nav.about')}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <input
                type="text"
                placeholder={t('header.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass px-4 py-2 pl-10 rounded-lg bg-transparent border-none outline-none text-white placeholder-gray-400 w-80"
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400" />
              </button>
            </form>
            
            {/* Action Icons */}
            <Link href="/favorites" className="p-2 hover-scale relative">
              <Heart className="w-6 h-6" />
              {state.favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.favorites.length}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover-scale relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            <Link href="/dashboard" className="p-2 hover-scale">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="hover:text-blue-400 smooth-transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.home')}
              </Link>
              <Link 
                href="/products" 
                className="hover:text-blue-400 smooth-transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.products')}
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-blue-400 smooth-transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.contact')}
              </Link>
              <Link 
                href="/about" 
                className="hover:text-blue-400 smooth-transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.about')}
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mt-4">
                <input
                  type="text"
                  placeholder={t('header.search.mobile')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass w-full px-4 py-2 pl-10 rounded-lg bg-transparent border-none outline-none text-white placeholder-gray-400"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400" />
                </button>
              </form>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
