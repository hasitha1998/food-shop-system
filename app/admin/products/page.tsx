'use client'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X, Star, Image as ImageIcon } from 'lucide-react'

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  description: z.string().min(1, 'Description required'),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category required'),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
  badge: z.string().optional(),
  order: z.number().default(0),
})
type FormData = z.infer<typeof schema>

interface Category { _id: string; name: string; icon?: string }
interface Product { _id: string; name: string; description: string; price: number; category: Category; image?: string; available: boolean; featured: boolean; badge?: string; order: number }

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { available: true, featured: false, order: 0, price: 0 },
  })

  const fetchData = async () => {
    const [prRes, catRes] = await Promise.all([fetch('/api/products'), fetch('/api/categories')])
    setProducts(await prRes.json())
    setCategories(await catRes.json())
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  const openAdd = () => {
    setEditing(null)
    setImageFile(null)
    setImagePreview('')
    reset({ available: true, featured: false, order: 0, price: 0, name: '', description: '', category: '', badge: '' })
    setShowForm(true)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setImagePreview(p.image || '')
    setImageFile(null)
    reset({ name: p.name, description: p.description, price: p.price, category: (p.category as unknown as { _id: string })?._id || (p.category as unknown as string), available: p.available, featured: p.featured, badge: p.badge || '', order: p.order })
    setShowForm(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const uploadImage = async (): Promise<{url: string; publicId: string} | null> => {
    if (!imageFile) return null
    setUploadingImage(true)
    const fd = new FormData()
    fd.append('file', imageFile)
    fd.append('folder', 'food-shop/products')
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    setUploadingImage(false)
    if (!res.ok) return null
    return await res.json()
  }

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      let imageData: {url?: string; publicId?: string} = {}
      if (imageFile) {
        const uploaded = await uploadImage()
        if (uploaded) { imageData = { url: uploaded.url, publicId: uploaded.publicId } }
      }
      const payload = {
        ...data,
        ...(imageData.url ? { image: imageData.url, imagePublicId: imageData.publicId } : {}),
      }
      const url = editing ? `/api/products/${editing._id}` : '/api/products'
      const method = editing ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error()
      toast.success(editing ? 'Product updated!' : 'Product created!')
      setShowForm(false)
      fetchData()
    } catch { toast.error('Something went wrong') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    toast.success('Deleted!')
    fetchData()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{fontFamily:'Playfair Display,serif'}}>Products</h1>
          <p className="text-sm text-gray-500">Manage your menu items</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl my-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{editing ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-orange-400 transition-colors text-center"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="h-32 w-full object-cover rounded-lg mx-auto" />
                  ) : (
                    <div className="text-gray-400 py-4">
                      <ImageIcon size={30} className="mx-auto mb-2" />
                      <p className="text-sm">Click to upload image</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input {...register('name')} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="e.g. Rice & Dhal Curry" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea {...register('description')} rows={2} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" placeholder="Short description of the item" />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (LKR) *</label>
                  <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="350" />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select {...register('category')} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Select category</option>
                    {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.icon} {cat.name}</option>)}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge (optional)</label>
                  <input {...register('badge')} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="New / Popular / Spicy" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input type="number" {...register('order', { valueAsNumber: true })} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div className="col-span-2 flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register('available')} className="rounded" />
                    <span className="text-sm font-medium text-gray-700">Available</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register('featured')} className="rounded" />
                    <span className="text-sm font-medium text-gray-700">Featured</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 rounded-xl py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving || uploadingImage} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-2 text-sm font-medium disabled:opacity-50">
                  {saving || uploadingImage ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-40"><div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" /></div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl flex flex-col items-center justify-center py-16 shadow-sm border border-gray-100 text-gray-400">
          <span className="text-4xl mb-3">🍽️</span>
          <p className="font-medium">No products yet</p>
          <button onClick={openAdd} className="mt-3 text-orange-500 text-sm font-medium">Add your first product →</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="relative h-40 bg-gray-100">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-4xl">🍛</div>
                )}
                {product.featured && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star size={10} /> Featured
                  </span>
                )}
                {product.badge && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{product.badge}</span>
                )}
                {!product.available && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-white text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">Unavailable</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{product.description}</p>
                    <p className="text-xs text-orange-500 mt-1">{typeof product.category === 'object' ? `${product.category.icon || ''} ${product.category.name}` : ''}</p>
                  </div>
                  <p className="text-base font-bold text-orange-600 whitespace-nowrap">Rs. {product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${product.available ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {product.available ? 'Available' : 'Unavailable'}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(product)} className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(product._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
