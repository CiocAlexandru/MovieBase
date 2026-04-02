import React, { useState } from 'react';
// Dacă ai lucide-react instalat, poți folosi iconițe mai ușor. 
// Dacă nu, am folosit SVG-uri pentru a fi sigur că funcționează direct.

function Suport() {
  const [formData, setFormData] = useState({ nume: '', email: '', mesaj: '' });
  const [trimis, setTrimis] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mesaj primit:", formData);
    setTrimis(true);
    setTimeout(() => setTrimis(false), 5000);
  };

  const faqs = [
    { q: "Cum pot adăuga un film care lipsește?", a: "Momentan, baza de date este gestionată de echipa noastră. În curând, utilizatorii verificați vor putea propune adăugări noi." },
    { q: "De ce nu pot lăsa recenzii?", a: "Trebuie să fii autentificat. Dacă ai deja cont și nu poți, verifică dacă adresa de email a fost confirmată." },
    { q: "Cum se calculează nota globală?", a: "Nota este o medie aritmetică a tuturor recenziilor lăsate de utilizatorii Pelicula." }
  ];

  const contactInfo = [
    { label: "Telefon", value: "+40 722 123 456", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
    { label: "Email", value: "contact@pelicula.ro", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "Adresă", value: "Strada Cinema Nr. 42, București", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" }
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

      {/* SECȚIUNEA INFO CONTACT (NOUĂ) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {contactInfo.map((info, idx) => (
          <div key={idx} className="bg-slate-900/40 border border-slate-800 p-8 rounded-32px text-center group hover:border-indigo-500 transition-all">
            <div className="bg-indigo-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-500 transition-colors">
              <svg className="w-6 h-6 text-indigo-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={info.icon} />
              </svg>
            </div>
            <h4 className="text-slate-500 uppercase text-[10px] font-black tracking-widest mb-1">{info.label}</h4>
            <p className="text-white font-bold italic">{info.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
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
          <h3 className="text-2xl font-black text-white mb-8 uppercase italic">Trimite-ne un mesaj</h3>
          
          {trimis ? (
            <div className="bg-indigo-500/20 border border-indigo-500/50 p-6 rounded-2xl text-center animate-in zoom-in">
              <span className="text-3xl mb-2 block">✅</span>
              <p className="text-white font-bold">Mesajul a fost trimis cu succes!</p>
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

      {/* HARTA SI SOCIAL MEDIA (NOU) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* MAPA */}
        <div className="lg:col-span-2 h-400px rounded-4xl overflow-hidden border border-slate-800 shadow-2xl">
          <iframe
  title="Locație Academia Tehnică Militară Ferdinand I"
  src="https://www.google.com/maps?q=Academia+Tehnică+Militară+Ferdinand+I+București&z=17&output=embed"
  width="100%"
  height="100%"
  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-4xl h-full flex flex-col justify-center">
          <h3 className="text-xl font-black text-white mb-6 uppercase italic">Urmărește-ne</h3>
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-4 text-slate-400 hover:text-indigo-500 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/20">
                <span className="font-bold">FB</span>
              </div>
              <span className="font-bold uppercase tracking-wider text-sm">Facebook</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-slate-400 hover:text-indigo-500 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/20">
                <span className="font-bold">IG</span>
              </div>
              <span className="font-bold uppercase tracking-wider text-sm">Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-slate-400 hover:text-indigo-500 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/20">
                <span className="font-bold">YT</span>
              </div>
              <span className="font-bold uppercase tracking-wider text-sm">YouTube</span>
            </a>
             <a href="#" className="flex items-center gap-4 text-slate-400 hover:text-indigo-500 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/20">
                <span className="font-bold">TT</span>
              </div>
              <span className="font-bold uppercase tracking-wider text-sm">TikTok</span>
            </a>
          </div>
          <p className="mt-8 text-slate-600 text-[10px] leading-relaxed italic">
            Suntem activi zilnic pe rețelele sociale. Trimite-ne un tag în recenziile tale!
          </p>
        </div>
      </div>

      {/* FOOTER PAGINĂ */}
      <footer className="mt-32 pt-12 border-t border-slate-800/50 flex flex-col items-center">
        <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest"> 
          © {new Date().getFullYear()} PELICULA MEDIA • Toate drepturile rezervate
        </div>
      </footer>
    </div>
  );
}

export default Suport;