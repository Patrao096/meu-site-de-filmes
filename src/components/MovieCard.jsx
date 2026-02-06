export function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>Rating: {movie.vote_average.toFixed(1)}</p>
      <button onClick={() => window.location.href = `/movie/${movie.id}`}> Ver Sinopse </button>
    </div>
  );
}