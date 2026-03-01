import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'

export async function getCategories() {
  await connectDB()
  const categories = await Category.find({ active: true }).sort({ order: 1, name: 1 })
  return JSON.parse(JSON.stringify(categories))
}

export async function getAllCategories() {
  await connectDB()
  const categories = await Category.find().sort({ order: 1, name: 1 })
  return JSON.parse(JSON.stringify(categories))
}
