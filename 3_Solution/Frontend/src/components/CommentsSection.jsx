import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './CommentsSection.css';

function CommentsSection({ movieId }) {

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


    console.log(`Comentariu salvat pentru pelicula ${movieId}`);
  };

  return (
    <div className="comments">
      <h3 className="comments__title">
        Recenzii și <span className="comments__title-accent">Comentarii</span>
      </h3>

      {isLoggedIn ? (
        <div className="comments__form-wrap">
          <div className="flex flex-col mb-6">
            <p className="comments__rating-label">
              Nota ta: <span className="comments__rating-value">{rating || hover || 0} / 5</span>
            </p>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    key={starValue}
                    type="button"
                    className={`text-4xl transition-all transform ${starValue <= (hover || rating) ? "text-yellow-500 scale-110" : "text-slate-700"
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
            className="comments__textarea"
            placeholder="Ce părere ai despre această peliculă?..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>

          <button
            onClick={handlePostComment}
            className="comments__submit-btn"
          >
            Postează Recenzia
          </button>
        </div>
      ) : (
        <div className="comments__locked">
          <div className="comments__locked-icon">🔒</div>
          <h4 className="comments__locked-title">Vrei să lași o recenzie?</h4>
          <p className="comments__locked-text">
            Doar membrii comunității **PELICULA** pot acorda stele și scrie comentarii.
          </p>
          <Link
            to="/login"
            className="comments__locked-btn"
          >
            Autentifică-te pentru a debloca
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="comments__item">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="comments__avatar">
                  {c.user[0]}
                </div>
                <div>
                  <h4 className="comments__author">{c.user}</h4>
                  <p className="comments__date">{c.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < c.rating ? "text-yellow-500" : "text-slate-800"}`}>★</span>
                ))}
              </div>
            </div>
            <p className="comments__text">"{c.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;