import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">🌍 GlobalMarketHub</div>
          <div className="flex gap-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to GlobalMarketHub</h1>
          <p className="text-xl mb-8">The world's most trusted multi-marketplace for products, services, and B2B trade</p>
          <div className="flex gap-4 justify-center">
            <Link to="/products" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100">
              Shop Products
            </Link>
            <Link to="/services" className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-blue-600">
              Find Services
            </Link>
            <Link to="/import-export" className="border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-blue-600">
              B2B Trading
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose GlobalMarketHub?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '🛍️', title: 'E-Commerce', desc: 'Buy and sell physical products from trusted vendors' },
            { icon: '💼', title: 'Professional Services', desc: 'Connect with verified doctors, lawyers, and experts' },
            { icon: '🌐', title: 'B2B Trading', desc: 'Import/Export with wholesale suppliers worldwide' },
            { icon: '🔒', title: 'Secure Payments', desc: 'PCI-DSS compliant with escrow protection' },
            { icon: '⭐', title: 'Verified Users', desc: 'All professionals and sellers are verified' },
            { icon: '🚀', title: 'Fast Growth', desc: 'Expand your business globally' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">50+</div>
            <p>Countries</p>
          </div>
          <div>
            <div className="text-4xl font-bold">100K+</div>
            <p>Sellers</p>
          </div>
          <div>
            <div className="text-4xl font-bold">1M+</div>
            <p>Products</p>
          </div>
          <div>
            <div className="text-4xl font-bold">5M+</div>
            <p>Users</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 GlobalMarketHub. All rights reserved.</p>
          <p className="text-gray-400 mt-2">The future of global commerce is here 🚀</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
