'use client'

import { useTranslation } from '@/context/LanguageContext'
import { RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'

export default function CurrencyStatus() {
  const { currencyLoading, currencyError, language } = useTranslation()

  // Só mostrar para português (quando há conversão)
  if (language !== 'pt') return null

  return (
    <div className="flex items-center space-x-1 text-xs">
      {currencyLoading ? (
        <>
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span className="text-gray-400">Atualizando câmbio...</span>
        </>
      ) : currencyError ? (
        <>
          <AlertCircle className="w-3 h-3 text-yellow-400" />
          <span className="text-yellow-400">Câmbio offline</span>
        </>
      ) : (
        <>
          <CheckCircle className="w-3 h-3 text-green-400" />
          <span className="text-green-400">Câmbio atualizado</span>
        </>
      )}
    </div>
  )
}
