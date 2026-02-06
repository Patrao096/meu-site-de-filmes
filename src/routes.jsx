import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MovieDetail } from './pages/MovieDetail'; 
import { Search } from './pages/Search';
import { Favorites } from './pages/Favorites';
import { Navbar } from './components/Navbar';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        {/* ESSA LINHA ABAIXO É A QUE ESTÁ FALTANDO NO SEU PROJETO: */}
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}