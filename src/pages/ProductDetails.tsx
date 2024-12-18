import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send email)
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>
        
        <div>
          <h1 className="font-serif text-3xl mb-2">{product.name}</h1>
          <p className="text-2xl text-gray-900 mb-6">${product.price.toLocaleString()}</p>
          
          <div className="prose prose-rose mb-8">
            <h2 className="font-serif text-xl mb-4">Product Details</h2>
            <p>
              This exquisite piece exemplifies the perfect blend of traditional
              craftsmanship and contemporary design. Made with the finest
              materials, it features intricate detailing and superior quality
              that makes it perfect for your special day.
            </p>
            
            <h3 className="font-serif text-lg mt-6 mb-2">Features</h3>
            <ul>
              <li>Premium quality fabric</li>
              <li>Hand-crafted embellishments</li>
              <li>Traditional design elements</li>
              <li>Comfortable fit</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-serif text-xl mb-4">Inquire About This Product</h2>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const products = [
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