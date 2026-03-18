function Admin() {
  const utilizatori = [
    { id: 1, nume: "Admin Principal", email: "admin@moviebase.ro", rol: "Administrator" },
    { id: 2, nume: "Ion Popescu", email: "ion@gmail.com", rol: "User" },
    { id: 3, nume: "Maria Enache", email: "maria.e@yahoo.com", rol: "Guest" },
  ];

  return (
    <div className="py-10 px-4">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Management Utilizatori</h2>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Controlul rolurilor și securitatea platformei</p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-300 text-xs font-bold uppercase tracking-widest">
              <th className="p-5">ID</th>
              <th className="p-5">Utilizator</th>
              <th className="p-5">Email</th>
              <th className="p-5 text-center">Rol</th>
              <th className="p-5 text-right">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="text-slate-400 text-sm">
            {utilizatori.map((u) => (
              <tr key={u.id} className="border-t border-slate-800/50 hover:bg-indigo-500/5 transition-colors group">
                <td className="p-5 font-mono text-xs">{u.id}</td>
                <td className="p-5 font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{u.nume}</td>
                <td className="p-5">{u.email}</td>
                <td className="p-5 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    u.rol === 'Administrator' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700/50 text-slate-400'
                  }`}>
                    {u.rol}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <button className="text-indigo-400 hover:text-indigo-300 font-bold text-xs uppercase mr-4 tracking-wide">Editează</button>
                  <button className="text-rose-500/60 hover:text-rose-400 font-bold text-xs uppercase tracking-wide">Șterge</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="mt-32 pt-12 border-t border-slate-800/50 flex flex-col items-center">
        <div className="text-slate-700 text-[9px] font-black uppercase tracking-widest"> © {new Date().getFullYear()} PELICULA MEDIA • Toate Dreputrile Rezervate</div>
      </footer>
    </div>
  );
}

export default Admin;