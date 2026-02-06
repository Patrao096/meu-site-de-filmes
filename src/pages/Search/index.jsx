import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../../services/api";

export function Search() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  useEffect(() => {
    searchMovies(query).then(setMovies);
  }, [query]);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl mb-8">
        Resultados para: <span className="text-cyan-400 font-bold">"{query}"</span>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="hover:scale-105 transition-transform">
            <img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=Sem+Foto"} 
              className="rounded-lg mb-2"
            />
            <h3 className="font-bold">{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}