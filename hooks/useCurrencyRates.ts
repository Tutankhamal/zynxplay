'use client'

import { useState, useEffect } from 'react'

interface ExchangeRates {
  USD: number
  BRL: number
  [key: string]: number
}

interface CurrencyData {
  rates: ExchangeRates
  lastUpdated: string
}

const CACHE_KEY = 'currency_rates'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hora em milliseconds

export function useCurrencyRates() {
  const [rates, setRates] = useState<ExchangeRates>({ USD: 1, BRL: 5.20 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Verificar cache primeiro
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const cachedData: CurrencyData = JSON.parse(cached)
          const now = new Date().getTime()
          const cacheTime = new Date(cachedData.lastUpdated).getTime()
          
          // Se o cache ainda é válido (menos de 1 hora)
          if (now - cacheTime < CACHE_DURATION) {
            setRates(cachedData.rates)
            setLoading(false)
            return
          }
        }

        // Buscar novas taxas da API
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates')
        }

        const data = await response.json()
        
        const newRates: ExchangeRates = {
          USD: 1,
          BRL: data.rates.BRL || 5.20 // Fallback para 5.20 se não conseguir buscar
        }

        // Salvar no cache
        const cacheData: CurrencyData = {
          rates: newRates,
          lastUpdated: new Date().toISOString()
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))

        setRates(newRates)
        setError(null)
      } catch (err) {
        console.error('Error fetching currency rates:', err)
        setError('Failed to fetch current exchange rates')
        // Usar taxa padrão em caso de erro
        setRates({ USD: 1, BRL: 5.20 })
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [])

  return { rates, loading, error }
}
