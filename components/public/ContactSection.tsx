import { Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react'

interface Settings {
  phone: string; whatsapp: string; address: string; openingHours: string;
  googleMapLink?: string; facebookUrl?: string; instagramUrl?: string; shopName: string;
}

export default function ContactSection({ settings }: { settings: Settings }) {
  const waNumber = settings.whatsapp.replace(/[^0-9]/g, '')

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-400 font-medium text-sm uppercase tracking-widest">Get in Touch</span>
          <h2 className="text-4xl font-bold text-white mt-2" style={{fontFamily:'Playfair Display,serif'}}>
            Contact & Location
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone size={22} className="text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Phone</h3>
                <a href={`tel:${settings.phone}`} className="text-gray-400 hover:text-orange-400 transition-colors">{settings.phone}</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-400">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                  {settings.whatsapp} — Chat & Order
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin size={22} className="text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Address</h3>
                <p className="text-gray-400">{settings.address}</p>
                {settings.googleMapLink && (
                  <a href={settings.googleMapLink} target="_blank" rel="noopener noreferrer" className="text-orange-400 text-sm hover:text-orange-300 mt-1 inline-block">
                    View on Google Maps →
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock size={22} className="text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Opening Hours</h3>
                <p className="text-gray-400">{settings.openingHours}</p>
              </div>
            </div>

            {/* Social */}
            {(settings.facebookUrl || settings.instagramUrl) && (
              <div className="flex items-center gap-3 pt-2">
                {settings.facebookUrl && (
                  <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600 rounded-xl flex items-center justify-center text-blue-400 hover:text-white transition-all">
                    <Facebook size={18} />
                  </a>
                )}
                {settings.instagramUrl && (
                  <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-600/20 hover:bg-pink-600 rounded-xl flex items-center justify-center text-pink-400 hover:text-white transition-all">
                    <Instagram size={18} />
                  </a>
                )}
              </div>
            )}

            {/* Big WhatsApp CTA */}
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello ${settings.shopName}! I'd like to place an order 🍽️`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-bold text-base transition-all shadow-lg hover:shadow-green-500/30"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order on WhatsApp Now!
            </a>
          </div>

          {/* Map iframe */}
          <div className="rounded-3xl overflow-hidden h-80 lg:h-full min-h-80 bg-gray-800 border border-gray-700">
            {settings.googleMapLink ? (
              <iframe
                src={settings.googleMapLink.replace('/maps/', '/maps/embed?').replace('?q=', '?q=')}
                width="100%"
                height="100%"
                style={{border:0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-80"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                <MapPin size={40} className="mb-3 opacity-40" />
                <p className="text-sm">{settings.address}</p>
                <p className="text-xs mt-2 text-gray-600">Add Google Maps link in admin settings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
