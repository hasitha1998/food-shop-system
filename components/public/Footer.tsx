export default function Footer({ shopName, phone, whatsapp }: { shopName: string; phone: string; whatsapp: string }) {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="font-bold text-lg text-orange-400" style={{fontFamily:'Playfair Display,serif'}}>🍛 {shopName}</p>
          <p className="text-gray-500 text-xs mt-1">Delicious food, delivered with love.</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href={`tel:${phone}`} className="hover:text-orange-400 transition-colors">{phone}</a>
          <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g,'')}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">WhatsApp</a>
        </div>
        <p className="text-gray-600 text-xs">© {new Date().getFullYear()} {shopName}. All rights reserved.</p>
      </div>
    </footer>
  )
}
