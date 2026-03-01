import connectDB from '@/lib/mongodb'
import Gallery from '@/models/Gallery'

export async function getGallery() {
  await connectDB()
  const images = await Gallery.find().sort({ order: 1, createdAt: -1 })
  return JSON.parse(JSON.stringify(images))
}
