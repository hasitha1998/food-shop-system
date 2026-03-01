import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import SEO from '@/models/SEO'

export async function GET() {
  try {
    await connectDB()
    let seo = await SEO.findOne()
    if (!seo) seo = await SEO.create({ metaTitle: "Food Shop", metaDescription: "Delicious food", keywords: "food" })
    return NextResponse.json(seo)
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
    let seo = await SEO.findOne()
    if (seo) {
      seo = await SEO.findByIdAndUpdate(seo._id, data, { new: true })
    } else {
      seo = await SEO.create(data)
    }
    return NextResponse.json(seo)
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
