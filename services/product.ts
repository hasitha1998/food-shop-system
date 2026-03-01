import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function getProducts(categoryId?: string) {
  await connectDB()
  const filter: Record<string, unknown> = {}
  if (categoryId) filter.category = categoryId
  const products = await Product.find(filter).populate('category').sort({ order: 1, createdAt: -1 })
  return JSON.parse(JSON.stringify(products))
}

export async function getFeaturedProducts() {
  await connectDB()
  const products = await Product.find({ featured: true, available: true }).populate('category').limit(8)
  return JSON.parse(JSON.stringify(products))
}

export async function getAllProducts() {
  await connectDB()
  const products = await Product.find().populate('category').sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(products))
}
