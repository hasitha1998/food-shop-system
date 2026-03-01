import connectDB from '@/lib/mongodb'
import Offer from '@/models/Offer'

export async function getOffers() {
  await connectDB()
  const offers = await Offer.find({ active: true }).sort({ order: 1 })
  return JSON.parse(JSON.stringify(offers))
}
