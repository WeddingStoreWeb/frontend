import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Bridal Saree', 'Bridal Lehenga', 'Bridal Frocks', 'Bridesmaid Saree','Party Dresses','Casual Dresses'];

interface Product {
  productID: string;
  name: string;
  baseRentalPrice: number;
  category: string;
  imageUrl?: string;
}

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(results);
  }, [products, selectedCategory, searchQuery]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

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
            aria-label="Search products"
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
              aria-label={`Filter by ${category}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">No products found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.productID}
              id={product.productID}
              name={product.name}
              price={product.baseRentalPrice}
              image={product.imageUrl || 'https://via.placeholder.com/300'}
              category={product.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}
