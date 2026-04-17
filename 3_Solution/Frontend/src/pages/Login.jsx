import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, eroare, setEroare } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setEroare('');
    const success = login(email, parola);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__glow"></div>

        <h2 className="login__title">Autentificare</h2>
        <p className="login__subtitle">Introdu datele contului tău MovieBase.</p>

        <div className="login__hint-box">
          <p className="login__hint-title">Conturi de test:</p>
          <p>👤 <span className="login__hint-value">user@pelicula.ro</span> / <span className="login__hint-value">user123</span></p>
          <p>🛡️ <span className="login__hint-value">admin@pelicula.ro</span> / <span className="login__hint-value">admin123</span></p>
        </div>
        
        <form onSubmit={handleLogin} className="login__form">
          <div>
            <label className="login__label">Email</label>
            <input 
              type="email" required placeholder="nume@exemplu.com"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="flex justify-between items-center mb-1 ml-1">
              <label className="login__label">Parolă</label>
              <Link to="/forgot-password" size="sm" className="login__forgot-link">
                Ai uitat parola?
              </Link>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required placeholder="••••••••"
                className="login__input"
                value={parola}
                onChange={(e) => setParola(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login__password-toggle"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L17.772 17.772m0 0A10.446 10.446 0 0112 19.5c-4.756 0-8.773-3.162-10.065-7.498a10.522 10.522 0 014.293-5.774M6.228 6.228L17.772 17.772" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )}
              </button>
            </div>
          </div>

          {eroare && (
            <p className="login__error">{eroare}</p>
          )}

          <button type="submit" className="login__submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;