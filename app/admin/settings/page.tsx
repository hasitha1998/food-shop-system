'use client'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Save, Image as ImageIcon } from 'lucide-react'

interface SettingsForm {
  shopName: string; tagline: string; phone: string; whatsapp: string; address: string;
  googleMapLink: string; openingHours: string; heroTitle: string; heroSubtitle: string;
  facebookUrl: string; instagramUrl: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [logoPreview, setLogoPreview] = useState('')
  const [heroPreview, setHeroPreview] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [heroFile, setHeroFile] = useState<File | null>(null)
  const logoRef = useRef<HTMLInputElement>(null)
  const heroRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SettingsForm>()

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      reset(data)
      setLogoPreview(data.logo || '')
      setHeroPreview(data.heroImage || '')
      setLoading(false)
    })
  }, [reset])

  const uploadFile = async (file: File, folder: string) => {
    const fd = new FormData(); fd.append('file', file); fd.append('folder', folder)
    const r = await fetch('/api/upload', { method: 'POST', body: fd })
    return await r.json()
  }

  const onSubmit = async (data: SettingsForm) => {
    setSaving(true)
    try {
      const payload: Record<string, string> = { ...data }
      if (logoFile) { const r = await uploadFile(logoFile, 'food-shop/logo'); payload.logo = r.url; payload.logoPublicId = r.publicId }
      if (heroFile) { const r = await uploadFile(heroFile, 'food-shop/hero'); payload.heroImage = r.url; payload.heroImagePublicId = r.publicId }
      await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      toast.success('Settings saved!')
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  if (loading) return <div className="flex items-center justify-center h-40"><div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" /></div>

  const InputField = ({ label, name, placeholder, required }: { label: string; name: keyof SettingsForm; placeholder?: string; required?: boolean }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && ' *'}</label>
      <input {...register(name, required ? { required: 'Required' } : {})} placeholder={placeholder} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800" style={{fontFamily:'Playfair Display,serif'}}>Site Settings</h1>
        <p className="text-sm text-gray-500">Control all your shop information</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Shop Name" name="shopName" placeholder="Amma's Kitchen" required />
            <InputField label="Tagline" name="tagline" placeholder="Home-cooked flavors..." />
            <InputField label="Phone" name="phone" placeholder="+94 77 000 0000" required />
            <InputField label="WhatsApp Number" name="whatsapp" placeholder="+94770000000 (no spaces)" required />
            <div className="md:col-span-2">
              <InputField label="Address" name="address" placeholder="123 Main St, Colombo" required />
            </div>
            <div className="md:col-span-2">
              <InputField label="Google Map Link" name="googleMapLink" placeholder="https://maps.google.com/..." />
            </div>
            <InputField label="Opening Hours" name="openingHours" placeholder="Mon-Sun: 8 AM - 10 PM" />
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Hero Title" name="heroTitle" placeholder="Fresh & Delicious Food" required />
            <InputField label="Hero Subtitle" name="heroSubtitle" placeholder="Order via WhatsApp..." />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image</label>
            <div onClick={() => heroRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-orange-400 transition-colors">
              {heroPreview ? <img src={heroPreview} alt="hero" className="h-40 w-full object-cover rounded-lg" /> : <div className="text-gray-400 text-center py-6"><ImageIcon size={30} className="mx-auto mb-2" /><p className="text-sm">Click to upload hero image</p></div>}
            </div>
            <input ref={heroRef} type="file" accept="image/*" onChange={e => { const f=e.target.files?.[0]; if(f){setHeroFile(f);setHeroPreview(URL.createObjectURL(f))} }} className="hidden" />
          </div>
        </div>

        {/* Logo */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">Logo</h2>
          <div onClick={() => logoRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-orange-400 transition-colors max-w-xs">
            {logoPreview ? <img src={logoPreview} alt="logo" className="h-20 object-contain" /> : <div className="text-gray-400 text-center py-4"><ImageIcon size={24} className="mx-auto mb-1" /><p className="text-xs">Upload Logo</p></div>}
          </div>
          <input ref={logoRef} type="file" accept="image/*" onChange={e => { const f=e.target.files?.[0]; if(f){setLogoFile(f);setLogoPreview(URL.createObjectURL(f))} }} className="hidden" />
        </div>

        {/* Social */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Facebook URL" name="facebookUrl" placeholder="https://facebook.com/..." />
            <InputField label="Instagram URL" name="instagramUrl" placeholder="https://instagram.com/..." />
          </div>
        </div>

        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm disabled:opacity-50">
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
