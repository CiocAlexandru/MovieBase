import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const [nume, setNume] = useState('');
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [confirmParola, setConfirmParola] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parola !== confirmParola) {
      alert("Parolele nu coincid!");
      return;
    }
    console.log("Înregistrare:", { nume, email, parola });
  };

  return (
    <div className="register">
      <div className="register__card">

        <div className="register__glow-top"></div>
        <div className="register__glow-bottom"></div>

        <h2 className="register__title">Creează Cont</h2>
        <p className="register__subtitle">Alătură-te comunității MovieBase.</p>

        <form onSubmit={handleSubmit} className="register__form">
          <div>
            <label className="register__label">Nume Complet</label>
            <input
              type="text" required placeholder="Ex: Andrei Ionescu"
              className="register__input"
              onChange={(e) => setNume(e.target.value)}
            />
          </div>

          <div>
            <label className="register__label">Adresa Email</label>
            <input
              type="email" required placeholder="nume@exemplu.com"
              className="register__input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="register__label">Parolă</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required placeholder="••••••••"
                className="register__input"
                onChange={(e) => setParola(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="register__password-toggle"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L17.772 17.772m0 0A10.446 10.446 0 0112 19.5c-4.756 0-8.773-3.162-10.065-7.498a10.522 10.522 0 014.293-5.774M6.228 6.228L17.772 17.772" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="register__label">Confirmă Parola</label>
            <input
              type="password" required placeholder="••••••••"
              className={`register__confirm-input ${confirmParola && parola !== confirmParola ? 'border-red-500/50' : 'border-slate-800 focus:border-indigo-500'
                }`}
              onChange={(e) => setConfirmParola(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="register__submit"
          >
            Creează Cont
          </button>
        </form>

        <p className="register__footer">
          Ai deja cont? <Link to="/login" className="register__login-link">Loghează-te</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;