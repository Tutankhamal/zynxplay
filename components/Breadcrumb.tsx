import { ChevronRight } from 'lucide-react'

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
          {item.href ? (
            <a href={item.href} className="hover:text-white smooth-transition">
              {item.label}
            </a>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
