import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalProfessionals: 0,
    totalRevenue: 0
  });
  const [pendingVendors, setPendingVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const dashResponse = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(dashResponse.data.data);

      const vendorsResponse = await axios.get('http://localhost:5000/api/admin/vendors/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingVendors(vendorsResponse.data.data || []);

      const usersResponse = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(usersResponse.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const approveVendor = async (vendorId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/admin/vendors/${vendorId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Vendor approved!');
      fetchDashboardData();
    } catch (error) {
      alert('Error approving vendor: ' + error.message);
    }
  };

  const suspendUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/users/${userId}/status`, 
        { status: 'suspended' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('User suspended!');
      fetchDashboardData();
    } catch (error) {
      alert('Error suspending user: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">🛡️ Admin Dashboard</h1>
          <p className="text-gray-600">Manage all marketplace activities</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Vendors</p>
            <p className="text-3xl font-bold text-green-600">{stats.totalVendors}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Professionals</p>
            <p className="text-3xl font-bold text-purple-600">{stats.totalProfessionals}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-orange-600">${stats.totalRevenue}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'overview'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'vendors'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ✅ Pending Vendors
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'users'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👥 All Users
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Platform Metrics</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>📈 Total Transactions: {stats.totalRevenue}</li>
                      <li>💰 Platform Commission: 5-15%</li>
                      <li>🔄 Payout Frequency: Weekly</li>
                      <li>⚙️ System Status: Operational</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Recent Actions</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>✅ 12 vendors approved</li>
                      <li>❌ 2 fraudulent accounts suspended</li>
                      <li>📝 5 new complaints filed</li>
                      <li>💬 15 support tickets resolved</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vendors' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Pending Vendor Approvals</h2>
                {pendingVendors.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left">Shop Name</th>
                        <th className="px-6 py-3 text-left">Owner</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Applied</th>
                        <th className="px-6 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {pendingVendors.map(vendor => (
                        <tr key={vendor.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold">{vendor.shopName}</td>
                          <td className="px-6 py-4">{vendor.ownerName}</td>
                          <td className="px-6 py-4">{vendor.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{vendor.appliedDate}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => approveVendor(vendor.id)}
                              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 mr-2"
                            >
                              Approve
                            </button>
                            <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-600">No pending vendors</p>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">All Users</h2>
                {users.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Type</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Joined</th>
                        <th className="px-6 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold">{user.firstName} {user.lastName}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4 capitalize">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {user.userType}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-sm ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.createdAt}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => suspendUser(user.id)}
                              className="text-red-600 hover:underline"
                            >
                              Suspend
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-600">No users found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
