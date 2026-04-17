import { Link } from 'react-router-dom';
import { listaSeriale } from '../data/seriale';

function PopularSeries() {

  const serialePopulare = [...listaSeriale].sort((a, b) => b.popularitate - a.popularitate);

  return (
    <div className="py-10 px-6 md:px-20 max-w-6xl mx-auto">
      <div className="mb-12 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Populare </h1>
        <p className="text-slate-500 mt-2 font-medium">Seriale în vogă în acest moment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {serialePopulare.map((serial) => (
          <Link
            to={`/movie/${serial.id}`}
            key={serial.id}
            className="group relative h-64 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl transition-transform hover:scale-[1.02] duration-300"
          >

            <img src={serial.img} className="absolute inset-0 w-full h-full object-cover" alt={serial.titlu} />


            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/60 to-transparent group-hover:via-indigo-950/40 transition-colors"></div>


            <div className="relative h-full p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">🔥 Popular Series</span>
                <span className="text-slate-400 text-xs">{serial.gen}</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-2 leading-none uppercase italic">{serial.titlu}</h3>
              <p className="text-slate-400 text-sm max-w-xs line-clamp-2 italic mb-4">{serial.descriere}</p>

              <div className="flex items-center gap-4">
                <span className="text-cyan-400 font-bold">★ {serial.nota}</span>
                <div className="h-4 w-px bg-slate-700"></div>
                <span className="text-white/60 text-xs">Scor Popularitate: {serial.popularitate}%</span>
              </div>
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

export default PopularSeries;