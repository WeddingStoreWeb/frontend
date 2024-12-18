import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Saris', 'Lehengas', 'Jewelry', 'Accessories'];

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="font-serif text-4xl text-center mb-12">Our Collection</h1>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

const products = [
  {
    id: '1',
    name: 'Royal Silk Sari',
    price: 2999,
    category: 'Saris',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    name: 'Pearl Necklace Set',
    price: 1499,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    name: 'Bridal Lehenga',
    price: 3999,
    category: 'Lehengas',
    image: 'https://images.unsplash.com/photo-1594125674956-61a9b49c8ecc?auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    name: 'Designer Clutch',
    price: 599,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1594125674956-61a9b49c8ecc?auto=format&fit=crop&q=80'
  },
  {
    id: '5',
    name: 'Traditional Sari',
    price: 1999,
    category: 'Saris',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80'
  },
  {
    id: '6',
    name: 'Diamond Earrings',
    price: 2499,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80'
  }
];