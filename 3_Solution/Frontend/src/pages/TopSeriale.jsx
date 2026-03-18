import { Link } from 'react-router-dom';
import { listaSeriale } from '../data/seriale';

function TopSeriale() {
  // Sortăm serialele descrescător după notă
  const serialeTop = [...listaSeriale].sort((a, b) => b.nota - a.nota);

  return (
    <div className="py-10 px-6 md:px-20 max-w-6xl mx-auto">
      <div className="mb-12 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">Top Seriale</h1>
        <p className="text-slate-500 mt-2 font-medium">Clasamentul celor mai bune producții episodice românești.</p>
      </div>

      <div className="flex flex-col gap-4">
        {serialeTop.map((serial, index) => (
          <Link 
            to={`/movie/${serial.id}`} 
            key={serial.id}
            className="group flex items-center gap-6 bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800 p-4 rounded-2xl transition-all duration-300"
          >
            {/* Locul în clasament */}
            <span className="text-4xl font-black text-slate-700 group-hover:text-indigo-500 transition-colors w-12 text-center">
              {index + 1}
            </span>

            {/* Poster Mic */}
            <img 
              src={serial.img} 
              alt={serial.titlu} 
              className="w-16 h-24 object-cover rounded-lg shadow-lg"
            />

            {/* Info Serial */}
            <div className="grow">
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors uppercase italic">
                {serial.titlu}
              </h3>
              <div className="flex gap-3 text-sm text-slate-500 mt-1">
                <span>{serial.an}</span>
                <span>•</span>
                <span>{serial.gen}</span>
                <span>•</span>
                <span>Regizat de {serial.regizor}</span>
              </div>
            </div>

            {/* Nota mare în dreapta */}
            <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-white font-black text-xl">{serial.nota}</span>
            </div>
          </Link>
        ))}
      </div>
      <footer className="mt-32 pt-12 border-t border-slate-800/50 flex flex-col items-center">
        <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest"> © {new Date().getFullYear()} PELICULA MEDIA • Toate Dreputrile Rezervate</div>
      </footer>
    </div>
  );
}

export default TopSeriale;