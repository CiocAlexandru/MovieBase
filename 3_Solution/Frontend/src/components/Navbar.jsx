import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Navbar({ searchTerm, setSearchTerm }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { utilizatorCurent, logout } = useAuth();

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  // Închide meniul la click pe orice link
  const closeMenu = () => setIsMenuOpen(false);

  // FUNCȚIA DE CĂUTARE INTELIGENTĂ
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Dacă utilizatorul scrie ceva și NU se află pe pagina Home, 
    // îl redirecționăm automat pe Home pentru a vedea rezultatele.
    if (value.length > 0 && location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <>
      <nav className="bg-[#0f172a]/95 backdrop-blur-md sticky top-0 z-50 py-3 w-full border-b border-slate-800 shadow-xl">
        <div className="max-w-480 mx-auto px-6 md:px-10 flex items-center gap-6">
          
          {/* LOGO */}
          <Link 
            to="/" 
            onClick={closeMenu} 
            className="text-2xl font-black tracking-tighter bg-linear-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent hover:from-indigo-500 hover:to-cyan-400 transition-all duration-500 shrink-0 uppercase transform hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(249,218,40,0.5)]"
          >
            PELICULA
          </Link>

          {/* BUTON MENIU */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="relative z-60 flex items-center gap-2 text-slate-300 font-bold hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all active:scale-95 shrink-0"
          >
            <span className="text-xl">{isMenuOpen ? '✕' : '☰'}</span>
            <span className="hidden md:block text-[10px] uppercase tracking-widest">Meniu</span>
          </button>

          {/* SEARCH BAR CENTRAL */}
          <div className="grow relative flex items-center max-w-4xl mx-auto">
            <input 
              type="text" 
              placeholder="Caută filme..."
              value={searchTerm}
              onChange={handleSearchChange} // FOLOSIM FUNCȚIA NOUĂ AICI
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 py-2 px-4 pr-10 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition text-sm shadow-inner"
            />
            <span className="absolute right-3 text-slate-500">🔍</span>
          </div>

          {/* AUTH LINKS */}
          <div className="flex items-center gap-4 text-sm font-bold shrink-0">
            {utilizatorCurent ? (
              <>
                <span className="hidden sm:block text-slate-400 text-xs">
                  {utilizatorCurent.rol === 'Administrator' ? '🛡️' : '👤'} {utilizatorCurent.nume}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-rose-600/80 text-white px-5 py-2 rounded-full hover:bg-rose-500 transition shadow-lg text-xs font-black uppercase tracking-widest"
                >
                  Ieșire
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="hidden sm:block text-slate-400 hover:text-white transition px-2">
                  Autentificare
                </Link>
                <Link 
                  to="/register" 
                  onClick={closeMenu} 
                  className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
                >
                  Înregistrare
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* OVERLAY MENIU - FULL SCREEN STYLE */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0f172a]/98 backdrop-blur-2xl transition-all duration-500 flex items-center ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="max-w-480 mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-16 w-full">
          
          {/* Secțiune Filme */}
          <div className="space-y-6">
            <h4 className="text-indigo-400 font-black uppercase text- tracking-[0.3em] border-b border-indigo-500/20 pb-2">Statistici</h4>
            <ul className="space-y-4 text-3xl font-bold text-white">
              <li><Link to="/top" onClick={closeMenu} className="hover:text-indigo-400 transition">🏆 Top Filme</Link></li>
              <li><Link to="/popular" onClick={closeMenu} className="hover:text-indigo-400 transition">🔥 Filme Populare</Link></li>
              <li><Link to="/top-seriale" onClick={closeMenu} className="hover:text-indigo-400 transition">📺Top Seriale</Link></li>
              <li><Link to="/popular-series" onClick={closeMenu} className="hover:text-indigo-400 transition">📈Seriale Populare</Link></li>
              <li><Link to="/new-releases" onClick={closeMenu} className="hover:text-indigo-400 transition">📅 Lansări Noi</Link></li>
              <li><Link to="/top-actori" onClick={closeMenu} className="hover:text-indigo-400 transition">🎭Top Actori</Link></li>
              <li><Link to="/top-regizori" onClick={closeMenu} className="hover:text-indigo-400 transition">🎬Top Regizori</Link></li>
              <li><Link to="/watchlist" onClick={closeMenu} className="hover:text-indigo-400 transition">❤️ Lista Mea</Link></li>
            </ul>
          </div>

          {/* Secțiune Genuri */}
          <div className="space-y-6">
            <h4 className="text-indigo-400 font-black uppercase text-m tracking-[0.3em] border-b border-indigo-500/20 pb-2">Genuri</h4>
            <div className="grid grid-cols-2 gap-4 text-slate-400 font-medium text-lg">
              <Link to="/category/Comedie" onClick={closeMenu} className="hover:text-white transition">Comedie</Link>
              <Link to="/category/Dramă" onClick={closeMenu} className="hover:text-white transition">Dramă</Link>
              <Link to="/category/Acțiune" onClick={closeMenu} className="hover:text-white transition">Acțiune</Link>
              <Link to="/category/Thriller" onClick={closeMenu} className="hover:text-white transition">Thriller</Link>
              <Link to="/category/Documentar" onClick={closeMenu} className="hover:text-white transition">Documentar</Link>
              <Link to="/category/Istoric" onClick={closeMenu} className="hover:text-white transition">Istoric</Link>
              <Link to="/category/Horror" onClick={closeMenu} className="hover:text-white transition">Horror</Link>
              <Link to="/category/Sci-Fi" onClick={closeMenu} className="hover:text-white transition">Sci-Fi</Link>
              <Link to="/category/Romantic" onClick={closeMenu} className="hover:text-white transition">Romantic</Link>
              <Link to="/category/Crimă" onClick={closeMenu} className="hover:text-white transition">Crimă</Link>
              <Link to="/category/Aventură" onClick={closeMenu} className="hover:text-white transition">Aventură</Link>
              <Link to="/category/Biografic" onClick={closeMenu} className="hover:text-white transition">Biografic</Link>
              
              <Link to="/" onClick={closeMenu} className="hover:text-white transition italic border-t border-slate-800 pt-2 col-span-2">Toate Genurile</Link>
            </div>
          </div>

          {/* Secțiune Cont */}
          <div className="space-y-6">
            <h4 className="text-indigo-400 font-black uppercase text-m tracking-[0.3em] border-b border-indigo-500/20 pb-2">Acces Utilizator</h4>
            <div className="space-y-6">
              {utilizatorCurent ? (
                <>
                  <p className="text-slate-300 text-lg font-bold">
                    {utilizatorCurent.rol === 'Administrator' ? '🛡️' : '👤'} {utilizatorCurent.nume}
                  </p>
                  <p className="text-slate-500 text-sm -mt-4">{utilizatorCurent.email}</p>
                  {utilizatorCurent.rol === 'Administrator' && (
                    <Link to="/admin" onClick={closeMenu} className="block text-indigo-400 hover:text-indigo-300 transition text-2xl font-bold italic">Panou Admin</Link>
                  )}
                  <button onClick={handleLogout} className="block text-rose-400 hover:text-rose-300 transition text-2xl font-bold italic">Deconectare</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenu} className="block text-white hover:text-indigo-400 transition text-2xl font-bold italic">Autentificare</Link>
                  <Link to="/register" onClick={closeMenu} className="block text-white hover:text-indigo-400 transition text-2xl font-bold italic">Cont Nou</Link>
                </>
              )}
              
              {/* MODIFICARE EFECTUATĂ AICI */}
              <div className="pt-8 border-t border-slate-800">
                <p className="text-indigo-400 font-black uppercase text-m tracking-[0.3em] border-b border-indigo-500/20 pb-2">Suport</p>
                <Link to="/suport" onClick={closeMenu} className="block text-white hover:text-indigo-400 transition text-2xl font-bold italic">Ajutor & Contact</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;