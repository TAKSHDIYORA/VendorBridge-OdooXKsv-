// src/pages/Vendors.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.BACKEND_API_URL;
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        // Assuming you store your login response token in localStorage
        const token = JSON.parse(localStorage.getItem('vendorBridgeUser'))?.token;
        
        const response = await axios.get(`${API_BASE_URL}/auth/users/vendors`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setVendors(response.data);
        setFilteredVendors(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching vendors:", err);
        setError(err.response?.data || "Failed to load vendors. Please check authentication.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Handle live search and tab updates side-by-side
  useEffect(() => {
    let result = vendors;

    // 1. Apply Tab Filter
    if (activeTab !== 'All') {
      result = result.filter(v => v.status?.toUpperCase() === activeTab.toUpperCase());
    }

    // 2. Apply Search Term Filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(v => 
        v.name?.toLowerCase().includes(term) ||
        v.gstNumber?.toLowerCase().includes(term) || // maps to your user schema fields
        v.category?.toLowerCase().includes(term) ||
        v.email?.toLowerCase().includes(term)
      );
    }

    setFilteredVendors(result);
  }, [searchTerm, activeTab, vendors]);

  // Compute dynamic counts for tabs
  const getCount = (status) => {
    if (status === 'All') return vendors.length;
    return vendors.filter(v => v.status?.toUpperCase() === status.toUpperCase()).length;
  };

  // Status Badge styling helper
  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'text-green-600 bg-green-50 px-2 py-1 rounded font-medium text-xs';
      case 'PENDING':
        return 'text-amber-600 bg-amber-50 px-2 py-1 rounded font-medium text-xs';
      case 'BLOCKED':
        return 'text-red-500 bg-red-50 px-2 py-1 rounded font-medium text-xs';
      default:
        return 'text-gray-500 bg-gray-50 px-2 py-1 rounded font-medium text-xs';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[#212529]">Vendors</h2>
          <p className="text-gray-500 mt-1">Manage supplier profiles and registrations</p>
        </div>
        <button className="bg-[#714B67] text-white px-4 py-2 rounded font-medium hover:bg-[#5a3c52] transition-colors">
          + Add Vendor
        </button>
      </div>

      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm space-y-6">
        {/* Search Bar */}
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, gst number, category..." 
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67]"
        />

        {/* Filter Tabs */}
        <div className="flex space-x-2 border-b border-gray-200 pb-2">
          {['All', 'Active', 'Pending', 'Blocked'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 text-sm border rounded-full transition-all font-medium ${
                  isActive 
                    ? 'border-[#714B67] text-[#714B67] bg-[#714B67]/5' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab} ({getCount(tab)})
              </button>
            );
          })}
        </div>

        {/* Conditional States */}
        {loading && (
          <div className="text-center py-8 text-gray-500 font-medium">Loading vendors list...</div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500 bg-red-50 border border-red-200 rounded p-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">Vendor Name</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">GST no.</th>
                  <th className="px-4 py-3 font-medium">Contact / Email</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                {filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                      No vendors match your current search/filters.
                    </td>
                  </tr>
                ) : (
                  filteredVendors.map((vendor) => (
                    <tr key={vendor.id || vendor.email} className="hover:bg-gray-50">
                      <td className={`px-4 py-4 ${vendor.status?.toUpperCase() === 'BLOCKED' ? 'text-gray-400 line-through' : ''}`}>
                        {vendor.name || 'N/A'}
                      </td>
                      <td className="px-4 py-4">{vendor.category || 'General'}</td>
                      <td className="px-4 py-4 font-mono text-xs">{vendor.gstNumber || 'N/A'}</td>
                      <td className="px-4 py-4">
                        <div className="text-xs text-gray-500">{vendor.phoneNumber || 'No Number'}</div>
                        <div>{vendor.email}</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={getStatusStyle(vendor.status || 'Active')}>
                          {vendor.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;