// src/pages/Vendors.jsx
import React from 'react';

const Vendors = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
          placeholder="Search bar ...... search by name, gst number, category..." 
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67]"
        />

        {/* Filter Tabs */}
        <div className="flex space-x-2 border-b border-gray-200 pb-2">
          <button className="px-4 py-1 text-sm border border-[#714B67] text-[#714B67] rounded-full bg-[#714B67]/5 font-medium">All (28)</button>
          <button className="px-4 py-1 text-sm border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50">Active (21)</button>
          <button className="px-4 py-1 text-sm border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50">Pending (4)</button>
          <button className="px-4 py-1 text-sm border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50">Blocked (3)</button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Vendor Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">GST no.</th>
                <th className="px-4 py-3 font-medium">Contact no.</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4">Infra Supplies Pvt Ltd</td>
                <td className="px-4 py-4">Constructions</td>
                <td className="px-4 py-4">27AABCS1429B2Z0</td>
                <td className="px-4 py-4">XYZ Number</td>
                <td className="px-4 py-4"><span className="text-green-600 font-medium">Active</span></td>
                <td className="px-4 py-4 text-center">
                  <button className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100">View</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4">Tech Core LTD</td>
                <td className="px-4 py-4">IT</td>
                <td className="px-4 py-4">27AABCS1429B2Z0</td>
                <td className="px-4 py-4">XYZ Number</td>
                <td className="px-4 py-4"><span className="text-green-600 font-medium">Active</span></td>
                <td className="px-4 py-4 text-center">
                  <button className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100">View</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 text-gray-400">FastLog Transport</td>
                <td className="px-4 py-4 text-gray-400">Logistics</td>
                <td className="px-4 py-4 text-gray-400">27AABCS1429B2Z0</td>
                <td className="px-4 py-4 text-gray-400">XYZ Number</td>
                <td className="px-4 py-4"><span className="text-red-500 font-medium">Blocked</span></td>
                <td className="px-4 py-4 text-center">
                  <button className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendors;