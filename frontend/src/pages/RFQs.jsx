// src/pages/RFQs.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RFQs = () => {
  const API_BASE_URL = 'http://localhost:8080/api';

  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '' });
  const [lineItems, setLineItems] = useState([{ item: '', quantity: '', unit: 'NOS' }]);
  
  const [availableVendors, setAvailableVendors] = useState([]);
  const [selectedVendorIds, setSelectedVendorIds] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // --- FETCH VENDORS ON LOAD ---
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const userStr = localStorage.getItem('vendorBridgeUser');
        if (!userStr) return;
        const { token } = JSON.parse(userStr);

        // Assumes you have an endpoint to fetch users by role. 
        // See Step 2 below if you haven't built this yet!
        const response = await axios.get(`${API_BASE_URL}/auth/users/vendors`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setAvailableVendors(response.data);
      } catch (error) {
        console.error("Failed to fetch vendors", error);
      }
    };
    fetchVendors();
  }, []);

  // --- HANDLERS ---
  const handleBasicChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dynamic Line Item Handlers
  const handleLineItemChange = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;
    setLineItems(updatedItems);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { item: '', quantity: '', unit: 'NOS' }]);
  };

  const removeLineItem = (index) => {
    if (lineItems.length === 1) return; // Keep at least one row
    const updatedItems = lineItems.filter((_, i) => i !== index);
    setLineItems(updatedItems);
  };

  // Vendor Selection Handler
  const toggleVendor = (vendorId) => {
    if (selectedVendorIds.includes(vendorId)) {
      setSelectedVendorIds(selectedVendorIds.filter(id => id !== vendorId));
    } else {
      setSelectedVendorIds([...selectedVendorIds, vendorId]);
    }
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const userStr = localStorage.getItem('vendorBridgeUser');
      if (!userStr) throw new Error("Authentication missing. Please log in.");
      const { token } = JSON.parse(userStr);

      // Clean and format payload for Spring Boot
      const payload = {
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline ? `${formData.deadline}T23:59:59` : null,
        lineItems: lineItems.map(li => ({
          item: li.item,
          quantity: parseInt(li.quantity, 10),
          unit: li.unit
        })),
        vendorIds: selectedVendorIds
      };

      await axios.post(`${API_BASE_URL}/rfqs/create`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setMessage({ type: 'success', text: 'RFQ successfully created and assigned!' });
      
      // Reset Form
      setFormData({ title: '', description: '', deadline: '' });
      setLineItems([{ item: '', quantity: '', unit: 'NOS' }]);
      setSelectedVendorIds([]);

    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-semibold text-[#212529]">Create RFQ's</h2>
        <p className="text-gray-500 mt-1">Configure and assign a new request for quotation</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 md:p-8 border border-gray-200 rounded-lg shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* LEFT COLUMN: Basic Details */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">1. Basic Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RFQ Title*</label>
              <input 
                type="text" name="title" value={formData.title} onChange={handleBasicChange} required
                placeholder="e.g., Q3 Laptops Procurement" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67] outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline*</label>
              <input 
                type="date" name="deadline" value={formData.deadline} onChange={handleBasicChange} required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67] outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                rows="4" name="description" value={formData.description} onChange={handleBasicChange}
                placeholder="Detailed requirements or instructions..." 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67] outline-none"
              ></textarea>
            </div>
          </div>

          {/* RIGHT COLUMN: Line Items & Vendors */}
          <div className="space-y-8">
            
            {/* Line Items Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">2. Line Items</h3>
              <div className="border border-gray-200 rounded overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 font-medium">Item Description</th>
                      <th className="px-3 py-2 font-medium w-24">Qty</th>
                      <th className="px-3 py-2 font-medium w-24">Unit</th>
                      <th className="px-3 py-2 font-medium w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((li, index) => (
                      <tr key={index} className="border-b border-gray-100 bg-white">
                        <td className="p-2">
                          <input type="text" required value={li.item} onChange={(e) => handleLineItemChange(index, 'item', e.target.value)} placeholder="Item name..." className="w-full px-2 py-1 border border-gray-300 rounded outline-none focus:border-[#714B67]" />
                        </td>
                        <td className="p-2">
                          <input type="number" required min="1" value={li.quantity} onChange={(e) => handleLineItemChange(index, 'quantity', e.target.value)} className="w-full px-2 py-1 border border-gray-300 rounded outline-none focus:border-[#714B67]" />
                        </td>
                        <td className="p-2">
                          <select value={li.unit} onChange={(e) => handleLineItemChange(index, 'unit', e.target.value)} className="w-full px-2 py-1 border border-gray-300 rounded outline-none focus:border-[#714B67] bg-white">
                            <option value="NOS">NOS</option>
                            <option value="KG">KG</option>
                            <option value="LTR">LTR</option>
                            <option value="BOX">BOX</option>
                          </select>
                        </td>
                        <td className="p-2 text-center">
                          <button type="button" onClick={() => removeLineItem(index)} className="text-red-400 hover:text-red-600 font-bold" title="Remove item">×</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button type="button" onClick={addLineItem} className="mt-3 text-sm text-[#017E84] font-medium hover:underline">+ Add another item</button>
            </div>

            {/* Vendor Selection Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">3. Assign Vendors</h3>
              {availableVendors.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No vendors found in the system.</p>
              ) : (
                <div className="border border-gray-200 rounded p-3 max-h-48 overflow-y-auto space-y-2 bg-gray-50">
                  {availableVendors.map(vendor => (
                    <label key={vendor.id} className="flex items-center p-2 bg-white border border-gray-100 rounded cursor-pointer hover:border-[#714B67] transition-colors">
                      <input 
                        type="checkbox" 
                        checked={selectedVendorIds.includes(vendor.id)}
                        onChange={() => toggleVendor(vendor.id)}
                        className="w-4 h-4 text-[#714B67] rounded focus:ring-[#714B67]"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">{vendor.email}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex space-x-4 mt-6">
          <button type="submit" disabled={loading} className="bg-[#017E84] text-white px-8 py-2.5 rounded font-medium hover:bg-[#01686d] transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? 'Processing...' : 'Publish RFQ'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RFQs;