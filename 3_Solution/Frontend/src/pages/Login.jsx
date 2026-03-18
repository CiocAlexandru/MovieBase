import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login date:", { email, parola });
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-3xl border border-slate-800 w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 blur-3xl rounded-full"></div>

        <h2 className="text-3xl font-extrabold text-white mb-2">Autentificare</h2>
        <p className="text-slate-500 mb-8 text-sm font-medium">Introdu datele contului tău MovieBase.</p>
        
        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
            <input 
              type="email" required placeholder="nume@exemplu.com"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="flex justify-between items-center mb-1 ml-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parolă</label>
              {/* LINK-UL ADAUGAT ÎNAPOI */}
              <Link to="/forgot-password" size="sm" className="text-[10px] text-indigo-400 font-bold hover:text-indigo-300 transition uppercase tracking-tighter">
                Ai uitat parola?
              </Link>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all"
                onChange={(e) => setParola(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L17.772 17.772m0 0A10.446 10.446 0 0112 19.5c-4.756 0-8.773-3.162-10.065-7.498a10.522 10.522 0 014.293-5.774M6.228 6.228L17.772 17.772" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl mt-4 transition-all shadow-lg shadow-indigo-600/20 uppercase tracking-widest text-xs">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;