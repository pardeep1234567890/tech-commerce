import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartModal from './components/CartModal';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Header />
      <CartModal />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App
