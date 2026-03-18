import React, { useState } from 'react';

function Suport() {
  const [formData, setFormData] = useState({ nume: '', email: '', mesaj: '' });
  const [trimis, setTrimis] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aici va veni logica de trimis mail prin Backend
    console.log("Mesaj primit:", formData);
    setTrimis(true);
    setTimeout(() => setTrimis(false), 5000);
  };

  const faqs = [
    { q: "Cum pot adăuga un film care lipsește?", a: "Momentan, baza de date este gestionată de echipa noastră. În curând, utilizatorii verificați vor putea propune adăugări noi." },
    { q: "De ce nu pot lăsa recenzii?", a: "Trebuie să fii autentificat. Dacă ai deja cont și nu poți, verifică dacă adresa de email a fost confirmată." },
    { q: "Cum se calculează nota globală?", a: "Nota este o medie aritmetică a tuturor recenziilor lăsate de utilizatorii Pelicula." }
  ];

  return (
    <div className="pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto min-h-screen">
      
      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
          Centru de <span className="text-indigo-500">Suport</span>
        </h1>
        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
          Suntem aici să te ajutăm cu orice nelămurire
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* SECȚIUNEA FAQ */}
        <div>
          <h3 className="text-2xl font-black text-white mb-8 uppercase italic flex items-center gap-3">
            <div className="h-6 w-1.5 bg-indigo-500 rounded-full"></div>
            Întrebări Frecvente
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-32px hover:border-indigo-500/30 transition-all">
                <h4 className="text-white font-bold mb-2 italic">Q: {faq.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FORMULAR DE CONTACT */}
        <div className="bg-slate-900/20 border border-slate-800 p-8 md:p-12 rounded-4xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </div>

          <h3 className="text-2xl font-black text-white mb-8 uppercase italic">Trimite-ne un mesaj</h3>
          
          {trimis ? (
            <div className="bg-indigo-500/20 border border-indigo-500/50 p-6 rounded-2xl text-center animate-in zoom-in">
              <span className="text-3xl mb-2 block">✅</span>
              <p className="text-white font-bold">Mesajul a fost trimis cu succes!</p>
              <p className="text-indigo-300 text-xs mt-1">Îți vom răspunde în cel mai scurt timp.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 block ml-2">Nume Complet</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="Ex: Ion Popescu"
                  onChange={(e) => setFormData({...formData, nume: e.target.value})}
                />
              </div>
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 block ml-2">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="ion@exemplu.ro"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 block ml-2">Mesajul tău</label>
                <textarea 
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-all h-32 resize-none"
                  placeholder="Cum te putem ajuta?"
                  onChange={(e) => setFormData({...formData, mesaj: e.target.value})}
                ></textarea>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs transition-all transform active:scale-95 shadow-xl shadow-indigo-600/20">
                Trimite Mesajul
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FOOTER PAGINĂ */}
      <footer className="mt-32 pt-12 border-t border-slate-800/50 flex flex-col items-center">
        <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest"> © {new Date().getFullYear()} PELICULA MEDIA • Suport Oficial</div>
      </footer>
    </div>
  );
}

export default Suport;