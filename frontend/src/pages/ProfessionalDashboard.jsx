import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfessionalDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: 0,
    duration: 60
  });

  useEffect(() => {
    fetchProfessionalData();
  }, []);

  const fetchProfessionalData = async () => {
    try {
      const token = localStorage.getItem('token');
      const bookingsRes = await axios.get('http://localhost:5000/api/professionals/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookingsRes.data.data || []);

      const earningsRes = await axios.get('http://localhost:5000/api/professionals/earnings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEarnings(earningsRes.data.data?.total || 0);
      setTotalHours(earningsRes.data.data?.hours || 0);
    } catch (error) {
      console.error('Error fetching professional data:', error);
    }
  };

  const handleAddService = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/services', newService, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewService({ title: '', description: '', price: 0, duration: 60 });
      setShowAddService(false);
      alert('Service added successfully!');
      fetchProfessionalData();
    } catch (error) {
      alert('Error adding service: ' + error.message);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/professionals/bookings/${bookingId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Booking status updated!');
      fetchProfessionalData();
    } catch (error) {
      alert('Error updating booking: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">👨‍⚕️ Professional Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Earnings</p>
            <p className="text-3xl font-bold text-green-600">${earnings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Hours</p>
            <p className="text-3xl font-bold text-purple-600">{totalHours}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Average Rating</p>
            <p className="text-3xl font-bold text-orange-600">⭐ {ratings}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <button
            onClick={() => setShowAddService(!showAddService)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Add New Service
          </button>
        </div>

        {/* Add Service Form */}
        {showAddService && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Create New Service</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Service Title"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Service Description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded h-24"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price per hour"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <button
                onClick={handleAddService}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Create Service
              </button>
            </div>
          </div>
        )}

        {/* Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">📅 Upcoming Bookings</h2>
          </div>
          {bookings.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Client</th>
                  <th className="px-6 py-3 text-left font-semibold">Service</th>
                  <th className="px-6 py-3 text-left font-semibold">Date & Time</th>
                  <th className="px-6 py-3 text-left font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {bookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{booking.clientName}</td>
                    <td className="px-6 py-4">{booking.serviceName}</td>
                    <td className="px-6 py-4">{booking.dateTime}</td>
                    <td className="px-6 py-4 font-bold text-green-600">${booking.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="text-red-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-600">
              No bookings yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
