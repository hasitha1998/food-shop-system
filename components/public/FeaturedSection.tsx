interface Product { _id: string; name: string; description: string; price: number; image?: string; badge?: string; category: { name: string; icon?: string } | string }

export default function FeaturedSection({ products, whatsapp, shopName }: { products: Product[]; whatsapp: string; shopName: string }) {
  if (products.length === 0) return null
  const waNumber = whatsapp.replace(/[^0-9]/g, '')

  const orderViaWA = (product: Product) => {
    const msg = encodeURIComponent(`Hi! I'd like to order *${product.name}* from ${shopName}! 🍽️`)
    return `https://wa.me/${waNumber}?text=${msg}`
  }

  const [featured] = products

  return (
    <section id="featured" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-medium text-sm uppercase tracking-widest">Chef's Picks</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2" style={{fontFamily:'Playfair Display,serif'}}>Featured Specials</h2>
        </div>

        {/* Big hero card for first featured */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="relative rounded-3xl overflow-hidden h-80 lg:h-auto">
            {featured.image ? (
              <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center text-8xl">🍛</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8">
              <span className="text-orange-300 text-sm font-medium mb-2">⭐ Featured Special</span>
              <h3 className="text-3xl font-bold text-white mb-2" style={{fontFamily:'Playfair Display,serif'}}>{featured.name}</h3>
              <p className="text-white/70 text-sm mb-4 line-clamp-2">{featured.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-orange-400">Rs. {(featured.price as number).toLocaleString()}</span>
                <a href={orderViaWA(featured)} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                  Order Now 📱
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {products.slice(1, 4).map(product => (
              <div key={product._id} className="flex items-center gap-4 bg-gray-50 hover:bg-orange-50 rounded-2xl p-4 transition-colors group">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-100 to-yellow-50">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      {typeof product.category === 'object' ? product.category.icon || '🍛' : '🍛'}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{product.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-bold text-orange-600 text-sm">Rs. {(product.price as number).toLocaleString()}</span>
                    <a href={orderViaWA(product)} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:text-green-700 font-medium">
                      Order →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining featured items */}
        {products.length > 4 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(4).map(product => (
              <div key={product._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-36 bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-4xl">🍛</div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-gray-800 text-xs leading-tight">{product.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-orange-600 text-sm">Rs. {(product.price as number).toLocaleString()}</span>
                    <a href={orderViaWA(product)} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium hover:bg-green-200">Order</a>
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
