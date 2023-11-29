import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PokemonPage from '../pages/Pokemon';
import Error404 from '../pages/404';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonPage />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;