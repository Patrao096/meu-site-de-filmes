/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../../services/api";

export function Search() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("q");

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchMovies(query)
        .then((data) => {
          setMovies(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [query]);

  if (loading) {
    return <div className="text-center mt-20 text-cyan-400 animate-pulse">Buscando filmes...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl mb-8 text-white">
        Resultados para: <span className="text-cyan-400 font-bold italic">"{query}"</span>
      </h2>
      
      {movies.length === 0 ? (
        <p className="text-slate-400">Nenhum filme encontrado para esta pesquisa.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link 
              to={`/movie/${movie.id}`} 
              key={movie.id} 
              className="group bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-cyan-400 transition-all"
            >
              <img 
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                  : "https://via.placeholder.com/500x750?text=Sem+Capa"} 
                alt={movie.title}
                className="w-full h-auto group-hover:opacity-75"
              />
              <div className="p-4 text-white">
                <h3 className="font-bold truncate">{movie.title}</h3>
                <p className="text-yellow-400 text-sm">⭐ {movie.vote_average?.toFixed(1) || "N/A"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}