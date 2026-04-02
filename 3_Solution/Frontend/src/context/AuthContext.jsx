import { useState } from 'react';
import { AuthContext } from './useAuth';

const UTILIZATORI_HARDCODATI = [
  { id: 1, nume: "Admin Principal", email: "admin@pelicula.ro", parola: "admin123", rol: "Administrator" },
  { id: 2, nume: "Ion Popescu", email: "user@pelicula.ro", parola: "user123", rol: "User" },
];



export function AuthProvider({ children }) {
  const [utilizatorCurent, setUtilizatorCurent] = useState(null);
  const [eroare, setEroare] = useState('');


  const actualizeazaProfil = (dateNoi) => {
    if (utilizatorCurent) {
      setUtilizatorCurent((prev) => ({
        ...prev,
        ...dateNoi, // Aici suprascriem numele și email-ul cu ce vine din formular
      }));
    }
  };

  const login = (email, parola) => {
    const gasit = UTILIZATORI_HARDCODATI.find(
      (u) => u.email === email && u.parola === parola
    );
    if (gasit) {
      const { parola: _, ...userFaraParola } = gasit;
      setUtilizatorCurent(userFaraParola);
      setEroare('');
      return true;
    } else {
      setEroare('Email sau parolă incorecte.');
      return false;
    }
  };

  const logout = () => {
    setUtilizatorCurent(null);
    setEroare('');
  };

  return (
    <AuthContext.Provider value={{ utilizatorCurent, login, logout,actualizeazaProfil, eroare, setEroare }}>
      {children}
    </AuthContext.Provider>
  );
}