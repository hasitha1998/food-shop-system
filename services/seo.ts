import connectDB from '@/lib/mongodb'
import SEO from '@/models/SEO'

export async function getSEO() {
  await connectDB()
  let seo = await SEO.findOne()
  if (!seo) {
    seo = await SEO.create({
      metaTitle: 'Amma\'s Kitchen - Fresh Sri Lankan Food',
      metaDescription: 'Order fresh, home-cooked Sri Lankan food via WhatsApp. Cash on delivery available.',
      keywords: 'food, delivery, sri lankan food, rice and curry, cakes, beverages',
    })
  }
  return JSON.parse(JSON.stringify(seo))
}
