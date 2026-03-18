import React, { useMemo } from 'react';
import { listaFilme } from '../data/filme';
import { listaSeriale } from '../data/seriale';
import { Link } from 'react-router-dom';

function TopRegizori() {
  const regizoriRanked = useMemo(() => {
    const stats = {};
    const toatePeliculele = [...listaFilme, ...listaSeriale];

    toatePeliculele.forEach((item) => {
      // Gestionăm cazul în care sunt mai mulți regizori separați prin virgulă
      const regizoriArray = item.regizor.split(',').map(r => r.trim());
      
      regizoriArray.forEach((reg) => {
        if (!stats[reg]) {
          // Salvăm și o imagine reprezentativă pentru avatar
          stats[reg] = { nume: reg, count: 0, sumaNote: 0, img: item.img };
        }
        stats[reg].count += 1;
        stats[reg].sumaNote += item.nota;
      });
    });

    return Object.values(stats)
      .map((r) => ({
        ...r,
        media: (r.sumaNote / r.count).toFixed(1),
      }))
      .sort((a, b) => b.media - a.media);
  }, []);

  return (
   <div className="py-10 px-6 md:px-20 max-w-6xl mx-auto">
      {/* Titlu Pagină */}
      <div className="mb-12 border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic"> Top Regizori </h1>
         <p className="text-slate-500 mt-2 font-medium">Cei mai apreciați regizori.</p>
      </div>

      {/* LISTA LEADERBOARD - CHENARE ROTUNJITE */}
      <div className="flex flex-col gap-4">
        {regizoriRanked.map((reg, index) => (
          <Link 
            key={reg.nume}
            to={`/director/${reg.nume}`}
            // FIX: rounded-[32px] pentru colțuri rotunjite perfect
            className="group flex items-center gap-6 bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800 p-4 rounded-2xl transition-all duration-300"
          >
            {/* 1. LOCUL ÎN TOP */}
            <span className="text-4xl font-black text-slate-700 group-hover:text-indigo-500 transition-colors w-12 text-center italic">
              {index + 1}
            </span>

            {/* 2. AVATAR (Imagine Proiect) */}
            <div className="relative w-16 h-20 overflow-hidden rounded-2xl shadow-xl bg-slate-800">
               <img 
                src={reg.img} 
                alt={reg.nume} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
              />
            </div>

            {/* 3. INFO REGIZOR */}
            <div className="grow">
              <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase italic tracking-tight">
                {reg.nume}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  {reg.count} {reg.count === 1 ? 'Proiect regizat' : 'Proiecte regizate'}
                </p>
              </div>
            </div>

            {/* 4. NOTA MEDIE (BADGE DREAPTA) */}
            <div className="flex items-center gap-2 bg-slate-950/80 px-5 py-3 rounded-24px border border-slate-800 group-hover:border-indigo-500/50 transition-colors">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-white font-black text-2xl tracking-tighter">
                {reg.media}
              </span>
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

export default TopRegizori;