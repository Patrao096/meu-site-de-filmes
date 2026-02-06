import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-black text-cyan-400 tracking-tighter">
          V-FLIX
        </Link>

        <form onSubmit={handleSubmit} className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Pesquisar filme..."
            className="w-full bg-slate-800 text-white px-4 py-2 rounded-full border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-2 text-slate-400">
            🔍
          </button>
        </form>
      </div>
    </nav>
  );
}