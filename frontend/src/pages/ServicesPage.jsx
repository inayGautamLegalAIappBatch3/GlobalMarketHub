import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const serviceTypes = [
    { value: 'doctor', label: '👨‍⚕️ Doctors', icon: '🏥' },
    { value: 'lawyer', label: '👨‍⚖️ Lawyers', icon: '⚖️' },
    { value: 'accountant', label: '📊 Accountants', icon: '📊' },
    { value: 'teacher', label: '👨‍🏫 Teachers', icon: '📚' },
    { value: 'trainer', label: '💪 Trainers', icon: '💪' },
    { value: 'therapist', label: '🧠 Therapists', icon: '🧠' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Professional Services</h1>
          <p className="text-gray-600">Connect with verified professionals</p>
        </div>
      </div>

      {/* Service Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Browse by Professional Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {serviceTypes.map(type => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`p-4 rounded-lg text-center transition ${
                selectedType === type.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <p className="font-semibold text-sm">{type.label}</p>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.length > 0 ? (
              services.map(service => (
                <div key={service.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold text-blue-600">${service.price}/hr</span>
                      <span className="text-sm text-gray-500">⭐ {service.rating}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">No services found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
