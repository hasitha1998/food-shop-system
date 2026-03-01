import mongoose, { Schema, Document } from 'mongoose'

export interface ITestimonial extends Document {
  customerName: string
  message: string
  image?: string
  imagePublicId?: string
  rating: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    customerName: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String },
    imagePublicId: { type: String },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)
export default Testimonial
