import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import Gallery from './pages/Gallery';
import Test from './pages/Test';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/:id" element={<ProductDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;