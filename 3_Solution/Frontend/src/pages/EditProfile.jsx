import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function EditProfile() {
  const { utilizatorCurent, actualizeazaProfil } = useAuth();
  const navigate = useNavigate();

  // Inițializăm starea formularului cu datele utilizatorului logat
  const [formData, setFormData] = useState({
    nume: utilizatorCurent?.nume || '',
    email: utilizatorCurent?.email || '',
    parolaNoua: '',
    confirmParola: ''
  });

  const [mesaj, setMesaj] = useState({ tip: '', text: '' });

  // Redirecționăm dacă cineva încearcă să acceseze pagina fără să fie logat
  useEffect(() => {
    if (!utilizatorCurent) {
      navigate('/login');
    }
  }, [utilizatorCurent, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMesaj({ tip: '', text: '' });

    // Validare simplă: Parola nouă trebuie să coincidă (dacă se introduce una)
    if (formData.parolaNoua && formData.parolaNoua !== formData.confirmParola) {
      setMesaj({ tip: 'eroare', text: 'Parolele noi nu coincid!' });
      return;
    }

    // 1. Actualizăm starea globală în Context (pentru Navbar și restul app-ului)
    actualizeazaProfil({
      nume: formData.nume,
      email: formData.email
    });

    // 2. Afișăm mesajul de succes
    setMesaj({ tip: 'succes', text: 'Profilul a fost actualizat în memoria sesiunii!' });

    // 3. Resetăm câmpurile de parolă
    setFormData(prev => ({ ...prev, parolaNoua: '', confirmParola: '' }));
  };

  if (!utilizatorCurent) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Glow effect decorativ în fundal */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full"></div>
        
        <h2 className="text-3xl font-black mb-2 bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tight relative z-10">
          Editează Profil
        </h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8 ml-1">Setări Cont Utilizator</p>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          {/* USERNAME */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Username</label>
            <input
              type="text"
              name="nume"
              value={formData.nume}
              onChange={handleChange}
              placeholder="Numele tău"
              className="w-full bg-slate-950/50 border border-slate-800 text-white py-3 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Adresă Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemplu.com"
              className="w-full bg-slate-950/50 border border-slate-800 text-white py-3 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
              required
            />
          </div>

          <div className="pt-2">
            <hr className="border-slate-800/50" />
          </div>

          {/* PAROLA NOUA */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Parola Nouă (Opțional)</label>
              <input
                type="password"
                name="parolaNoua"
                value={formData.parolaNoua}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-slate-800 text-white py-3 px-4 rounded-xl focus:outline-none focus:border-indigo-500 transition shadow-inner"
              />
            </div>
            {formData.parolaNoua && (
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Confirmă Parola</label>
                <input
                  type="password"
                  name="confirmParola"
                  value={formData.confirmParola}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 text-white py-3 px-4 rounded-xl focus:outline-none focus:border-indigo-500 transition shadow-inner"
                />
              </div>
            )}
          </div>

          {/* MESAJE FEEDBACK */}
          {mesaj.text && (
            <div className={`mt-4 p-4 rounded-xl text-xs font-bold border flex items-center gap-3 animate-pulse ${
              mesaj.tip === 'succes' 
              ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/5 border-rose-500/20 text-rose-400'
            }`}>
              <span>{mesaj.tip === 'succes' ? '✅' : '⚠️'}</span>
              {mesaj.text}
            </div>
          )}

          {/* BUTON SALVARE */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-600/20 uppercase tracking-[0.15em] text-xs mt-4"
          >
            Salvează Modificările
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;