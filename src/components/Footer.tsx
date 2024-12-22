import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@elegance.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Wedding Lane, NY 10001</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-4">Newsletter</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100084257240932&mibextid=LQQJ4d" className="text-gray-600 hover:text-rose-600">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-rose-600">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Wedding Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}