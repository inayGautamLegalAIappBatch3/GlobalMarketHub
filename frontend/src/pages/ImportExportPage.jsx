import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImportExportPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchImportExportProducts();
  }, []);

  const fetchImportExportProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/import-export');
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching import/export products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Import/Export B2B Marketplace</h1>
          <p className="text-gray-600">Connect with suppliers and buyers worldwide</p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <input
          type="text"
          placeholder="Search by product name, HS code, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />

        {/* Products Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Product</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">HS Code</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Unit Price</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Min Order</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Origin</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{product.productName}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{product.hsCode}</td>
                      <td className="px-6 py-4 font-bold text-blue-600">${product.unitPrice} {product.currency}</td>
                      <td className="px-6 py-4 text-gray-600">{product.minimumOrder} units</td>
                      <td className="px-6 py-4 text-gray-600">{product.origin}</td>
                      <td className="px-6 py-4">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
                          Request Quote
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-600">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportExportPage;
