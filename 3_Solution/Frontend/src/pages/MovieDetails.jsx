import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { listaFilme } from '../data/filme'; 
import { listaSeriale } from '../data/seriale';
import CommentsSection from '../components/CommentsSection';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  
  // Starea pentru sezonul selectat (implicit Sezonul 1)
  const [activeSeason, setActiveSeason] = useState(1);

  const isLoggedIn = false; 

  const toatePeliculele = [...listaFilme, ...listaSeriale];
  const pelicula = toatePeliculele.find(p => p.id === parseInt(id));

  if (!pelicula) return <div className="h-screen bg-[#020617] flex items-center justify-center text-white font-black italic">404 // Pelicula negăsită</div>;

  const esteSerial = pelicula.id > 100;

  // Funcție pentru a lua trailerul corect (Sezon sau Film)
  const getCurrentTrailer = () => {
    if (esteSerial && pelicula.trailereSezoane) {
      return pelicula.trailereSezoane[activeSeason];
    }
    return pelicula.trailer;
  };

  const handleWatchlistClick = () => {
    if (!isLoggedIn) navigate('/login');
    else alert("Adăugat în watchlist!");
  };

  const handleWatchedClick = () => {
    if (!isLoggedIn) navigate('/login');
    else setIsWatched(!isWatched);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      
      {/* --- MODAL TRAILER DINAMIC --- */}
      {showTrailer && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl" onClick={() => setShowTrailer(false)}></div>
          <div className="relative w-full max-w-6xl aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in">
             <button onClick={() => setShowTrailer(false)} className="absolute top-8 right-8 z-10 bg-white/10 hover:bg-white text-white hover:text-black w-12 h-12 rounded-full backdrop-blur-md transition-all font-black flex items-center justify-center">✕</button>
             <iframe src={`${getCurrentTrailer()}?autoplay=1`} title="Trailer" className="w-full h-full" allow="autoplay" allowFullScreen></iframe>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={pelicula.img} className="w-full h-full object-cover scale-110 blur-3xl opacity-30" alt="bg" />
          <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-[#020617]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center md:items-end gap-12 pb-20">
          <div className="w-64 md:w-80 shrink-0 aspect-2/3 relative">
            <img src={pelicula.img} className="w-full h-full object-cover rounded-32px shadow-2xl border border-white/10" alt={pelicula.titlu} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
               <span className="bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest text-white">
                 {esteSerial ? `${pelicula.nrSezoane} Sezoane` : "Peliculă Film"}
               </span>
               <span className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                 {pelicula.gen}
               </span>
            </div>

            <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
              {pelicula.titlu}
            </h1>

            {/* SELECTOR SEZOANE (Doar pentru seriale) */}
            {esteSerial && (
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                {[...Array(pelicula.nrSezoane)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSeason(i + 1)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${
                      activeSeason === i + 1 
                      ? "bg-white text-black border-white" 
                      : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Sezonul {i + 1}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-8">
              <button 
                onClick={() => setShowTrailer(true)}
                className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-indigo-600 hover:text-white"
              >
                ▶ Vezi Trailer {esteSerial && `S${activeSeason}`}
              </button>

              <div className="flex items-center gap-6">
                <div className="flex flex-col text-yellow-500">
                  <span className="text-2xl font-black italic">★ {pelicula.nota}</span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Scor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 pb-40">
        <div className="lg:col-span-8">
          <h2 className="text-indigo-500 font-black uppercase text-xs tracking-[0.4em] mb-6 flex items-center gap-4">
            Sinopsis <div className="h-px flex-1 bg-white/5"></div>
          </h2>
          <p className="text-2xl md:text-3xl text-slate-300 font-light leading-relaxed mb-20 italic">
            "{pelicula.descriere}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mb-6">Regizat de</h4>
              <Link to={`/regizor/${pelicula.regizor}`} className="text-white text-3xl font-bold hover:font-black transition-all">
                {pelicula.regizor}
              </Link>
            </div>
            <div>
              <h4 className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mb-6">Distribuție</h4>
              <div className="flex flex-col gap-4">
                {pelicula.actori.map(actor => (
                  <Link key={actor} to={`/actor/${actor}`} className="text-white text-xl font-bold hover:font-black transition-all">
                    {actor}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-32">
             <CommentsSection movieId={pelicula.id} />
          </div>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl">
              <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8 border-b border-white/10 pb-4 text-center">Interacțiune</h4>
              
              <div className="flex flex-col gap-4">
                <button onClick={handleWatchlistClick} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2">
                  {!isLoggedIn && <span>🔒</span>}
                  {isLoggedIn ? "Adaugă în watchlist" : "Conectează-te pentru Watchlist"}
                </button>

                <button onClick={handleWatchedClick} className={`w-full py-4 rounded-2xl uppercase tracking-widest text-[10px] font-black transition-all border flex items-center justify-center gap-2 ${isWatched ? "bg-green-500/20 text-green-500 border-green-500/50" : "bg-white/5 text-white border-white/10"}`}>
                  {!isLoggedIn ? (
                    <><span>🔒</span> Conectează-te pentru "Văzut"</>
                  ) : isWatched ? (
                    <><span>✓</span> Văzut</>
                  ) : (
                    <><span>👁</span> Marchează ca văzut</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;