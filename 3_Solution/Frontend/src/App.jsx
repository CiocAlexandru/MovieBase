import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import MovieDetails from './pages/MovieDetails';
import TopMovies from './pages/TopMovies';
import Admin from './pages/Admin';
import PopularMovies from './pages/PopularMovies';
import NewReleases from './pages/NewReleases';
import Watchlist from './pages/Watchlist';
import TopActori from './pages/TopActori';
import TopRegizori from './pages/TopRegizori';
import PopularSeries from './pages/PopularSeries';
import TopSeriale from './pages/TopSeriale';
import Suport from './pages/Suport';
import ActorDetails from './pages/ActorDetails';
import DirectorDetails from './pages/DirectorDetails';
import EditProfile from './pages/EditProfile';


function App() {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0f172a] text-white selection:bg-indigo-500/30">

          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <main>
            <Routes>

              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/top" element={<TopMovies />} />
              <Route path="/category/:genre" element={<Home searchTerm={searchTerm} />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/popular" element={<PopularMovies />} />
              <Route path="/new-releases" element={<NewReleases />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/top-actori" element={<TopActori />} />
              <Route path="/top-regizori" element={<TopRegizori />} />
              <Route path="/actor/:actorId" element={<ActorDetails />} />
              <Route path="/director/:directorId" element={<DirectorDetails />} />
              <Route path="/popular-series" element={<PopularSeries />} />
              <Route path="/top-seriale" element={<TopSeriale />} />
              <Route path="/suport" element={<Suport />} />
              <Route path="/edit-profile" element={<EditProfile />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />


              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;