import { Link } from 'react-router-dom';
import { listaFilme } from '../data/filme';

function TopMovies() {
  // Sortăm filmele descrescător după notă
  const filmeTop = [...listaFilme].sort((a, b) => b.nota - a.nota);

  return (
    <div className="py-10 px-6 md:px-20 max-w-6xl mx-auto">
      <div className="mb-12 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Top Filme</h1>
        <p className="text-slate-500 mt-2 font-medium">Cele mai apreciate producții românești.</p>
      </div>

      <div className="flex flex-col gap-4">
        {filmeTop.map((film, index) => (
          <Link 
            to={`/movie/${film.id}`} 
            key={film.id}
            className="group flex items-center gap-6 bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800 p-4 rounded-2xl transition-all duration-300"
          >
            {/* Locul în clasament */}
            <span className="text-4xl font-black text-slate-700 group-hover:text-indigo-500 transition-colors w-12 text-center">
              {index + 1}
            </span>

            {/* Poster Mic */}
            <img 
              src={film.img} 
              alt={film.titlu} 
              className="w-16 h-24 object-cover rounded-lg shadow-lg"
            />

            {/* Info Film */}
            <div className="grow">
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                {film.titlu}
              </h3>
              <div className="flex gap-3 text-sm text-slate-500 mt-1">
                <span>{film.an}</span>
                <span>•</span>
                <span>{film.gen}</span>
                <span>•</span>
                <span>{film.regizor}</span>
              </div>
            </div>

            {/* Nota mare în dreapta */}
            <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-white font-black text-xl">{film.nota}</span>
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

export default TopMovies;