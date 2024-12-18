import React from 'react';
import { NavLink } from 'react-router-dom';
import { Scroll } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <Scroll className="h-8 w-8 text-rose-600" />
            <span className="text-2xl font-serif text-gray-900">Wedding Store</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {[
              ['Home', '/'],
              ['Store', '/store'],
              ['Gallery', '/gallery'],
            ].map(([name, path]) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `font-serif text-lg ${
                    isActive
                      ? 'text-rose-600'
                      : 'text-gray-600 hover:text-rose-500'
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}