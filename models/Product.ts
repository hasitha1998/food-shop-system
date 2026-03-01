import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: mongoose.Types.ObjectId
  image?: string
  imagePublicId?: string
  available: boolean
  featured: boolean
  badge?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String },
    imagePublicId: { type: String },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    badge: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
export default Product
