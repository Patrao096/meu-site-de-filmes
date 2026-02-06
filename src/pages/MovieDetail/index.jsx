import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../../services/api";

export function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <div className="text-center mt-20 text-cyan-400 animate-pulse">Carregando...</div>;

  const trailer = movie.videos.results.find(v => v.type === "Trailer");

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-12">
      <Link to="/" className="text-cyan-400 mb-8 inline-block hover:underline">← Voltar</Link>
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        <img 
          className="w-full md:w-80 rounded-2xl shadow-cyan-900/20 shadow-2xl" 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
        />
        
        <div className="flex-1">
          <h1 className="text-5xl font-black mb-2">{movie.title}</h1>
          <p className="text-cyan-400 text-xl mb-6 italic">"{movie.tagline}"</p>
          
          <div className="flex gap-4 mb-8">
            <span className="bg-cyan-600 px-3 py-1 rounded-full text-sm">⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">{movie.runtime} min</span>
          </div>

          <h2 className="text-2xl font-bold mb-3">Sinopse</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">{movie.overview}</p>

          {trailer ? (
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube trailer"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="p-10 bg-slate-800 rounded-xl text-center text-slate-500">Trailer não disponível</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;