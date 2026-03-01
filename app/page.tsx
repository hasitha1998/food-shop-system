import { Metadata } from 'next'
import { getSiteSettings } from '@/services/siteSettings'
import { getCategories } from '@/services/category'
import { getProducts, getFeaturedProducts } from '@/services/product'
import { getGallery } from '@/services/gallery'
import { getTestimonials } from '@/services/testimonial'
import { getOffers } from '@/services/offer'
import { getSEO } from '@/services/seo'
import Navbar from '@/components/public/Navbar'
import HeroSection from '@/components/public/HeroSection'
import MenuSection from '@/components/public/MenuSection'
import FeaturedSection from '@/components/public/FeaturedSection'
import OffersSection from '@/components/public/OffersSection'
import GallerySection from '@/components/public/GallerySection'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import ContactSection from '@/components/public/ContactSection'
import WhatsAppFloat from '@/components/public/WhatsAppFloat'
import Footer from '@/components/public/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO()
  const settings = await getSiteSettings()
  return {
    title: seo.metaTitle || settings.shopName,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: {
      title: seo.metaTitle || settings.shopName,
      description: seo.metaDescription,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
  }
}

export default async function HomePage() {
  const [settings, categories, products, featured, gallery, testimonials, offers] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getProducts(),
    getFeaturedProducts(),
    getGallery(),
    getTestimonials(),
    getOffers(),
  ])

  return (
    <main>
      <Navbar settings={settings} />
      <HeroSection settings={settings} />
      <MenuSection categories={categories} products={products} whatsapp={settings.whatsapp} shopName={settings.shopName} />
      <FeaturedSection products={featured} whatsapp={settings.whatsapp} shopName={settings.shopName} />
      <OffersSection offers={offers} whatsapp={settings.whatsapp} />
      <GallerySection images={gallery} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection settings={settings} />
      <Footer shopName={settings.shopName} phone={settings.phone} whatsapp={settings.whatsapp} />
      <WhatsAppFloat whatsapp={settings.whatsapp} shopName={settings.shopName} />
    </main>
  )
}
