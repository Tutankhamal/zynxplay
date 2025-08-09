'use client'

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { Product, CartItem, User } from '@/types/product'
import { products } from '@/data/products'

interface AppState {
  cart: CartItem[]
  favorites: string[]
  user: User | null
  products: Product[]
}

type AppAction = 
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_PRODUCTS'; payload: Product[] }

const initialState: AppState = {
  cart: [],
  favorites: [],
  user: null,
  products: []
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(
        item => item.productId === action.payload.productId && 
                item.versionId === action.payload.versionId
      )
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.productId === action.payload.productId && 
            item.versionId === action.payload.versionId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => 
          `${item.productId}-${item.versionId}` !== action.payload
        )
      }

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          `${item.productId}-${item.versionId}` === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }

    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload)
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload]
      }

    case 'SET_USER':
      return { ...state, user: action.payload }

    case 'SET_PRODUCTS':
      return { ...state, products: action.payload }

    default:
      return state
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Initialize products on mount
  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: products })
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
