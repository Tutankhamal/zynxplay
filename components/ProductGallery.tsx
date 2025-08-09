'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex space-x-4">
      {/* Thumbnails */}
      <div className="flex flex-col space-y-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`glass p-2 hover-scale smooth-transition ${
              selectedImage === index ? 'neon-glow' : ''
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} ${index + 1}`}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative">
        <div className="radial-glow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="glass p-4 relative z-10">
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt={productName}
            width={500}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  )
}
