import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './EditProfile.css';

function EditProfile() {
  const { utilizatorCurent, actualizeazaProfil } = useAuth();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    nume: utilizatorCurent?.nume || '',
    email: utilizatorCurent?.email || '',
    parolaNoua: '',
    confirmParola: ''
  });

  const [mesaj, setMesaj] = useState({ tip: '', text: '' });


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


    if (formData.parolaNoua && formData.parolaNoua !== formData.confirmParola) {
      setMesaj({ tip: 'eroare', text: 'Parolele noi nu coincid!' });
      return;
    }


    actualizeazaProfil({
      nume: formData.nume,
      email: formData.email
    });


    setMesaj({ tip: 'succes', text: 'Profilul a fost actualizat în memoria sesiunii!' });


    setFormData(prev => ({ ...prev, parolaNoua: '', confirmParola: '' }));
  };

  if (!utilizatorCurent) return null;

  return (
    <div className="edit-profile">
      <div className="edit-profile__card">


        <div className="edit-profile__glow"></div>

        <h2 className="edit-profile__title" style={{ backgroundImage: 'linear-gradient(to right, #818cf8, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Editează Profil
        </h2>
        <p className="edit-profile__subtitle">Setări Cont Utilizator</p>

        <form onSubmit={handleSubmit} className="edit-profile__form">


          <div>
            <label className="edit-profile__label">Username</label>
            <input
              type="text"
              name="nume"
              value={formData.nume}
              onChange={handleChange}
              placeholder="Numele tău"
              className="edit-profile__input"
              required
            />
          </div>


          <div>
            <label className="edit-profile__label">Adresă Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemplu.com"
              className="edit-profile__input"
              required
            />
          </div>

          <div className="pt-2">
            <hr className="border-slate-800/50" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="edit-profile__label">Parola Nouă (Opțional)</label>
              <input
                type="password"
                name="parolaNoua"
                value={formData.parolaNoua}
                onChange={handleChange}
                placeholder="••••••••"
                className="edit-profile__input"
              />
            </div>
            {formData.parolaNoua && (
              <div>
                <label className="edit-profile__label">Confirmă Parola</label>
                <input
                  type="password"
                  name="confirmParola"
                  value={formData.confirmParola}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="edit-profile__input"
                />
              </div>
            )}
          </div>

          {mesaj.text && (
            <div className={`edit-profile__feedback animate-pulse ${mesaj.tip === 'succes'
                ? 'edit-profile__feedback--success'
                : 'edit-profile__feedback--error'
              }`}>
              <span>{mesaj.tip === 'succes' ? '✅' : '⚠️'}</span>
              {mesaj.text}
            </div>
          )}

          <button
            type="submit"
            className="edit-profile__submit"
          >
            Salvează Modificările
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;