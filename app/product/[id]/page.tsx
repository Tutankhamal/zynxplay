'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import ProductGallery from '@/components/ProductGallery'
import ProductInfo from '@/components/ProductInfo'
import ProductDetails from '@/components/ProductDetails'
import RelatedProducts from '@/components/RelatedProducts'
import ProductFeatures from '@/components/ProductFeatures'
import { products } from '@/data/products'
import { Product } from '@/types/product'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const productId = params.id as string
      console.log('Looking for product ID:', productId)
      
      const foundProduct = products.find(p => p.id === productId)
      console.log('Found product:', foundProduct)
      
      if (foundProduct) {
        setProduct(foundProduct)
        
        // Get related products
        const related = products.filter(p => 
          foundProduct.relatedProducts && foundProduct.relatedProducts.includes(p.id)
        ).slice(0, 4)
        
        setRelatedProducts(related)
      } else {
        console.log('Product not found')
      }
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-white">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="glass-card p-12">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
            <a href="/products" className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg smooth-transition inline-block">
              Browse Products
            </a>
          </div>
        </main>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          <div>
            <ProductGallery 
              images={product.images || []} 
              productName={product.name || 'Product'}
            />
            <ProductFeatures />
          </div>
          <ProductInfo product={product} />
        </div>

        {/* Product Details with Tabs */}
        <ProductDetails product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </main>
    </div>
  )
}
