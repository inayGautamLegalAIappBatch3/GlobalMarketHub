import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🌍 GlobalMarketHub Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.firstName}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Your Account</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Name</p>
              <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Account Type</p>
              <p className="font-semibold capitalize">{user?.userType}</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/products" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-2">🛍️</div>
            <h3 className="font-bold text-lg">Browse Products</h3>
            <p className="text-gray-600 text-sm">Shop from trusted vendors</p>
          </a>
          <a href="/services" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-2">💼</div>
            <h3 className="font-bold text-lg">Professional Services</h3>
            <p className="text-gray-600 text-sm">Find verified professionals</p>
          </a>
          <a href="/import-export" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-2">🌐</div>
            <h3 className="font-bold text-lg">B2B Trading</h3>
            <p className="text-gray-600 text-sm">Import/Export marketplace</p>
          </a>
        </div>

        {/* Actions Based on User Type */}
        {user?.userType === 'vendor' && (
          <div className="mt-8 bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-xl font-bold mb-4">Vendor Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">View Analytics</button>
            </div>
          </div>
        )}

        {user?.userType === 'professional' && (
          <div className="mt-8 bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
            <h3 className="text-xl font-bold mb-4">Professional Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Manage Bookings</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">View Earnings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
