import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function MovieCard({ film }) {
  const navigate = useNavigate();
  
  // 1. Verificare Login
  const isLoggedIn = !!localStorage.getItem('userToken');

  // 2. Inițializare stare Favorite (Inimă)
  const [isFavorite, setIsFavorite] = useState(() => {
    if (!isLoggedIn) return false; 
    const favs = JSON.parse(localStorage.getItem('watchlist')) || [];
    return favs.some(f => f.id === film.id);
  });

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      alert("⚠️ Trebuie să te autentifici pentru a folosi Watchlist-ul!");
      navigate('/login');
      return;
    }

    let favs = JSON.parse(localStorage.getItem('watchlist')) || [];
    let newStatus;

    if (isFavorite) {
      favs = favs.filter(f => f.id !== film.id);
      newStatus = false;
    } else {
      favs.push(film);
      newStatus = true;
    }
    
    localStorage.setItem('watchlist', JSON.stringify(favs));
    setIsFavorite(newStatus);
  };

  const showFullHeart = isLoggedIn && isFavorite;

  return (
    <div className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 shadow-2xl relative">
      
      {/* BADGE NOTĂ (Top Stânga) */}
      <div className="absolute top-4 left-4 z-10 bg-slate-950/60 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-700 text-[10px] font-black text-yellow-400 flex items-center gap-1">
        ⭐ {film.nota}
      </div>

      {/* BUTON INIMĂ (Top Dreapta) */}
      <button 
        onClick={toggleFavorite}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
          showFullHeart 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' 
            : 'bg-slate-950/40 text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
      >
        {showFullHeart ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        )}
      </button>

      {/* POZA FILM + GRADIENT */}
      <div className="relative aspect-2/3 overflow-hidden bg-slate-800 flex items-center justify-center">
       <img 
          src={film.img} 
          alt={film.titlu} 
          referrerPolicy="no-referrer" // <--- FOARTE IMPORTANT
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          onError={(e) => {
          e.target.onerror = null; 
          e.target.src = "https://via.placeholder.com/500x750/1e293b/ffffff?text=Fara+Poster";
          }}
        />
        {/* Overlay gradient pentru a face textul alb să se vadă perfect pe orice poză */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
        
        {/* FLACĂRA DE POPULARITATE (Jos Stânga pe poză) */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            🔥 {film.popularitate}% Popular
          </span>
        </div>
      </div>

      {/* TEXT ȘI BUTON DETALII */}
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
              {film.titlu}
            </h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">
              {film.an} • {film.gen}
            </p>
          </div>
        </div>
        
        <Link 
          to={`/movie/${film.id}`} 
          className="block w-full bg-indigo-600 hover:bg-indigo-500 text-white text-center font-black py-4 rounded-2xl transition-all text-[11px] uppercase tracking-widest shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          Vezi Detalii
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;