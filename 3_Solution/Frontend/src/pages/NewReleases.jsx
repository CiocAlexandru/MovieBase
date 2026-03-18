import { Link } from 'react-router-dom';
import { listaFilme } from '../data/filme';
import { listaSeriale } from '../data/seriale'; // Importăm și serialele

function NewReleases() {
  // Combinăm ambele liste și le sortăm descrescător după an
  const noutati = [...listaFilme, ...listaSeriale].sort((a, b) => b.an - a.an);

  return (
     <div className="py-10 px-6 md:px-20 max-w-6xl mx-auto">
      <div className="mb-12 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Lansări Noi</h1>
        <p className="text-slate-500 mt-2 font-medium">Cele mai recente adăugări în biblioteca PELICULA.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {noutati.map((item) => (
          <Link 
            to={`/movie/${item.id}`} 
            key={item.id}
            className="group flex flex-col bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500 transition-all duration-300"
          >
            {/* Poster cu badge de an */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={item.img} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt={item.titlu} 
              />
              <div className="absolute top-4 left-4 bg-indigo-600 text-white font-black px-3 py-1 rounded-lg shadow-xl text-sm">
                {item.an}
              </div>
              {/* Optional: Un badge mic sa stim daca e serial sau film */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[9px] font-black px-2 py-1 rounded uppercase">
                {item.id > 100 ? "Serial" : "Film"}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">
                  {item.titlu}
                </h3>
                <span className="text-cyan-400 font-bold">★ {item.nota}</span>
              </div>
              <p className="text-slate-500 text-sm line-clamp-2 italic mb-4">
                {item.descriere}
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter border border-slate-800 px-2 py-1 rounded">
                    {item.gen}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter border border-slate-800 px-2 py-1 rounded">
                    {item.regizor}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer-ul tau centrat */}
      <footer className="mt-32 pt-12 border-t border-slate-800/50 flex flex-col items-center">
        <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest"> 
            © {new Date().getFullYear()} PELICULA MEDIA • Toate Drepturile Rezervate
        </div>
      </footer>
    </div>
  );
}

export default NewReleases;