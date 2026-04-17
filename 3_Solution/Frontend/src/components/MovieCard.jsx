import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './MovieCard.css';

function MovieCard({ film }) {
  const navigate = useNavigate();


  const isLoggedIn = !!localStorage.getItem('userToken');


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
    <div className="movie-card group">


      <div className="movie-card__badge">
        ⭐ {film.nota}
      </div>


      <button
        onClick={toggleFavorite}
        className={`movie-card__fav-btn ${showFullHeart
            ? 'movie-card__fav-btn--active'
            : 'movie-card__fav-btn--inactive'
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


      <div className="movie-card__poster-wrap">
        <img
          src={film.img}
          alt={film.titlu}
          referrerPolicy="no-referrer"
          className="movie-card__poster-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/500x750/1e293b/ffffff?text=Fara+Poster";
          }}
        />

        <div className="movie-card__poster-overlay"></div>


        <div className="movie-card__popularity">
          <span className="movie-card__popularity-dot">
            <span className="movie-card__popularity-ping"></span>
            <span className="movie-card__popularity-core"></span>
          </span>
          <span className="movie-card__popularity-text">
            🔥 {film.popularitate}% Popular
          </span>
        </div>
      </div>


      <div className="movie-card__body">
        <div className="movie-card__header">
          <div className="flex-1">
            <h3 className="movie-card__title">
              {film.titlu}
            </h3>
            <p className="movie-card__meta">
              {film.an} • {film.gen}
            </p>
          </div>
        </div>

        <Link
          to={`/movie/${film.id}`}
          className="movie-card__cta"
        >
          Vezi Detalii
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;