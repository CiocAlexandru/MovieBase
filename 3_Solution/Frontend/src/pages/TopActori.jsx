import React, { useMemo } from 'react';
import { listaFilme } from '../data/filme';
import { listaSeriale } from '../data/seriale';
import { listaActori } from '../data/actori';
import { Link } from 'react-router-dom';
import './TopMovies.css';

function TopActori() {
  const actoriRanked = useMemo(() => {
    const stats = {};
    const toatePeliculele = [...listaFilme, ...listaSeriale];

    toatePeliculele.forEach((item) => {
      item.actori.forEach((actorNume, idx) => {
        const actorData = listaActori.find(a => a.nume === actorNume);
        const actorId = item.actorIds?.[idx] || actorNume;
        if (!stats[actorNume]) {
          stats[actorNume] = { 
            id: actorId,
            nume: actorNume, 
            count: 0, 
            sumaNote: 0, 
            img: actorData?.img || item.img,
            varsta: actorData?.varsta || null
          };
        }
        stats[actorNume].count += 1;
        stats[actorNume].sumaNote += item.nota;
      });
    });

    return Object.values(stats)
      .map((a) => ({
        ...a,
        media: (a.sumaNote / a.count).toFixed(1),
      }))
      .sort((a, b) => b.media - a.media);
  }, []);

  return (
    <div className="py-10 px-6 md:px-20 max-w-6xl mx-auto">
      
      <div className="mb-12 border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic"> Top Actori </h1>
        <p className="text-slate-500 mt-2 font-medium">Performanța medie calculată din filme și seriale.</p>
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        {actoriRanked.map((actor, index) => (
          <Link
            key={actor.nume}
            to={`/actor/${actor.id}`}
            className="group flex items-center gap-3 md:gap-6 bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300"
          >
            
            <span className="text-2xl md:text-4xl font-black text-slate-700 group-hover:text-indigo-500 transition-colors w-8 md:w-12 text-center italic shrink-0">
              {index + 1}
            </span>

            <div className="relative w-12 h-16 md:w-16 md:h-20 overflow-hidden rounded-xl md:rounded-2xl shadow-xl bg-slate-800 shrink-0 hidden sm:block">
              <img
                src={actor.img}
                alt={actor.nume}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
            </div>

            <div className="grow min-w-0">
              <h3 className="text-base md:text-2xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase italic tracking-tight truncate">
                {actor.nume}
              </h3>
              <div className="flex items-center gap-2 mt-0.5 md:mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                <p className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest truncate">
                  {actor.count} {actor.count === 1 ? 'Proiect' : 'Proiecte'} în palmares
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2 bg-slate-950/80 px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-[24px] border border-slate-800 group-hover:border-indigo-500/50 transition-colors shrink-0">
              <span className="text-yellow-500 text-sm md:text-xl">★</span>
              <span className="text-white font-black text-lg md:text-2xl tracking-tighter">
                {actor.media}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <footer className="mt-32 pt-12 border-t border-slate-800/50 flex flex-col items-center">
        <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest"> © {new Date().getFullYear()} PELICULA MEDIA • Toate Drepturile Rezervate</div>
      </footer>
    </div>
  );
}

export default TopActori;