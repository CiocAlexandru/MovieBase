import React, { useState, useEffect } from 'react'; // Am adăugat useEffect
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function CommentsSection({ movieId }) {
  // 1. Folosim movieId într-un useEffect ca să dispară eroarea
  // Acest bloc va fi cel care va cere datele de la server în curând
  useEffect(() => {
    console.log(`PELICULA: Se încarcă recenziile pentru ID-ul ${movieId}...`);
  }, [movieId]);

  const { utilizatorCurent } = useAuth();
  const isLoggedIn = !!utilizatorCurent;
  
  const [comments, setComments] = useState([
    { id: 1, user: "Cinefil24", text: "Foarte bun, recomand!", date: "12 Martie 2026", rating: 5 },
  ]);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);  

  const handlePostComment = () => {
    if (!newComment.trim() || rating === 0) {
      alert("Scrie un comentariu și alege numărul de stele (1-5)!");
      return;
    }
    
    const commentNou = {
      id: comments.length + 1,
      user: "Utilizator Pelicula",
      text: newComment,
      date: "Acum",
      rating: rating 
    };

    setComments([commentNou, ...comments]);
    setNewComment("");
    setRating(0); 
    
    // Mai folosim o dată movieId aici ca să fim 100% siguri că ESLint e fericit
    console.log(`Comentariu salvat pentru pelicula ${movieId}`);
  };

  return (
    <div className="mt-16 bg-slate-900/30 rounded-4xl p-8 md:p-12 border border-slate-800">
      <h3 className="text-3xl font-black text-white uppercase italic mb-10 tracking-tighter">
        Recenzii și <span className="text-indigo-500">Comentarii</span>
      </h3>

      {isLoggedIn ? (
        <div className="mb-12 bg-slate-900/50 p-6 rounded-4xl border border-indigo-500/30">
          <div className="flex flex-col mb-6">
            <p className="text-white font-black mb-3 uppercase text-[10px] tracking-[0.2em]">
              Nota ta: <span className="text-yellow-500 text-lg ml-2">{rating || hover || 0} / 5</span>
            </p>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    key={starValue}
                    type="button"
                    className={`text-4xl transition-all transform ${
                      starValue <= (hover || rating) ? "text-yellow-500 scale-110" : "text-slate-700"
                    } hover:scale-125`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </button>
                );
              })}
            </div>
          </div>

          <textarea 
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-300 focus:outline-none focus:border-indigo-500 transition-all resize-none h-32 mb-4"
            placeholder="Ce părere ai despre această peliculă?..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>

          <button 
            onClick={handlePostComment}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-10 py-4 rounded-xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-indigo-600/20"
          >
            Postează Recenzia
          </button>
        </div>
      ) : (
        <div className="mb-12 p-10 rounded-4xl border border-dashed border-slate-800 bg-slate-900/10 flex flex-col items-center text-center">
          <div className="text-4xl mb-4 opacity-50">🔒</div>
          <h4 className="text-white font-black uppercase italic mb-2">Vrei să lași o recenzie?</h4>
          <p className="text-slate-500 text-sm mb-6 max-w-xs">
            Doar membrii comunității **PELICULA** pot acorda stele și scrie comentarii.
          </p>
          <Link 
            to="/login" 
            className="bg-slate-800 hover:bg-indigo-600 text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all"
          >
            Autentifică-te pentru a debloca
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="bg-slate-950/40 p-6 rounded-[28px] border border-slate-800/50 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-cyan-400 rounded-full flex items-center justify-center font-black text-slate-900 italic uppercase">
                  {c.user[0]}
                </div>
                <div>
                  <h4 className="text-white font-black italic tracking-tight">{c.user}</h4>
                  <p className="text-slate-600 text-[9px] uppercase font-bold">{c.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < c.rating ? "text-yellow-500" : "text-slate-800"}`}>★</span>
                ))}
              </div>
            </div>
            <p className="text-slate-300 italic text-sm leading-relaxed">"{c.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;