interface Offer { _id: string; title: string; description: string; image?: string }

export default function OffersSection({ offers, whatsapp }: { offers: Offer[]; whatsapp: string }) {
  if (offers.length === 0) return null
  const waNumber = whatsapp.replace(/[^0-9]/g, '')

  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-700/30 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>
            🎉 Special Offers
          </h2>
          <p className="text-orange-100 mt-2">Limited time deals just for you!</p>
        </div>

        <div className={`grid gap-6 ${offers.length === 1 ? 'max-w-md mx-auto' : offers.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
          {offers.map(offer => (
            <div key={offer._id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 transition-colors">
              {offer.image && (
                <img src={offer.image} alt={offer.title} className="w-full h-44 object-cover" />
              )}
              <div className="p-6">
                <h3 className="font-bold text-white text-xl mb-2" style={{fontFamily:'Playfair Display,serif'}}>{offer.title}</h3>
                <p className="text-orange-100 text-sm mb-5">{offer.description}</p>
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi! I'm interested in the offer: ${offer.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-orange-50 transition-colors"
                >
                  📱 Claim Offer
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
