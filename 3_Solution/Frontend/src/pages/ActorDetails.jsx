import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { listaActori } from '../data/actori';
import { listaFilme } from '../data/filme';
import { listaSeriale } from '../data/seriale';

function ActorDetails() {
  const { actorId } = useParams();

  // Suportăm căutare atât după ID cât și după nume (pentru compatibilitate cu link-urile vechi)
  const actor = listaActori.find(a => a.id === actorId || a.nume === decodeURIComponent(actorId));

  if (!actor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <h2 className="text-3xl font-black text-white italic uppercase">Actor Negăsit</h2>
        <p className="text-slate-500 mt-3">Nu există niciun actor cu acest identificator.</p>
        <Link to="/top-actori" className="mt-6 text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest text-xs">
          ← Înapoi la Top Actori
        </Link>
      </div>
    );
  }

  const filmeActor = listaFilme.filter(f => actor.filmIds.includes(f.id) || f.actori.includes(actor.nume));
  const serialeActor = listaSeriale.filter(s => actor.serialeIds.includes(s.id) || s.actori.includes(actor.nume));
  const toateProiectele = [...filmeActor, ...serialeActor];
  const notaMedie = toateProiectele.length > 0
    ? (toateProiectele.reduce((sum, p) => sum + p.nota, 0) / toateProiectele.length).toFixed(1)
    : 'N/A';

  return (
    <div className="py-10 px-6 md:px-20 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link to="/top-actori" className="text-slate-500 hover:text-indigo-400 transition-colors text-xs font-bold uppercase tracking-widest">
          ← Top Actori
        </Link>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-14 pb-14 border-b border-slate-800">
        {/* Poza actor */}
        <div className="w-full md:w-56 shrink-0">
          <div className="w-full md:w-56 h-72 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <img
              src={actor.img}
              alt={actor.nume}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.nume)}&background=1e293b&color=6366f1&size=400&bold=true&font-size=0.4`;
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">Actor</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none mb-4">
            {actor.nume}
          </h1>

          {/* Stats rapide */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl px-5 py-3 text-center">
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Vârstă</p>
              <p className="text-white font-black text-xl">{actor.varsta} <span className="text-slate-500 text-sm font-medium">ani</span></p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl px-5 py-3 text-center">
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Proiecte</p>
              <p className="text-white font-black text-xl">{toateProiectele.length}</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl px-5 py-3 text-center">
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Notă Medie</p>
              <p className="text-white font-black text-xl">
                <span className="text-yellow-500 mr-1">★</span>{notaMedie}
              </p>
            </div>
          </div>

          {/* Descriere */}
          <p className="text-slate-400 leading-relaxed text-sm max-w-2xl">{actor.descriere}</p>
        </div>
      </div>

      {/* Filme */}
      {filmeActor.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-6 flex items-center gap-3">
            <span className="h-1 w-8 bg-indigo-500 rounded-full inline-block"></span>
            Filme
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filmeActor.map(film => (
              <Link key={film.id} to={`/movie/${film.id}`} className="group">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden border border-slate-800 group-hover:border-indigo-500/50 transition-all duration-300 mb-2 shadow-lg">
                  <img src={film.img} alt={film.titlu} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-white font-bold text-sm leading-tight group-hover:text-indigo-400 transition-colors">{film.titlu}</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  <span className="text-yellow-500">★</span> {film.nota} · {film.an}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Seriale */}
      {serialeActor.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-6 flex items-center gap-3">
            <span className="h-1 w-8 bg-purple-500 rounded-full inline-block"></span>
            Seriale
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {serialeActor.map(serial => (
              <Link key={serial.id} to={`/movie/${serial.id}`} className="group">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden border border-slate-800 group-hover:border-purple-500/50 transition-all duration-300 mb-2 shadow-lg">
                  <img src={serial.img} alt={serial.titlu} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-white font-bold text-sm leading-tight group-hover:text-purple-400 transition-colors">{serial.titlu}</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  <span className="text-yellow-500">★</span> {serial.nota} · {serial.an}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-20 pt-10 border-t border-slate-800/50 flex flex-col items-center">
        <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest">
          © {new Date().getFullYear()} PELICULA MEDIA • Toate Drepturile Rezervate
        </div>
      </footer>
    </div>
  );
}

export default ActorDetails;
