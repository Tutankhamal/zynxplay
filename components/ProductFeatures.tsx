import { Truck, Shield } from 'lucide-react'
import { useTranslation } from '@/context/LanguageContext'

export default function ProductFeatures() {
  const { t } = useTranslation()

  return (
    <div className="glass-card p-[0.86rem] space-y-4 mt-6">
      <div className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg">
        <Truck className="w-5 h-5 text-blue-400" />
        <div>
          <div className="font-semibold">{t('product.fast.delivery')}</div>
          <div className="text-sm text-gray-400">{t('product.fast.delivery.desc')}</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3 mt-2 p-3 border border-gray-700 rounded-lg">
        <Shield className="w-5 h-5 text-blue-400" />
        <div>
          <div className="font-semibold">{t('product.secure.payments')}</div>
          <div className="text-sm text-gray-400">{t('product.secure.payments.desc')}</div>
        </div>
      </div>
    </div>
  )
}
