import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Product {
  productID: number;
  name: string;
  baseRentalPrice: number;
  description: string;
  imageUrl: string;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/products/latest"
        );
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://i.ytimg.com/vi/v8MQCGzhhg8/maxresdefault.jpg"
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
              Discover our exquisite collection of wedding attire and
              accessories, crafted with love and tradition.
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
          <h2 className="font-serif text-3xl text-center mb-12">
            Featured Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.productID}
                to={`/store/${product.productID}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif text-xl mt-4">{product.name}</h3>
                <p className="text-gray-600">
                  Rs {product.baseRentalPrice.toLocaleString()}
                </p>
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
                experiences through our carefully curated collection of bridal
                wear and accessories. Each piece in our store tells a story of
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
