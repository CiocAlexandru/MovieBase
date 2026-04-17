import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listaFilme } from '../data/filme';
import { listaSeriale } from '../data/seriale';
import MovieCard from '../components/MovieCard';
import './Home.css';

function Home({ searchTerm }) {
  const { genre, actorName, directorName } = useParams();


  const toatePeliculele = [...listaFilme, ...listaSeriale];


  const heroItems = [
    ...[...listaFilme].sort((a, b) => b.popularitate - a.popularitate),
    ...[...listaSeriale].sort((a, b) => b.popularitate - a.popularitate)
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroItems.length]);

  const heroMovie = heroItems[currentIndex];


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

      {isPureHome && (
        <div key={heroMovie.id} className="hero">

          {/* Fundalul dublat blurat pt acoperirea matematică a container-ului gol */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 blur-3xl scale-110"
            style={{ backgroundImage: `url(${heroMovie.img})` }}
          />

          <img
            src={heroMovie.img}
            alt="Hero"
            className="hero__bg-image"
          />

          <div className="hero__overlay-top"></div>
          <div className="hero__overlay-left"></div>

          <div className="hero__content">
            <div className="hero__badges">
              <span className="hero__badge-type">
                {heroMovie.id > 100 ? "Serialul Momentului" : "Filmul Recomandat"}
              </span>
              <span className="hero__badge-rating">
                ⭐ {heroMovie.nota}
              </span>
              <span className="hero__badge-popularity">
                🔥 {heroMovie.popularitate}%
              </span>
            </div>

            <h1 className="hero__title">
              {heroMovie.titlu}
            </h1>

            <p className="hero__description">
              {heroMovie.descriere}
            </p>

            <div className="hero__actions">
              <Link
                to={`/movie/${heroMovie.id}`}
                className="hero__cta-btn"
              >
                Urmărește Acum
              </Link>


              <div className="hero__dots">
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


      <div className={`catalog ${!isPureHome ? 'pt-32' : ''}`}>
        <div className="catalog__header">
          <div className="catalog__accent">
            <div className="catalog__accent-line"></div>
            <span className="catalog__accent-label">
              Catalog Pelicula
            </span>
          </div>

          <h2 className="catalog__title">
            {getDynamicTitle()}
          </h2>

          <p className="catalog__count">
            Am găsit {filmeFiltrate.length} rezultate (Filme & Seriale)
          </p>
        </div>

        {filmeFiltrate.length > 0 ? (
          <div className="catalog__grid">
            {filmeFiltrate.map((item) => (
              <MovieCard key={item.id} film={item} />
            ))}
          </div>
        ) : (
          <div className="catalog__empty">
            <span className="catalog__empty-icon">🎞️</span>
            <h2 className="catalog__empty-title">
              Nicio peliculă găsită
            </h2>
            <p className="catalog__empty-text">
              Nu am găsit niciun film sau serial care să corespundă criteriilor tale.
            </p>
          </div>
        )}
      </div>
      <footer className="home-footer">
        <div className="home-footer__text"> © {new Date().getFullYear()} PELICULA MEDIA • Toate Drepturile Rezervate</div>
      </footer>
    </div>
  );
}

export default Home;