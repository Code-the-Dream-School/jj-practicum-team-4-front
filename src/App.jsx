import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './pages/Gallery';
import BestOfArtwork from './pages/BestOfArtwork';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from "./layouts/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
    <Route path="gallery" element={<Gallery />} />
    <Route path="best-of-artwork" element={<BestOfArtwork />} />
    <Route path="about" element={<About />} />
    <Route path="*" element={<NotFound />} />
  </Route>
      </Routes>
    </Router>
  );
}

export default App;
