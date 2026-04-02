import { useState } from 'react';
import { listaFilme } from '../data/filme';
import { listaSeriale } from '../data/seriale';

function Admin() {
  const [activeTab, setActiveTab] = useState('utilizatori');

  // ── UTILIZATORI ──────────────────────────────────────────────
  const [utilizatori, setUtilizatori] = useState([
    { id: 1, nume: "Admin Principal", email: "admin@pelicula.ro", rol: "Administrator", status: "Activ" },
    { id: 2, nume: "Ion Popescu",     email: "ion@gmail.com",      rol: "User",          status: "Activ" },
    { id: 3, nume: "Maria Enache",    email: "maria.e@yahoo.com",  rol: "User",          status: "Activ" },
    { id: 4, nume: "Alex Dumitrescu", email: "alex.d@gmail.com",   rol: "Guest",         status: "Suspendat" },
  ]);

  const [editUser, setEditUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const saveUser = () => {
    setUtilizatori(prev => prev.map(u => u.id === editUser.id ? editUser : u));
    setShowUserModal(false);
    setEditUser(null);
  };

  const deleteUser = (id) => {
    if (window.confirm('Ești sigur că vrei să ștergi acest utilizator?'))
      setUtilizatori(prev => prev.filter(u => u.id !== id));
  };

  // ── CONȚINUT ─────────────────────────────────────────────────
  const [filme, setFilme]     = useState([...listaFilme]);
  const [seriale, setSeriale] = useState([...listaSeriale]);
  const [contentTab, setContentTab] = useState('filme');

  const [editContent, setEditContent] = useState(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [isSerial, setIsSerial] = useState(false);

  const openEditContent = (item, serial) => {
    setEditContent({ ...item });
    setIsSerial(serial);
    setShowContentModal(true);
  };

  const saveContent = () => {
    if (isSerial) setSeriale(prev => prev.map(s => s.id === editContent.id ? editContent : s));
    else          setFilme(prev => prev.map(f => f.id === editContent.id ? editContent : f));
    setShowContentModal(false);
    setEditContent(null);
  };

  const deleteContent = (id, serial) => {
    if (!window.confirm('Ești sigur că vrei să ștergi acest element?')) return;
    if (serial) setSeriale(prev => prev.filter(s => s.id !== id));
    else        setFilme(prev => prev.filter(f => f.id !== id));
  };

  // ── STATS ─────────────────────────────────────────────────────
  const stats = [
    { label: "Utilizatori",    value: utilizatori.length,            icon: "👤" },
    { label: "Filme",          value: filme.length,                   icon: "🎬" },
    { label: "Seriale",        value: seriale.length,                 icon: "📺" },
    { label: "Total conținut", value: filme.length + seriale.length,  icon: "🎞️" },
  ];

  return (
    <div className="pt-28 pb-20 px-4 md:px-10 max-w-7xl mx-auto min-h-screen">

      {/* HEADER */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1 w-10 bg-indigo-500 rounded-full" />
          <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">Panou Admin</span>
        </div>
        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Gestionează utilizatorii și conținutul platformei Pelicula</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-3xl font-black text-white">{s.value}</div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* TABS PRINCIPALE */}
      <div className="flex gap-2 mb-8">
        {[
          { key: 'utilizatori', label: '👤 Utilizatori' },
          { key: 'continut',    label: '🎬 Conținut'    },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === t.key
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:border-indigo-500/50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: UTILIZATORI ── */}
      {activeTab === 'utilizatori' && (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-white font-black uppercase text-sm tracking-widest">Management Utilizatori</h2>
            <span className="text-slate-500 text-xs font-bold">{utilizatori.length} conturi</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/40 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <th className="p-4">ID</th>
                <th className="p-4">Utilizator</th>
                <th className="p-4 hidden md:table-cell">Email</th>
                <th className="p-4 text-center">Rol</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="text-slate-400 text-sm divide-y divide-slate-800/50">
              {utilizatori.map(u => (
                <tr key={u.id} className="hover:bg-indigo-500/5 transition-colors group">
                  <td className="p-4 font-mono text-xs text-slate-600">#{u.id}</td>
                  <td className="p-4 font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{u.nume}</td>
                  <td className="p-4 hidden md:table-cell text-slate-500">{u.email}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      u.rol === 'Administrator' ? 'bg-indigo-500/20 text-indigo-400' :
                      u.rol === 'User'          ? 'bg-violet-500/20 text-violet-400' :
                                                  'bg-slate-700/50 text-slate-500'
                    }`}>{u.rol}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      u.status === 'Activ' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>{u.status}</span>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button onClick={() => { setEditUser({ ...u }); setShowUserModal(true); }}
                      className="text-indigo-400 hover:text-indigo-300 font-black text-[10px] uppercase tracking-wide">
                      Editează
                    </button>
                    <button onClick={() => deleteUser(u.id)}
                      className="text-rose-500/60 hover:text-rose-400 font-black text-[10px] uppercase tracking-wide">
                      Șterge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── TAB: CONȚINUT ── */}
      {activeTab === 'continut' && (
        <div>
          <div className="flex gap-2 mb-6">
            {[
              { key: 'filme',   label: `🎬 Filme (${filme.length})`    },
              { key: 'seriale', label: `📺 Seriale (${seriale.length})` },
            ].map(t => (
              <button key={t.key} onClick={() => setContentTab(t.key)}
                className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  contentTab === t.key
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:border-violet-500/50'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
            <div className="p-5 border-b border-slate-800">
              <h2 className="text-white font-black uppercase text-sm tracking-widest">
                {contentTab === 'filme' ? 'Management Filme' : 'Management Seriale'}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-800/40 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <th className="p-4">Poster</th>
                    <th className="p-4">Titlu</th>
                    <th className="p-4 hidden md:table-cell">An</th>
                    <th className="p-4 hidden md:table-cell">Gen</th>
                    <th className="p-4 text-center">Notă</th>
                    <th className="p-4 text-center hidden lg:table-cell">Popularitate</th>
                    <th className="p-4 text-right">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 text-sm divide-y divide-slate-800/50">
                  {(contentTab === 'filme' ? filme : seriale).map(item => (
                    <tr key={item.id} className="hover:bg-violet-500/5 transition-colors group">
                      <td className="p-3">
                        <img src={item.img} alt={item.titlu}
                          className="w-10 h-14 object-cover rounded-lg border border-slate-700" />
                      </td>
                      <td className="p-4 font-bold text-slate-100 group-hover:text-violet-400 transition-colors max-w-[180px] truncate">
                        {item.titlu}
                      </td>
                      <td className="p-4 hidden md:table-cell text-slate-500">{item.an}</td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">
                          {item.gen}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-yellow-400 font-black text-xs">⭐ {item.nota}</span>
                      </td>
                      <td className="p-4 text-center hidden lg:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.popularitate}%` }} />
                          </div>
                          <span className="text-slate-500 text-[10px] font-bold">{item.popularitate}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button onClick={() => openEditContent(item, contentTab === 'seriale')}
                          className="text-violet-400 hover:text-violet-300 font-black text-[10px] uppercase tracking-wide">
                          Editează
                        </button>
                        <button onClick={() => deleteContent(item.id, contentTab === 'seriale')}
                          className="text-rose-500/60 hover:text-rose-400 font-black text-[10px] uppercase tracking-wide">
                          Șterge
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL EDITARE UTILIZATOR ── */}
      {showUserModal && editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">Editează Utilizator</h3>
            <div className="space-y-4">
              {[
                { label: 'Nume',  key: 'nume',  type: 'text'  },
                { label: 'Email', key: 'email', type: 'email' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">{f.label}</label>
                  <input type={f.type}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none"
                    value={editUser[f.key]}
                    onChange={e => setEditUser({ ...editUser, [f.key]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">Rol</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none"
                  value={editUser.rol} onChange={e => setEditUser({ ...editUser, rol: e.target.value })}>
                  <option>Administrator</option><option>User</option><option>Guest</option>
                </select>
              </div>
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">Status</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none"
                  value={editUser.status} onChange={e => setEditUser({ ...editUser, status: e.target.value })}>
                  <option>Activ</option><option>Suspendat</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={saveUser}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3 rounded-xl uppercase tracking-widest text-xs transition-all">
                Salvează
              </button>
              <button onClick={() => { setShowUserModal(false); setEditUser(null); }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black py-3 rounded-xl uppercase tracking-widest text-xs transition-all">
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL EDITARE CONȚINUT ── */}
      {showContentModal && editContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">
              Editează {isSerial ? 'Serial' : 'Film'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">Titlu</label>
                <input className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none"
                  value={editContent.titlu} onChange={e => setEditContent({ ...editContent, titlu: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">An</label>
                  <input type="number" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none"
                    value={editContent.an} onChange={e => setEditContent({ ...editContent, an: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">Notă (0-10)</label>
                  <input type="number" min="0" max="10" step="0.1" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none"
                    value={editContent.nota} onChange={e => setEditContent({ ...editContent, nota: Number(e.target.value) })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">Gen</label>
                  <input className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none"
                    value={editContent.gen} onChange={e => setEditContent({ ...editContent, gen: e.target.value })} />
                </div>
                <div>
                  <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">Popularitate (%)</label>
                  <input type="number" min="0" max="100" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none"
                    value={editContent.popularitate} onChange={e => setEditContent({ ...editContent, popularitate: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">Regizor</label>
                <input className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none"
                  value={editContent.regizor} onChange={e => setEditContent({ ...editContent, regizor: e.target.value })} />
              </div>
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">Descriere</label>
                <textarea rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none resize-none"
                  value={editContent.descriere} onChange={e => setEditContent({ ...editContent, descriere: e.target.value })} />
              </div>
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">URL Poster</label>
                <input className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none text-xs"
                  value={editContent.img} onChange={e => setEditContent({ ...editContent, img: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={saveContent}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-black py-3 rounded-xl uppercase tracking-widest text-xs transition-all">
                Salvează
              </button>
              <button onClick={() => { setShowContentModal(false); setEditContent(null); }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black py-3 rounded-xl uppercase tracking-widest text-xs transition-all">
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-20 pt-10 border-t border-slate-800/50 flex flex-col items-center">
        <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest">
          © {new Date().getFullYear()} PELICULA MEDIA • Toate Drepturile Rezervate
        </div>
      </footer>
    </div>
  );
}

export default Admin;