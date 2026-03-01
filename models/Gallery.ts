import mongoose, { Schema, Document } from 'mongoose'

export interface IGallery extends Document {
  imageUrl: string
  publicId: string
  caption?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const GallerySchema = new Schema<IGallery>(
  {
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    caption: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Gallery = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema)
export default Gallery
