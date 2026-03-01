import connectDB from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'

export async function getSiteSettings() {
  await connectDB()
  let settings = await SiteSettings.findOne()
  if (!settings) {
    settings = await SiteSettings.create({
      shopName: 'Amma\'s Kitchen',
      tagline: 'Home-cooked flavors, delivered with love',
      phone: '+94 77 000 0000',
      whatsapp: '+94770000000',
      address: 'Colombo, Sri Lanka',
      openingHours: 'Mon-Sun: 8:00 AM - 10:00 PM',
      heroTitle: 'Fresh & Delicious Sri Lankan Food',
      heroSubtitle: 'Order now via WhatsApp — Cash on Delivery available!',
    })
  }
  return JSON.parse(JSON.stringify(settings))
}
