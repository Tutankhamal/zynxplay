export interface ProductVersion {
  id: string
  name: string
  price: number
  originalPrice?: number
  stock: number
  description: string
  features: string[]
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface ProductDetails {
  description: string
  howToUse: string[]
  specifications: { [key: string]: string }
  systemRequirements?: { [key: string]: string }
}

export interface Product {
  id: string
  name: string
  baseDescription: string
  details: ProductDetails
  rating: number
  reviews: Review[]
  images: string[]
  category: string
  versions: ProductVersion[]
  relatedProducts: string[]
}

export interface CartItem {
  productId: string
  versionId: string
  quantity: number
  product: Product
  version: ProductVersion
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  orders: Order[]
  favorites: string[]
}

export interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  total: number
  items: CartItem[]
}
