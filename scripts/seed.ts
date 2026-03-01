import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-shop'

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  // Models inline
  const AdminSchema = new mongoose.Schema({ email: String, password: String, role: { type: String, default: 'admin' } })
  const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

  const CategorySchema = new mongoose.Schema({ name: String, slug: String, description: String, icon: String, order: Number, active: { type: Boolean, default: true } })
  const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)

  const ProductSchema = new mongoose.Schema({ name: String, description: String, price: Number, category: mongoose.Types.ObjectId, image: String, available: { type: Boolean, default: true }, featured: { type: Boolean, default: false }, badge: String, order: Number })
  const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

  const TestimonialSchema = new mongoose.Schema({ customerName: String, message: String, rating: Number, active: { type: Boolean, default: true } }, { timestamps: true })
  const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema)

  // Create admin
  const existingAdmin = await Admin.findOne({ email: 'admin@foodshop.com' })
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 12)
    await Admin.create({ email: 'admin@foodshop.com', password: hashedPassword, role: 'admin' })
    console.log('✅ Admin created: admin@foodshop.com / admin123')
  } else {
    console.log('ℹ️ Admin already exists')
  }

  // Categories
  const categories = [
    { name: 'Rice & Curry', slug: 'rice-curry', icon: '🍛', description: 'Traditional Sri Lankan rice and curry', order: 1 },
    { name: 'Cakes & Desserts', slug: 'cakes-desserts', icon: '🎂', description: 'Fresh baked cakes and sweet treats', order: 2 },
    { name: 'Street Food', slug: 'street-food', icon: '🌮', description: 'Popular Lankan street snacks', order: 3 },
    { name: 'Beverages', slug: 'beverages', icon: '🥤', description: 'Fresh drinks and smoothies', order: 4 },
    { name: 'Short Eats', slug: 'short-eats', icon: '🥐', description: 'Quick bites and snacks', order: 5 },
  ]

  const catMap: Record<string, mongoose.Types.ObjectId> = {}
  for (const cat of categories) {
    let existing = await Category.findOne({ slug: cat.slug })
    if (!existing) {
      existing = await Category.create(cat)
      console.log(`✅ Category: ${cat.name}`)
    }
    catMap[cat.slug] = existing._id
  }

  // Products
  const products = [
    // Rice & Curry
    { name: 'Rice & Dhal Curry', description: 'Fragrant white rice with creamy dhal, tempered with mustard seeds and curry leaves.', price: 280, category: catMap['rice-curry'], available: true, featured: true, badge: 'Popular', order: 1 },
    { name: 'Chicken Rice Packet', description: 'Aromatic yellow rice with spicy chicken curry, salad and pickle.', price: 450, category: catMap['rice-curry'], available: true, featured: true, badge: 'Best Seller', order: 2 },
    { name: 'Fish Curry Rice', description: 'Fresh fish cooked in rich coconut milk curry, served with white rice.', price: 380, category: catMap['rice-curry'], available: true, featured: false, order: 3 },
    { name: 'Vegetable Rice Packet', description: 'Healthy rice with mixed vegetable curry, papadam, and chutney.', price: 250, category: catMap['rice-curry'], available: true, featured: false, order: 4 },
    // Cakes
    { name: 'Chocolate Fudge Cake', description: 'Rich dark chocolate cake with silky ganache frosting. Made fresh daily.', price: 1800, category: catMap['cakes-desserts'], available: true, featured: true, badge: 'New', order: 1 },
    { name: 'Black Forest Cake', description: 'Classic German-style cake with cherries, cream and dark chocolate shavings.', price: 2200, category: catMap['cakes-desserts'], available: true, featured: true, order: 2 },
    { name: 'Vanilla Butter Cake', description: 'Light and fluffy traditional butter cake, perfect for any occasion.', price: 1500, category: catMap['cakes-desserts'], available: true, featured: false, order: 3 },
    { name: 'Coconut Cake', description: 'Sri Lankan-style coconut cake with desiccated coconut topping.', price: 1400, category: catMap['cakes-desserts'], available: true, featured: false, order: 4 },
    // Street Food
    { name: 'Kottu Roti', description: 'Chopped roti stir-fried with egg, vegetables and spices. A Sri Lankan favorite!', price: 350, category: catMap['street-food'], available: true, featured: true, badge: 'Spicy 🌶', order: 1 },
    { name: 'Egg Hoppers', description: 'Crispy bowl-shaped pancake with a perfect egg in the center, served with chutney.', price: 80, category: catMap['street-food'], available: true, featured: false, order: 2 },
    { name: 'String Hoppers', description: 'Soft steamed rice noodle nests, served with coconut sambol and dhal.', price: 120, category: catMap['street-food'], available: true, featured: false, order: 3 },
    // Beverages
    { name: 'Fresh Mango Juice', description: 'Freshly squeezed Alphonso mango juice with no added sugar.', price: 180, category: catMap['beverages'], available: true, featured: false, order: 1 },
    { name: 'King Coconut Water', description: 'Fresh thambili (king coconut) served chilled with natural electrolytes.', price: 120, category: catMap['beverages'], available: true, featured: false, order: 2 },
    { name: 'Avocado Shake', description: 'Thick and creamy avocado milkshake blended with condensed milk.', price: 250, category: catMap['beverages'], available: true, featured: false, order: 3 },
    // Short Eats
    { name: 'Chicken Patties', description: 'Flaky golden pastry filled with spiced minced chicken. Freshly baked.', price: 80, category: catMap['short-eats'], available: true, featured: false, order: 1 },
    { name: 'Cutlets', description: 'Crispy fried fish or chicken cutlets with a crunchy breadcrumb coating.', price: 60, category: catMap['short-eats'], available: true, featured: false, order: 2 },
  ]

  for (const p of products) {
    const exists = await Product.findOne({ name: p.name })
    if (!exists) {
      await Product.create(p)
      console.log(`✅ Product: ${p.name}`)
    }
  }

  // Testimonials
  const testimonials = [
    { customerName: 'Nimal Perera', message: 'The rice packets are absolutely delicious! Reminds me of home cooking. Will definitely order again!', rating: 5, active: true },
    { customerName: 'Priya Fernando', message: 'Ordered the chocolate cake for my daughter\'s birthday. It was stunning and tasted amazing. Everyone loved it!', rating: 5, active: true },
    { customerName: 'Kasun Silva', message: 'Best kottu in the area! Ordering via WhatsApp is so convenient and delivery is always on time.', rating: 5, active: true },
    { customerName: 'Ayesha Rauf', message: 'Fresh, affordable, and incredibly tasty. The chicken rice packet is my weekly go-to meal!', rating: 4, active: true },
    { customerName: 'Chamara Bandara', message: 'The avocado shake is to die for! Really thick and creamy. Love supporting local food businesses!', rating: 5, active: true },
  ]

  for (const t of testimonials) {
    const exists = await Testimonial.findOne({ customerName: t.customerName })
    if (!exists) {
      await Testimonial.create(t)
      console.log(`✅ Testimonial: ${t.customerName}`)
    }
  }

  console.log('\n🎉 Seed completed!')
  console.log('Admin login: admin@foodshop.com / admin123')
  await mongoose.disconnect()
}

seed().catch(console.error)
