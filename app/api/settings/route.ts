import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'

export async function GET() {
  try {
    await connectDB()
    let settings = await SiteSettings.findOne()
    if (!settings) {
      settings = await SiteSettings.create({
        shopName: "Amma's Kitchen",
        tagline: 'Home-cooked flavors, delivered with love',
        phone: '+94 77 000 0000',
        whatsapp: '+94770000000',
        address: 'Colombo, Sri Lanka',
        openingHours: 'Mon-Sun: 8:00 AM - 10:00 PM',
        heroTitle: 'Fresh & Delicious Sri Lankan Food',
        heroSubtitle: 'Order now via WhatsApp — Cash on Delivery available!',
      })
    }
    return NextResponse.json(settings)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const data = await request.json()
    let settings = await SiteSettings.findOne()
    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, data, { new: true })
    } else {
      settings = await SiteSettings.create(data)
    }
    return NextResponse.json(settings)
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
