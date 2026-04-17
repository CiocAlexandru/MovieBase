import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Resetare parola pentru:", email);
    alert(`Un link de resetare a fost trimis către ${email}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] px-4">
      <div className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-3xl border border-slate-800 w-full max-w-md shadow-2xl relative overflow-hidden">


        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 blur-3xl rounded-full"></div>

        <h2 className="text-3xl font-extrabold text-white mb-2">Recuperare Parolă</h2>
        <p className="text-slate-500 mb-8 text-sm font-medium">Introdu adresa de email pentru a primi instrucțiunile de resetare.</p>

        <form onSubmit={handleReset} className="space-y-6 relative z-10">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email înregistrat</label>
            <input
              type="email" required placeholder="nume@exemplu.com"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 uppercase tracking-widest text-xs">
            Trimite Link
          </button>

          <p className="text-center text-sm">
            <Link to="/login" className="text-slate-500 hover:text-white transition font-bold">
              ← Înapoi la Autentificare
            </Link>
          </p>
        </form>
      </div>
      <footer className="mt-16 pt-8 w-full max-w-md border-t border-slate-800/50 flex flex-col items-center">
        <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest text-center"> © {new Date().getFullYear()} PELICULA MEDIA • Toate Dreputrile Rezervate</div>
      </footer>
    </div>
  );
}

export default ForgotPassword;