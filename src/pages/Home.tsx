import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80"
            alt="Wedding Backdrop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              Elegance in Every Detail
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our exquisite collection of wedding attire and accessories,
              crafted with love and tradition.
            </p>
            <Link
              to="/store"
              className="inline-flex items-center bg-rose-600 text-white px-8 py-3 rounded-md hover:bg-rose-700 transition-colors"
            >
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-center mb-12">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/store/${product.id}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif text-xl mt-4">{product.name}</h3>
                <p className="text-gray-600">${product.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80"
                alt="Store Interior"
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                For over two decades, we've been crafting unforgettable wedding
                experiences through our carefully curated collection of bridal wear
                and accessories. Each piece in our store tells a story of
                craftsmanship, elegance, and timeless beauty.
              </p>
              <Link
                to="/gallery"
                className="inline-flex items-center text-rose-600 hover:text-rose-700"
              >
                View Our Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const featuredProducts = [
  {
    id: '1',
    name: 'Royal Silk Sari',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    name: 'Pearl Necklace Set',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    name: 'Bridal Lehenga',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1594125674956-61a9b49c8ecc?auto=format&fit=crop&q=80'
  }
];