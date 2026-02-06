/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import { useFavorites } from "../../hooks/useFavorites";

export function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento para evitar bugs
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Verificamos se é favorito apenas se o 'movie' já existir
  const favorite = movie ? isFavorite(movie.id) : false;

  function handleFavorite() {
    if (!movie) return;
    favorite ? removeFavorite(movie.id) : addFavorite(movie);
  }

  useEffect(() => {
    setLoading(true);
    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar filme:", err);
        setLoading(false);
      });
  }, [id]);

  // Se estiver carregando, mostra o pulse azul
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-cyan-400 animate-pulse text-2xl font-bold">
          🎬 Carregando detalhes...
        </div>
      </div>
    );
  }

  // Se não encontrar o filme após o carregamento
  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-center flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Filme não encontrado!</h1>
        <Link to="/" className="text-cyan-400 underline">Voltar para a Home</Link>
      </div>
    );
  }

  // Pegamos o trailer com segurança usando Optional Chaining (?.)
  const trailer = movie.videos?.results?.find(v => v.type === "Trailer");

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-12">
      <Link to="/" className="text-cyan-400 mb-8 inline-block hover:underline">
        ← Voltar
      </Link>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:w-80 rounded-2xl shadow-cyan-900/20 shadow-2xl border border-slate-700"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="flex-1">
          <h1 className="text-5xl font-black mb-2 leading-tight">{movie.title}</h1>
          
          {movie.tagline && (
            <p className="text-cyan-400 text-xl mb-6 italic">"{movie.tagline}"</p>
          )}

          <div className="flex gap-4 mb-8">
            <span className="bg-cyan-600 px-3 py-1 rounded-full text-sm font-bold">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">
              {movie.runtime} min
            </span>
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>

          <button
            onClick={handleFavorite}
            className={`mb-10 px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
              favorite 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "bg-cyan-500 hover:bg-cyan-600 text-slate-900"
            }`}
          >
            {favorite ? "❤️ Remover dos Favoritos" : "🤍 Salvar nos Favoritos"}
          </button>

          <h2 className="text-2xl font-bold mb-3 text-cyan-400">Sinopse</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">
            {movie.overview || "Sinopse não disponível em português."}
          </p>

          <h2 className="text-2xl font-bold mb-5 text-cyan-400 text-center md:text-left">Trailer Oficial</h2>
          {trailer ? (
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube trailer"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="p-10 bg-slate-800 rounded-xl text-center text-slate-500 border border-dashed border-slate-600">
              Trailer não disponível para este título.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;