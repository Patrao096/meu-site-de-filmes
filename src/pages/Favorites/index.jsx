import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";

export function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400">Minha Lista</h1>
      
      {favorites.length === 0 ? (
        <p className="text-slate-400">Você ainda não salvou nenhum filme.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="hover:scale-105 transition-transform">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="rounded-lg" alt={movie.title} />
              <h3 className="mt-2 font-bold">{movie.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}