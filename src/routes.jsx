import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MovieDetail } from './pages/MovieDetail';
import { Search } from './pages/Search';
import { Navbar } from './components/Navbar';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Ela aparecerá em todas as páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;