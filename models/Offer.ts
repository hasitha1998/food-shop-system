import mongoose, { Schema, Document } from 'mongoose'

export interface IOffer extends Document {
  title: string
  description: string
  image?: string
  imagePublicId?: string
  active: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const OfferSchema = new Schema<IOffer>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    imagePublicId: { type: String },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Offer = mongoose.models.Offer || mongoose.model<IOffer>('Offer', OfferSchema)
export default Offer
