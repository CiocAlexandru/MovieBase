import { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../context/useAuth';
import './Watchlist.css';

function Watchlist() {
  const { utilizatorCurent } = useAuth();
  const isLoggedIn = !!utilizatorCurent;


  const [movies] = useState(() => {
    if (!isLoggedIn) return [];
    const savedMovies = JSON.parse(localStorage.getItem('watchlist')) || [];
    return savedMovies;
  });


  if (!isLoggedIn) {
    return (
      <div className="watchlist-locked">
        <div className="watchlist-locked__card">
          <div className="watchlist-locked__glow"></div>

          <div className="relative z-10">
            <div className="watchlist-locked__icon">
              <span className="text-5xl">🔒</span>
            </div>

            <h2 className="watchlist-locked__title">
              Acces Restricționat
            </h2>

            <p className="watchlist-locked__text">
              Vrei să ai propria listă de favorite? <br />
              <span className="text-indigo-400">Conectează-te</span> pentru a salva filmele pe care vrei să le vezi mai târziu.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                className="watchlist-locked__btn"
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


  return (
    <div className="py-12 px-4 md:px-10 max-w-[1920px] mx-auto min-h-screen">

      <div className="flex items-center gap-5 mb-12">
        <div className="watchlist__accent-bar"></div>
        <div>
          <h1 className="watchlist__title">Lista Mea</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Ai {movies.length} filme salvate în colecție.</p>
        </div>
      </div>

      {movies.length > 0 ? (
        <div className="watchlist__grid">
          {movies.map((film) => (
            <MovieCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <div className="watchlist__empty">
          <div className="watchlist__empty-icon">🎬</div>
          <h2 className="watchlist__empty-title">Watchlist-ul tău este gol</h2>
          <p className="watchlist__empty-text">
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
      <footer className="home-footer">
        <div className="home-footer__text"> © {new Date().getFullYear()} PELICULA MEDIA • Toate Dreputrile Rezervate</div>
      </footer>
    </div>
  );
}

export default Watchlist;