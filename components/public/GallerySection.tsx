interface GalleryItem { _id: string; imageUrl: string; caption?: string }

export default function GallerySection({ images }: { images: GalleryItem[] }) {
  if (images.length === 0) return null

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-medium text-sm uppercase tracking-widest">Gallery</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2" style={{fontFamily:'Playfair Display,serif'}}>
            A Feast for the Eyes
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div
              key={img._id}
              className={`relative group rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              style={{aspectRatio: i === 0 ? '1/1' : '4/3'}}
            >
              <img
                src={img.imageUrl}
                alt={img.caption || 'Food photo'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {img.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-xs font-medium">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
