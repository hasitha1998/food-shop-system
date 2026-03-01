'use client'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X, Percent, Image as ImageIcon } from 'lucide-react'

interface Offer { _id: string; title: string; description: string; image?: string; active: boolean }
interface FormData { title: string; description: string; active: boolean; order: number }

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Offer | null>(null)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, reset } = useForm<FormData>({ defaultValues: { active: true, order: 0 } })

  const fetchOffers = async () => {
    const res = await fetch('/api/offers')
    setOffers(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchOffers() }, [])

  const openAdd = () => { setEditing(null); setImageFile(null); setImagePreview(''); reset({ active: true, order: 0 }); setShowForm(true) }
  const openEdit = (o: Offer) => { setEditing(o); setImagePreview(o.image || ''); setImageFile(null); reset({ title: o.title, description: o.description, active: o.active, order: 0 }); setShowForm(true) }

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      let imageUrl = editing?.image
      if (imageFile) {
        const fd = new FormData(); fd.append('file', imageFile); fd.append('folder', 'food-shop/offers')
        const r = await fetch('/api/upload', { method: 'POST', body: fd })
        const j = await r.json()
        imageUrl = j.url
      }
      const url = editing ? `/api/offers/${editing._id}` : '/api/offers'
      await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, ...(imageUrl ? { image: imageUrl } : {}) }) })
      toast.success('Saved!')
      setShowForm(false)
      fetchOffers()
    } catch { toast.error('Failed') }
    finally { setSaving(false) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{fontFamily:'Playfair Display,serif'}}>Offers & Promotions</h1>
          <p className="text-sm text-gray-500">Special deals and discounts</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> Add Offer
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{editing ? 'Edit Offer' : 'New Offer'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-3 cursor-pointer hover:border-orange-400 transition-colors text-center">
                  {imagePreview ? <img src={imagePreview} alt="preview" className="h-24 w-full object-cover rounded-lg" /> : <div className="text-gray-400 py-3"><ImageIcon size={24} className="mx-auto mb-1" /><p className="text-xs">Click to upload</p></div>}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if(f){setImageFile(f);setImagePreview(URL.createObjectURL(f))} }} className="hidden" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input {...register('title', {required:true})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="e.g. Buy 2 Get 1 Free" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea {...register('description', {required:true})} rows={2} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('active')} className="rounded" />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 rounded-xl py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-orange-500 text-white rounded-xl py-2 text-sm font-medium disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-40"><div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" /></div>
      ) : offers.length === 0 ? (
        <div className="bg-white rounded-2xl flex flex-col items-center justify-center py-16 shadow-sm border border-gray-100 text-gray-400">
          <Percent size={40} className="mb-3 opacity-40" />
          <p className="font-medium">No offers yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map(offer => (
            <div key={offer._id} className={`bg-white rounded-2xl overflow-hidden shadow-sm border ${offer.active ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
              {offer.image && <img src={offer.image} alt={offer.title} className="w-full h-36 object-cover" />}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{offer.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{offer.description}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(offer)} className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg"><Pencil size={14} /></button>
                    <button onClick={async () => { if(confirm('Delete?')){ await fetch(`/api/offers/${offer._id}`,{method:'DELETE'}); toast.success('Deleted!'); fetchOffers() } }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                  </div>
                </div>
                <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full ${offer.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{offer.active ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
