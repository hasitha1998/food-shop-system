'use client'
import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { Trash2, Upload, ImageIcon } from 'lucide-react'

interface GalleryItem { _id: string; imageUrl: string; caption?: string; publicId: string }

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchImages = async () => {
    const res = await fetch('/api/gallery')
    setImages(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchImages() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'food-shop/gallery')
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd })
      const { url, publicId } = await uploadRes.json()
      await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: url, publicId, caption }) })
      toast.success('Image uploaded!')
      setCaption('')
      fetchImages()
    } catch { toast.error('Upload failed') }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = '' }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
    toast.success('Deleted!')
    fetchImages()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800" style={{fontFamily:'Playfair Display,serif'}}>Gallery</h1>
        <p className="text-sm text-gray-500">Manage your food photos</p>
      </div>

      {/* Upload */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="font-semibold text-gray-700 mb-3">Upload New Photo</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Caption (optional)"
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
          >
            {uploading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Upload size={16} />}
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-40"><div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" /></div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-2xl flex flex-col items-center justify-center py-16 shadow-sm border border-gray-100 text-gray-400">
          <ImageIcon size={40} className="mb-3 opacity-40" />
          <p className="font-medium">No photos yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img._id} className="relative group rounded-2xl overflow-hidden aspect-square bg-gray-100">
              <img src={img.imageUrl} alt={img.caption || 'Gallery'} className="w-full h-full object-cover" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-xs">{img.caption}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img._id)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full transition-all shadow-lg hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
