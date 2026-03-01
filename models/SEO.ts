import mongoose, { Schema, Document } from 'mongoose'

export interface ISEO extends Document {
  metaTitle: string
  metaDescription: string
  keywords: string
  ogImage?: string
  ogImagePublicId?: string
  createdAt: Date
  updatedAt: Date
}

const SEOSchema = new Schema<ISEO>(
  {
    metaTitle: { type: String, default: 'Food Shop' },
    metaDescription: { type: String, default: 'Order delicious food via WhatsApp' },
    keywords: { type: String, default: 'food, delivery, order online' },
    ogImage: { type: String },
    ogImagePublicId: { type: String },
  },
  { timestamps: true }
)

const SEO = mongoose.models.SEO || mongoose.model<ISEO>('SEO', SEOSchema)
export default SEO
