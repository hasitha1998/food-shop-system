import mongoose, { Schema, Document } from 'mongoose'

export interface ISiteSettings extends Document {
  shopName: string
  tagline: string
  logo?: string
  logoPublicId?: string
  phone: string
  whatsapp: string
  address: string
  googleMapLink?: string
  openingHours: string
  heroTitle: string
  heroSubtitle: string
  heroImage?: string
  heroImagePublicId?: string
  facebookUrl?: string
  instagramUrl?: string
  createdAt: Date
  updatedAt: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    shopName: { type: String, required: true, default: 'Food Shop' },
    tagline: { type: String, default: 'Delicious food delivered to you' },
    logo: { type: String },
    logoPublicId: { type: String },
    phone: { type: String, required: true, default: '+94 77 000 0000' },
    whatsapp: { type: String, required: true, default: '+94770000000' },
    address: { type: String, required: true, default: 'Colombo, Sri Lanka' },
    googleMapLink: { type: String },
    openingHours: { type: String, default: 'Mon-Sun: 8:00 AM - 10:00 PM' },
    heroTitle: { type: String, default: 'Fresh & Delicious Food' },
    heroSubtitle: { type: String, default: 'Order now via WhatsApp' },
    heroImage: { type: String },
    heroImagePublicId: { type: String },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
  },
  { timestamps: true }
)

const SiteSettings = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)
export default SiteSettings
