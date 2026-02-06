import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../../services/api";

export function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPopularMovies().then(setMovies);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400 border-b-2 border-cyan-400 w-fit">
        Tendências
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link 
            to={`/movie/${movie.id}`} 
            key={movie.id}
            className="group bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-cyan-400 transition-all shadow-lg"
          >
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              className="group-hover:opacity-80 transition-opacity"
            />
            <div className="p-4">
              <h3 className="font-bold truncate">{movie.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-400 text-sm font-semibold">⭐ {movie.vote_average.toFixed(1)}</span>
                <span className="text-slate-400 text-xs">{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;