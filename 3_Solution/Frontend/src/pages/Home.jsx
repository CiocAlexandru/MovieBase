import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Am adăugat Link aici
import { listaFilme } from '../data/filme';
import { listaSeriale } from '../data/seriale';
import MovieCard from '../components/MovieCard';

function Home({ searchTerm }) {
  const { genre, actorName, directorName } = useParams();

  // 1. COMBINĂM TOATE DATELE
  const toatePeliculele = [...listaFilme, ...listaSeriale];

  // 2. LOGICĂ PENTRU HERO SLIDER (Top 2 Filme + Top 2 Seriale)
  const heroItems = [
    ...[...listaFilme].sort((a, b) => b.popularitate - a.popularitate).slice(0, 2),
    ...[...listaSeriale].sort((a, b) => b.popularitate - a.popularitate).slice(0, 2)
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Schimbă slide-ul la fiecare 3 secunde
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroItems.length]);

  const heroMovie = heroItems[currentIndex];

  // 3. LOGICĂ DE FILTRARE (Caută în TOATE peliculele)
  const filmeFiltrate = toatePeliculele.filter((item) => {
    const matchesSearch = item.titlu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genre 
      ? item.gen.toLowerCase() === genre.toLowerCase() 
      : true;
    const matchesActor = actorName 
      ? item.actori.some(a => a.toLowerCase() === actorName.toLowerCase()) 
      : true;
    const matchesDirector = directorName 
      ? item.regizor.toLowerCase().includes(directorName.toLowerCase()) 
      : true;

    return matchesSearch && matchesGenre && matchesActor && matchesDirector;
  });

  const isPureHome = !genre && !searchTerm && !actorName && !directorName;

  const getDynamicTitle = () => {
    if (actorName) return `Producții cu ${actorName}`;
    if (directorName) return `Regizate de ${directorName}`;
    if (genre) return genre;
    if (searchTerm) return `Rezultate: "${searchTerm}"`;
    return "Explorează Filme & Seriale";
  };

  return (
    <div className="pb-20">
      {/* --- HERO SECTION DINAMIC --- */}
      {isPureHome && (
        <div key={heroMovie.id} className="relative h-[85vh] w-full mb-16 overflow-hidden transition-all duration-1000 animate-in fade-in">
          {/* Imagine fundal cu efect de zoom lent */}
          <img 
            src={heroMovie.img} 
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover scale-105 opacity-40 animate-pulse-slow"
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-[#0f172a] via-transparent to-transparent"></div>

          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {heroMovie.id > 100 ? "Serialul Momentului" : "Filmul Recomandat"}
              </span>
              <span className="text-yellow-400 font-bold text-sm flex items-center gap-1">
                ⭐ {heroMovie.nota}
              </span>
              <span className="text-orange-500 font-bold text-sm flex items-center gap-1">
                🔥 {heroMovie.popularitate}%
              </span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-8 drop-shadow-2xl transition-all">
              {heroMovie.titlu}
            </h1>
            
            <p className="text-slate-300 text-lg md:text-2xl max-w-2xl mb-10 font-medium leading-relaxed border-l-4 border-indigo-500 pl-6 line-clamp-3">
              {heroMovie.descriere}
            </p>

            <div className="flex flex-wrap gap-5">
              {/* --- BUTONUL MODIFICAT AICI --- */}
              <Link 
                to={`/movie/${heroMovie.id}`} 
                className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl inline-block"
              >
                Urmărește Acum
              </Link>
              
              {/* Bulinuțe de navigare slider */}
              <div className="flex items-center gap-2 ml-4">
                {heroItems.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex ? "w-8 bg-indigo-500" : "w-2 bg-slate-700"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- GRILE DE CONȚINUT --- */}
      <div className={`px-6 md:px-20 ${!isPureHome ? 'pt-32' : ''}`}>
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">
              Catalog Pelicula
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic">
            {getDynamicTitle()}
          </h2>
          
          <p className="text-slate-500 mt-4 font-bold uppercase tracking-widest text-[10px]">
              Am găsit {filmeFiltrate.length} rezultate (Filme & Seriale)
          </p>
        </div>

        {filmeFiltrate.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {filmeFiltrate.map((item) => (
              <MovieCard key={item.id} film={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-900/10 rounded-[60px] border-2 border-dashed border-slate-800/50">
            <span className="text-8xl mb-8 block">🎞️</span>
            <h2 className="text-3xl text-white font-black uppercase tracking-tighter">
              Nicio peliculă găsită
            </h2>
            <p className="text-slate-500 mt-4 max-w-md mx-auto">
              Nu am găsit niciun film sau serial care să corespundă criteriilor tale.
            </p>
          </div>
        )}
      </div>
      <footer className="mt-32 pt-12 border-t border-slate-800/50 flex flex-col items-center">
          <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest"> © {new Date().getFullYear()} PELICULA MEDIA • Toate Drepturile Rezervate</div>
      </footer>
    </div>
  );
}

export default Home;