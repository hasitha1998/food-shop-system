'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Testimonial { _id: string; customerName: string; message: string; rating: number; image?: string }

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0)
  if (testimonials.length === 0) return null

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-medium text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2" style={{fontFamily:'Playfair Display,serif'}}>
            What Our Customers Say
          </h2>
        </div>

        {/* Desktop: grid; Mobile: slider */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map(t => (
            <TestimonialCard key={t._id} testimonial={t} />
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden">
          <TestimonialCard testimonial={testimonials[current]} />
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-orange-500' : 'bg-gray-200'}`} />
              ))}
            </div>
            <button onClick={next} className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial: t }: { testimonial: { customerName: string; message: string; rating: number; image?: string } }) {
  return (
    <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:border-orange-200 transition-colors">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({length:5}).map((_,i) => (
          <Star key={i} size={14} className={i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.message}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
          {t.image ? <img src={t.image} alt={t.customerName} className="w-full h-full object-cover" /> : t.customerName.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{t.customerName}</p>
          <p className="text-xs text-gray-400">Verified Customer</p>
        </div>
      </div>
    </div>
  )
}
