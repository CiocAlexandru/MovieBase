import { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../context/useAuth';

function Watchlist() {
  // 1. Verificăm dacă utilizatorul este logat
  const { utilizatorCurent } = useAuth();
  const isLoggedIn = !!utilizatorCurent;

  // 2. Inițializăm lista de filme "leneș" (Lazy Init)
  // Dacă e guest, lista e goală. Dacă e user, citim din memoria browserului.
  const [movies] = useState(() => {
    if (!isLoggedIn) return [];
    const savedMovies = JSON.parse(localStorage.getItem('watchlist')) || [];
    return savedMovies;
  });

  // --- ECRAN PENTRU GUEST (Dacă nu ești logat) ---
  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-[75vh] px-4">
        <div className="bg-slate-900/50 backdrop-blur-xl p-12 rounded-[40px] border border-slate-800 w-full max-w-md shadow-2xl text-center relative overflow-hidden">
          {/* Efect de lumină indigo în spate */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full"></div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-slate-950 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <span className="text-5xl">🔒</span>
            </div>
            
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
              Acces Restricționat
            </h2>
            
            <p className="text-slate-400 mb-10 leading-relaxed font-medium">
              Vrei să ai propria listă de favorite? <br /> 
              <span className="text-indigo-400">Conectează-te</span> pentru a salva filmele pe care vrei să le vezi mai târziu.
            </p>
            
            <div className="flex flex-col gap-4">
              <Link 
                to="/login" 
                className="bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-xs active:scale-95"
              >
                Log In
              </Link>
              <Link to="/register" className="text-slate-500 hover:text-white transition font-bold text-sm">
                Nu ai cont? Înscrie-te aici
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- ECRAN PENTRU USER (Dacă ești logat) ---
  return (
    <div className="py-12 px-6 md:px-10 max-w-1920px mx-auto min-h-screen">
      {/* Header Pagina */}
      <div className="flex items-center gap-5 mb-12">
        <div className="h-12 w-2 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)]"></div>
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Lista Mea</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Ai {movies.length} filme salvate în colecție.</p>
        </div>
      </div>
      
      {movies.length > 0 ? (
        /* Grila de filme favorite */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map((film) => (
            <MovieCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        /* Mesaj dacă lista e goală */
        <div className="text-center py-32 border-2 border-dashed border-slate-800 rounded-[50px] bg-slate-900/10">
          <div className="text-7xl mb-6 opacity-30">🎬</div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Watchlist-ul tău este gol</h2>
          <p className="text-slate-500 mt-3 mb-12 max-w-xs mx-auto text-sm leading-relaxed">
            Se pare că nu ai adăugat nimic încă. Explorează baza noastră de date și apasă pe inimioară!
          </p>
          <Link 
            to="/" 
            className="bg-slate-800 text-white px-12 py-4 rounded-full font-black hover:bg-indigo-600 transition-all shadow-2xl uppercase tracking-widest text-xs border border-slate-700 hover:border-indigo-500"
          >
            Începe Explorarea
          </Link>
        </div>
      )}
      <footer className="mt-32 pt-12 border-t border-slate-800/50 flex flex-col items-center">
        <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest"> © {new Date().getFullYear()} PELICULA MEDIA • Toate Dreputrile Rezervate</div>
      </footer>
    </div>
  );
}

export default Watchlist;