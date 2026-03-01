'use client'
import { useState } from 'react'

interface Category { _id: string; name: string; icon?: string }
interface Product { _id: string; name: string; description: string; price: number; category: Category; image?: string; available: boolean; featured: boolean; badge?: string }

export default function MenuSection({ categories, products, whatsapp, shopName }: { categories: Category[]; products: Product[]; whatsapp: string; shopName: string }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const waNumber = whatsapp.replace(/[^0-9]/g, '')

  const filtered = activeCategory === 'all'
    ? products.filter(p => p.available)
    : products.filter(p => {
        const catId = typeof p.category === 'object' ? p.category._id : p.category
        return catId === activeCategory && p.available
      })

  const orderViaWA = (product: Product) => {
    const msg = encodeURIComponent(`Hi! I'd like to order *${product.name}* (Rs. ${product.price.toLocaleString()}) from ${shopName}. 🍽️`)
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank')
  }

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-orange-500 font-medium text-sm uppercase tracking-widest">Our Menu</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2" style={{fontFamily:'Playfair Display,serif'}}>
            What We Serve
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Freshly prepared with love. Order via WhatsApp for cash on delivery.</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'}`}
          >
            🍽️ All Items
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat._id ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <span className="text-4xl">🍽️</span>
            <p className="mt-3">No items in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div key={product._id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-100">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-yellow-50 overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-5xl">
                      {typeof product.category === 'object' ? product.category.icon || '🍛' : '🍛'}
                    </div>
                  )}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  {product.featured && (
                    <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => orderViaWA(product)}
                      className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
