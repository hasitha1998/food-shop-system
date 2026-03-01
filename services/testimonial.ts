import connectDB from '@/lib/mongodb'
import Testimonial from '@/models/Testimonial'

export async function getTestimonials() {
  await connectDB()
  const testimonials = await Testimonial.find({ active: true }).sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(testimonials))
}
