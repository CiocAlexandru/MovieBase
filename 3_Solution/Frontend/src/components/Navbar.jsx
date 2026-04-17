import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { listaFilme } from '../data/filme';
import { listaSeriale } from '../data/seriale';
import { listaActori } from '../data/actori';
import { listaRegizori } from '../data/regizori';
import './Navbar.css';

function Navbar({ searchTerm, setSearchTerm }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { utilizatorCurent, logout } = useAuth();

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length >= 2);

    if (value.length > 0 && location.pathname !== '/') {
      navigate('/');
    }
  };

  const term = searchTerm.toLowerCase();
  const toateFilmele = [...listaFilme, ...listaSeriale];
  const rezultateFilme = term.length >= 2 ? toateFilmele.filter(f => f.titlu.toLowerCase().includes(term)).slice(0, 5) : [];
  const rezultateActori = term.length >= 2 ? listaActori.filter(a => a.nume.toLowerCase().includes(term)).slice(0, 5) : [];
  const rezultateRegizori = term.length >= 2 ? listaRegizori.filter(r => r.nume.toLowerCase().includes(term)).slice(0, 5) : [];
  const areRezultate = rezultateFilme.length > 0 || rezultateActori.length > 0 || rezultateRegizori.length > 0;

  const handleResultClick = () => {
    setShowDropdown(false);
    setSearchTerm('');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">

          <Link
            to="/"
            onClick={closeMenu}
            className="navbar__logo"
          >
            PELICULA
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="navbar__menu-btn"
          >
            <span className="navbar__menu-icon">{isMenuOpen ? '✕' : '☰'}</span>
            <span className="navbar__menu-label">Meniu</span>
          </button>

          <div className="navbar__search-wrap" ref={searchRef}>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Caută filme, actori, regizori..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => term.length >= 2 && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="navbar__search-input"
              />
              <span className="navbar__search-icon">🔍</span>
            </div>

            {showDropdown && term.length >= 2 && (
              <div className="navbar__dropdown">

                {!areRezultate && (
                  <div className="navbar__dropdown-empty">
                    Niciun rezultat pentru „{searchTerm}"
                  </div>
                )}

                {rezultateFilme.length > 0 && (
                  <div>
                    <div className="navbar__dropdown-section-title text-indigo-400">🎬 Filme & Seriale</div>
                    {rezultateFilme.map(film => (
                      <Link
                        key={film.id}
                        to={`/movie/${film.id}`}
                        onClick={handleResultClick}
                        className="navbar__dropdown-item"
                      >
                        <img src={film.img} alt={film.titlu} className="navbar__dropdown-poster" />
                        <div className="min-w-0">
                          <p className="navbar__dropdown-name">{film.titlu}</p>
                          <p className="navbar__dropdown-meta">{film.an} • {film.gen}</p>
                        </div>
                        <span className="navbar__dropdown-rating">⭐ {film.nota}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {rezultateActori.length > 0 && (
                  <div className={rezultateFilme.length > 0 ? 'border-t border-slate-800' : ''}>
                    <div className="navbar__dropdown-section-title text-cyan-400">🎭 Actori</div>
                    {rezultateActori.map(actor => (
                      <Link
                        key={actor.id}
                        to={`/actor/${actor.id}`}
                        onClick={handleResultClick}
                        className="navbar__dropdown-item"
                      >
                        <img src={actor.img} alt={actor.nume} className="navbar__dropdown-avatar" />
                        <div className="min-w-0">
                          <p className="navbar__dropdown-name">{actor.nume}</p>
                          <p className="navbar__dropdown-meta">{actor.varsta} ani</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {rezultateRegizori.length > 0 && (
                  <div className={(rezultateFilme.length > 0 || rezultateActori.length > 0) ? 'border-t border-slate-800' : ''}>
                    <div className="navbar__dropdown-section-title text-emerald-400">🎬 Regizori</div>
                    {rezultateRegizori.map(reg => (
                      <Link
                        key={reg.id}
                        to={`/director/${reg.id}`}
                        onClick={handleResultClick}
                        className="navbar__dropdown-item"
                      >
                        <img src={reg.img} alt={reg.nume} className="navbar__dropdown-avatar" />
                        <div className="min-w-0">
                          <p className="navbar__dropdown-name">{reg.nume}</p>
                          <p className="navbar__dropdown-meta">Regizor</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          <div className="navbar__auth">
            {utilizatorCurent ? (
              <>
                <span className="navbar__user-name">
                  {utilizatorCurent.rol === 'Administrator' ? '🛡️' : '👤'} {utilizatorCurent.nume}
                </span>
                <button
                  onClick={handleLogout}
                  className="navbar__btn-logout"
                >
                  Ieșire
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="navbar__btn-login bg-transparent shadow-none hover:bg-slate-800 hidden sm:block">
                  Autentificare
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="navbar__btn-register"
                >
                  Înregistrare
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div
        className={`menu-overlay ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <div className="menu-overlay__container grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 w-full">

          <div className="space-y-6">
            <h4 className="menu-overlay__section-title">Statistici</h4>
            <ul className="space-y-3 font-bold text-white text-lg md:text-xl">
              <li><Link to="/top" onClick={closeMenu} className="menu-overlay__link">🏆 Top Filme</Link></li>
              <li><Link to="/popular" onClick={closeMenu} className="menu-overlay__link">🔥 Filme Populare</Link></li>
              <li><Link to="/top-seriale" onClick={closeMenu} className="menu-overlay__link">📺Top Seriale</Link></li>
              <li><Link to="/popular-series" onClick={closeMenu} className="menu-overlay__link">📈Seriale Populare</Link></li>
              <li><Link to="/new-releases" onClick={closeMenu} className="menu-overlay__link">📅 Lansări Noi</Link></li>
              <li><Link to="/top-actori" onClick={closeMenu} className="menu-overlay__link">🎭Top Actori</Link></li>
              <li><Link to="/top-regizori" onClick={closeMenu} className="menu-overlay__link">🎬Top Regizori</Link></li>
              <li><Link to="/watchlist" onClick={closeMenu} className="menu-overlay__link">❤️ Lista Mea</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="menu-overlay__section-title">Genuri</h4>
            <div className="grid grid-cols-2 gap-3 md:gap-4 text-slate-400 font-medium text-base md:text-lg">
              <Link to="/category/Comedie" onClick={closeMenu} className="menu-overlay__link text-slate-400">Comedie</Link>
              <Link to="/category/Dramă" onClick={closeMenu} className="menu-overlay__link text-slate-400">Dramă</Link>
              <Link to="/category/Acțiune" onClick={closeMenu} className="menu-overlay__link text-slate-400">Acțiune</Link>
              <Link to="/category/Thriller" onClick={closeMenu} className="menu-overlay__link text-slate-400">Thriller</Link>
              <Link to="/category/Documentar" onClick={closeMenu} className="menu-overlay__link text-slate-400">Documentar</Link>
              <Link to="/category/Istoric" onClick={closeMenu} className="menu-overlay__link text-slate-400">Istoric</Link>
              <Link to="/category/Horror" onClick={closeMenu} className="menu-overlay__link text-slate-400">Horror</Link>
              <Link to="/category/Sci-Fi" onClick={closeMenu} className="menu-overlay__link text-slate-400">Sci-Fi</Link>
              <Link to="/category/Romantic" onClick={closeMenu} className="menu-overlay__link text-slate-400">Romantic</Link>
              <Link to="/category/Crimă" onClick={closeMenu} className="menu-overlay__link text-slate-400">Crimă</Link>
              <Link to="/category/Aventură" onClick={closeMenu} className="menu-overlay__link text-slate-400">Aventură</Link>
              <Link to="/category/Biografic" onClick={closeMenu} className="menu-overlay__link text-slate-400">Biografic</Link>

              <Link to="/" onClick={closeMenu} className="menu-overlay__link text-slate-400 italic border-t border-slate-800 pt-2 col-span-2">Toate Genurile</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="menu-overlay__section-title">Acces Utilizator</h4>
            <div className="space-y-6">
              {utilizatorCurent ? (
                <>
                  <p className="text-slate-300 text-lg font-bold">
                    {utilizatorCurent.rol === 'Administrator' ? '🛡️' : '👤'} {utilizatorCurent.nume}
                  </p>
                  <p className="text-slate-500 text-sm -mt-2">{utilizatorCurent.email}</p>
                  <Link to="/edit-profile" onClick={closeMenu} className="block menu-overlay__link text-xl md:text-2xl font-bold italic text-white">
                    Editează Profil
                  </Link>
                  {utilizatorCurent.rol === 'Administrator' && (
                    <Link to="/admin" onClick={closeMenu} className="block menu-overlay__link text-indigo-400 text-xl md:text-2xl font-bold italic">Panou Admin</Link>
                  )}
                  <button onClick={handleLogout} className="block menu-overlay__link text-rose-400 text-xl md:text-2xl font-bold italic">Deconectare</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenu} className="block menu-overlay__link text-white text-xl md:text-2xl font-bold italic">Autentificare</Link>
                  <Link to="/register" onClick={closeMenu} className="block menu-overlay__link text-white text-xl md:text-2xl font-bold italic">Cont Nou</Link>
                </>
              )}

              <div className="pt-6 border-t border-slate-800">
                <p className="menu-overlay__section-title mb-4">Suport</p>
                <Link to="/suport" onClick={closeMenu} className="block menu-overlay__link text-white text-xl md:text-2xl font-bold italic">Ajutor & Contact</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;