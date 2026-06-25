import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

import Home from './pages/Home';
import Edukasi from './pages/Edukasi';
import Wisata from './pages/Wisata';
import Toko from './pages/Toko';
import Kontak from './pages/Kontak';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-background text-on-surface">
          <Navbar />
          <CartSidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edukasi" element={<Edukasi />} />
              <Route path="/wisata" element={<Wisata />} />
              <Route path="/toko" element={<Toko />} />
              <Route path="/kontak" element={<Kontak />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
