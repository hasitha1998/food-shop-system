import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import Category from '@/models/Category'
import Gallery from '@/models/Gallery'
import Testimonial from '@/models/Testimonial'
import { ShoppingBag, Tag, ImageIcon, Star, TrendingUp, Users } from 'lucide-react'

async function getStats() {
  await connectDB()
  const [products, categories, gallery, testimonials, featured] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments({ active: true }),
    Gallery.countDocuments(),
    Testimonial.countDocuments({ active: true }),
    Product.countDocuments({ featured: true }),
  ])
  return { products, categories, gallery, testimonials, featured }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Total Products', value: stats.products, icon: ShoppingBag, color: 'bg-orange-500', light: 'bg-orange-50 text-orange-600' },
    { label: 'Categories', value: stats.categories, icon: Tag, color: 'bg-yellow-500', light: 'bg-yellow-50 text-yellow-600' },
    { label: 'Featured Items', value: stats.featured, icon: TrendingUp, color: 'bg-red-500', light: 'bg-red-50 text-red-600' },
    { label: 'Gallery Photos', value: stats.gallery, icon: ImageIcon, color: 'bg-blue-500', light: 'bg-blue-50 text-blue-600' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'bg-purple-500', light: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800" style={{fontFamily: 'Playfair Display, serif'}}>
          Welcome Back! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your food shop today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${card.light} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
            </div>
          )
        })}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/admin/products', label: 'Add Product', emoji: '🍛' },
            { href: '/admin/categories', label: 'Add Category', emoji: '📂' },
            { href: '/admin/gallery', label: 'Add Photo', emoji: '📸' },
            { href: '/admin/offers', label: 'Add Offer', emoji: '🎉' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-center"
            >
              <span className="text-2xl mb-1">{item.emoji}</span>
              <span className="text-sm font-medium text-orange-700">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Visit website */}
      <div className="mt-4 p-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl text-white flex items-center justify-between">
        <div>
          <p className="font-semibold">Your website is live!</p>
          <p className="text-sm text-orange-100">Visit the public page to see your changes.</p>
        </div>
        <a href="/" target="_blank" className="bg-white text-orange-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors whitespace-nowrap">
          Visit Site →
        </a>
      </div>
    </div>
  )
}
