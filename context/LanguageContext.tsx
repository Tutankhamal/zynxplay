'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useCurrencyRates } from '@/hooks/useCurrencyRates'

type Language = 'pt' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  formatCurrency: (amount: number) => string
  currencyLoading: boolean
  currencyError: string | null
}

const translations = {
  pt: {
    // Header
    'header.search.placeholder': 'O que você está procurando?',
    'header.nav.home': 'Início',
    'header.nav.products': 'Produtos',
    'header.nav.contact': 'Contato',
    'header.nav.about': 'Sobre',
    'header.search.mobile': 'Buscar produtos...',
    
    // Home Page
    'home.hero.title': 'Bem-vindo ao Futuro dos',
    'home.hero.title.gaming': 'Games',
    'home.hero.subtitle': 'Descubra mods premium para jogos, hardware e produtos digitais. Transforme sua experiência de jogo com tecnologia de ponta e soluções inovadoras projetadas para o gamer moderno.',
    'home.hero.start': 'Começar a Jornada',
    'home.hero.learn': 'Saiba Mais',
    'home.features.title': 'Por que Escolher',
    'home.features.subtitle': 'Experimente jogos como nunca antes com nossos produtos e serviços premium',
    'home.features.fast.title': 'Super Rápido',
    'home.features.fast.desc': 'Entrega instantânea e performance ultra-rápida. Receba seus produtos digitais imediatamente após a compra com nosso sistema avançado de entrega.',
    'home.features.secure.title': 'Seguro e Protegido',
    'home.features.secure.desc': 'Medidas de segurança avançadas e transações criptografadas garantem que seus dados e compras estejam sempre protegidos com segurança de nível militar.',
    'home.features.quality.title': 'Qualidade Premium',
    'home.features.quality.desc': 'Apenas produtos da mais alta qualidade chegam à nossa loja. Cada item é cuidadosamente selecionado e testado para atender nossos rigorosos padrões de qualidade.',
    'home.cta.title': 'Pronto para Evoluir?',
    'home.cta.subtitle': 'Junte-se a milhares de gamers que já transformaram sua experiência de jogo',
    'home.cta.button': 'Explorar Produtos',
    
    // Products
    'products.title': 'Todos os Produtos',
    'products.subtitle': 'Descubra nossa coleção completa de produtos para jogos',
    'products.search': 'Buscar produtos...',
    'products.all.categories': 'Todas as Categorias',
    'products.sort.name': 'Nome A-Z',
    'products.sort.price.low': 'Preço: Menor para Maior',
    'products.sort.price.high': 'Preço: Maior para Menor',
    'products.sort.rating': 'Melhor Avaliado',
    'products.showing': 'Mostrando',
    'products.of': 'de',
    'products.products': 'produtos',
    'products.no.found': 'Nenhum produto encontrado',
    'products.no.found.desc': 'Tente ajustar sua busca ou critérios de filtro',
    'products.browse': 'Navegar Produtos',
    
    // Product Details
    'product.add.cart': 'Adicionar ao Carrinho',
    'product.buy.now': 'Comprar Agora',
    'product.reviews': 'Avaliações',
    'product.in.stock': 'Em Estoque',
    'product.version': 'Versão',
    'product.available': 'disponível',
    'product.description': 'Descrição do Produto',
    'product.specifications': 'Especificações',
    'product.system.requirements': 'Requisitos do Sistema',
    'product.how.to.use': 'Como Usar',
    'product.customer.reviews': 'Avaliações dos Clientes',
    'product.no.reviews': 'Ainda sem avaliações',
    'product.be.first': 'Seja o primeiro a avaliar este produto!',
    'product.verified.purchase': 'Compra Verificada',
    'product.important.note': 'Nota Importante',
    'product.note.desc': 'Sempre siga as instruções de instalação cuidadosamente. Para mods de jogos, use por sua conta e risco e esteja ciente dos termos de serviço dos respectivos jogos.',
    'product.related': 'Itens Relacionados',
    'product.fast.delivery': 'Entrega Rápida',
    'product.fast.delivery.desc': 'Receba seu produto instantaneamente após a compra.',
    'product.secure.payments': 'Pagamentos Seguros',
    'product.secure.payments.desc': 'Checkout seguro e criptografado sempre.',
    
    // Cart
    'cart.title': 'Carrinho de Compras',
    'cart.empty': 'Seu carrinho está vazio',
    'cart.empty.desc': 'Adicione alguns produtos para começar',
    'cart.subtotal': 'Subtotal',
    'cart.items': 'itens',
    'cart.tax': 'Taxa',
    'cart.total': 'Total',
    'cart.checkout': 'Finalizar Compra',
    'cart.continue': 'Continuar Comprando',
    'cart.empty.cart': 'Seu carrinho está vazio',
    'cart.empty.cart.desc': 'Adicione alguns produtos para prosseguir com o checkout',
    
    // Checkout
    'checkout.title': 'Finalizar Compra',
    'checkout.contact': 'Informações de Contato',
    'checkout.email': 'Endereço de email',
    'checkout.billing': 'Endereço de Cobrança',
    'checkout.first.name': 'Nome',
    'checkout.last.name': 'Sobrenome',
    'checkout.address': 'Endereço',
    'checkout.city': 'Cidade',
    'checkout.zip': 'CEP',
    'checkout.payment': 'Método de Pagamento',
    'checkout.credit.card': 'Cartão de Crédito (Stripe)',
    'checkout.paypal': 'PayPal',
    'checkout.order.summary': 'Resumo do Pedido',
    'checkout.qty': 'Qtd',
    'checkout.processing': 'Processando...',
    'checkout.pay': 'Pagar',
    'checkout.secure': 'Suas informações de pagamento são seguras e criptografadas',
    'checkout.coupon': 'Código do Cupom',
    'checkout.apply.coupon': 'Aplicar Cupom',
    'checkout.coupon.applied': 'Cupom aplicado!',
    'checkout.coupon.invalid': 'Cupom inválido',
    'checkout.discount': 'Desconto',
    'checkout.subtotal': 'Subtotal',
    'checkout.tax': 'Taxa',
    'checkout.total': 'Total',
    
    // Checkout Success
    'checkout.success.title': 'Pagamento Realizado com Sucesso!',
    'checkout.success.subtitle': 'Obrigado pela sua compra. Seu pedido foi processado com sucesso.',
    'checkout.success.email.sent': 'Email de confirmação enviado para sua caixa de entrada',
    'checkout.success.download.ready': 'Produtos digitais prontos para download',
    'checkout.success.view.orders': 'Ver Pedidos',
    'checkout.success.continue.shopping': 'Continuar Comprando',
    
    // Favorites
    'favorites.title': 'Seus Favoritos',
    'favorites.desc': 'Produtos que você marcou como favoritos',
    'favorites.empty': 'Ainda sem favoritos',
    'favorites.empty.desc': 'Comece adicionando produtos aos seus favoritos',
    
    // Common
    'common.from': 'A partir de',
    'common.reviews': 'avaliações',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.close': 'Fechar',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.save': 'Salvar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.view': 'Ver',
    'common.back': 'Voltar',
    'common.next': 'Próximo',
    'common.previous': 'Anterior',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    'common.clear': 'Limpar',
    'common.apply': 'Aplicar',
    'common.reset': 'Resetar'
  },
  en: {
    // Header
    'header.search.placeholder': 'What are you looking for?',
    'header.nav.home': 'Home',
    'header.nav.products': 'Products',
    'header.nav.contact': 'Contact',
    'header.nav.about': 'About',
    'header.search.mobile': 'Search products...',
    
    // Home Page
    'home.hero.title': 'Welcome to the Future of',
    'home.hero.title.gaming': 'Gaming',
    'home.hero.subtitle': 'Discover premium gaming mods, hardware, and digital products. Transform your gaming experience with cutting-edge technology and innovative solutions designed for the modern gamer.',
    'home.hero.start': 'Start The Journey',
    'home.hero.learn': 'Learn More',
    'home.features.title': 'Why Choose',
    'home.features.subtitle': 'Experience gaming like never before with our premium products and services',
    'home.features.fast.title': 'Lightning Fast',
    'home.features.fast.desc': 'Instant delivery and lightning-fast performance. Get your digital products immediately after purchase with our advanced delivery system.',
    'home.features.secure.title': 'Secure & Safe',
    'home.features.secure.desc': 'Advanced security measures and encrypted transactions ensure your data and purchases are always protected with military-grade security.',
    'home.features.quality.title': 'Premium Quality',
    'home.features.quality.desc': 'Only the highest quality products make it to our store. Every item is carefully curated and tested to meet our strict quality standards.',
    'home.cta.title': 'Ready to Level Up?',
    'home.cta.subtitle': 'Join thousands of gamers who have already transformed their gaming experience',
    'home.cta.button': 'Explore Products',
    
    // Products
    'products.title': 'All Products',
    'products.subtitle': 'Discover our complete collection of gaming products',
    'products.search': 'Search products...',
    'products.all.categories': 'All Categories',
    'products.sort.name': 'Name A-Z',
    'products.sort.price.low': 'Price: Low to High',
    'products.sort.price.high': 'Price: High to Low',
    'products.sort.rating': 'Highest Rated',
    'products.showing': 'Showing',
    'products.of': 'of',
    'products.products': 'products',
    'products.no.found': 'No products found',
    'products.no.found.desc': 'Try adjusting your search or filter criteria',
    'products.browse': 'Browse Products',
    
    // Product Details
    'product.add.cart': 'Add To Cart',
    'product.buy.now': 'Buy Now',
    'product.reviews': 'Reviews',
    'product.in.stock': 'In Stock',
    'product.version': 'Version',
    'product.available': 'available',
    'product.description': 'Product Description',
    'product.specifications': 'Specifications',
    'product.system.requirements': 'System Requirements',
    'product.how.to.use': 'How to Use',
    'product.customer.reviews': 'Customer Reviews',
    'product.no.reviews': 'No reviews yet',
    'product.be.first': 'Be the first to review this product!',
    'product.verified.purchase': 'Verified Purchase',
    'product.important.note': 'Important Note',
    'product.note.desc': 'Always follow the installation instructions carefully. For gaming mods, use at your own risk and be aware of the terms of service of the respective games.',
    'product.related': 'Related Items',
    'product.fast.delivery': 'Fast Delivery',
    'product.fast.delivery.desc': 'Get your product instantly after purchase.',
    'product.secure.payments': 'Secure Payments',
    'product.secure.payments.desc': 'Safe and encrypted checkout every time.',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.empty.desc': 'Add some products to get started',
    'cart.subtotal': 'Subtotal',
    'cart.items': 'items',
    'cart.tax': 'Tax',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.continue': 'Continue Shopping',
    'cart.empty.cart': 'Your cart is empty',
    'cart.empty.cart.desc': 'Add some products to proceed with checkout',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.contact': 'Contact Information',
    'checkout.email': 'Email address',
    'checkout.billing': 'Billing Address',
    'checkout.first.name': 'First name',
    'checkout.last.name': 'Last name',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.zip': 'ZIP code',
    'checkout.payment': 'Payment Method',
    'checkout.credit.card': 'Credit Card (Stripe)',
    'checkout.paypal': 'PayPal',
    'checkout.order.summary': 'Order Summary',
    'checkout.qty': 'Qty',
    'checkout.processing': 'Processing...',
    'checkout.pay': 'Pay',
    'checkout.secure': 'Your payment information is secure and encrypted',
    'checkout.coupon': 'Coupon Code',
    'checkout.apply.coupon': 'Apply Coupon',
    'checkout.coupon.applied': 'Coupon applied!',
    'checkout.coupon.invalid': 'Invalid coupon',
    'checkout.discount': 'Discount',
    'checkout.subtotal': 'Subtotal',
    'checkout.tax': 'Tax',
    'checkout.total': 'Total',
    
    // Checkout Success
    'checkout.success.title': 'Payment Successful!',
    'checkout.success.subtitle': 'Thank you for your purchase. Your order has been processed successfully.',
    'checkout.success.email.sent': 'Confirmation email sent to your inbox',
    'checkout.success.download.ready': 'Digital products are ready for download',
    'checkout.success.view.orders': 'View Orders',
    'checkout.success.continue.shopping': 'Continue Shopping',
    
    // Favorites
    'favorites.title': 'Your Favorites',
    'favorites.desc': 'Products you\'ve marked as favorites',
    'favorites.empty': 'No favorites yet',
    'favorites.empty.desc': 'Start adding products to your favorites',
    
    // Common
    'common.from': 'From',
    'common.reviews': 'reviews',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    'common.reset': 'Reset'
  }
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt')
  const { rates, loading: currencyLoading, error: currencyError } = useCurrencyRates()

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key
  }

  const formatCurrency = (amount: number): string => {
    if (language === 'pt') {
      // Usar taxa de câmbio em tempo real
      const brlAmount = amount * rates.BRL
      return `R$ ${brlAmount.toFixed(2).replace('.', ',')}`
    }
    return `$${amount.toFixed(2)}`
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      formatCurrency, 
      currencyLoading, 
      currencyError 
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider')
  }
  return context
}
