'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Save } from 'lucide-react'

interface SEOForm { metaTitle: string; metaDescription: string; keywords: string }

export default function SEOPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset } = useForm<SEOForm>()

  useEffect(() => {
    fetch('/api/seo').then(r => r.json()).then(data => { reset(data); setLoading(false) })
  }, [reset])

  const onSubmit = async (data: SEOForm) => {
    setSaving(true)
    try {
      await fetch('/api/seo', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      toast.success('SEO settings saved!')
    } catch { toast.error('Failed') }
    finally { setSaving(false) }
  }

  if (loading) return <div className="flex items-center justify-center h-40"><div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800" style={{fontFamily:'Playfair Display,serif'}}>SEO Settings</h1>
        <p className="text-sm text-gray-500">Optimize your search engine visibility</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
          <input {...register('metaTitle')} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Your Shop Name - Delicious Food" />
          <p className="text-xs text-gray-400 mt-1">Recommended: 50-60 characters</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
          <textarea {...register('metaDescription')} rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" placeholder="Order fresh homemade food via WhatsApp..." />
          <p className="text-xs text-gray-400 mt-1">Recommended: 150-160 characters</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
          <input {...register('keywords')} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="food delivery, rice curry, cakes, colombo food" />
          <p className="text-xs text-gray-400 mt-1">Comma-separated keywords</p>
        </div>
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
          <Save size={16} />
          {saving ? 'Saving...' : 'Save SEO Settings'}
        </button>
      </form>
    </div>
  )
}
