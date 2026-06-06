// src/pages/Reports.jsx
import React from 'react';

const Reports = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[#212529]">Reports & Analytics</h2>
          <p className="text-gray-500 mt-1">Procurement Insights - May 2025</p>
        </div>
        <div className="flex space-x-3">
          <button className="border border-gray-300 bg-white px-4 py-2 rounded text-sm hover:bg-gray-50">May 2025 ▼</button>
          <button className="border border-gray-300 bg-white px-4 py-2 rounded text-sm hover:bg-gray-50">Export</button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[#017E84]">₹ 4.8 L</span>
          <span className="text-sm text-gray-500 mt-2">Total Spend</span>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-green-600">28</span>
          <span className="text-sm text-gray-500 mt-2">Active Vendors</span>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-orange-500">94%</span>
          <span className="text-sm text-gray-500 mt-2">PO Fulfillment</span>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-red-600">3</span>
          <span className="text-sm text-gray-500 mt-2">Overdue Invoices</span>
        </div>
      </div>

      {/* Main Data Visualizations */}
      <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Spend by Category (Progress Bars) */}
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Spend By Category</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">IT Hardware</span>
                <span>₹4.8L</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#017E84] h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Furniture</span>
                <span>₹3.2L</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Logistics</span>
                <span>₹2.3L</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-400 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Top Vendors Table & Trend Chart */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Top Vendors By Spend</h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2 font-medium">Vendor</th>
                  <th className="py-2 font-medium">Spend (₹)</th>
                  <th className="py-2 font-medium text-center">POs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 text-gray-800">TechCore Ltd</td>
                  <td className="py-3">4,20,000</td>
                  <td className="py-3 text-center">6</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-800">Infra Supplies</td>
                  <td className="py-3">3,10,000</td>
                  <td className="py-3 text-center">4</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Monthly Trend</h3>
            {/* Simple CSS Bar Chart Mockup */}
            <div className="flex items-end space-x-2 h-32 pt-4">
              <div className="w-1/6 bg-blue-200 rounded-t h-1/3"></div>
              <div className="w-1/6 bg-blue-300 rounded-t h-1/2"></div>
              <div className="w-1/6 bg-blue-300 rounded-t h-2/5"></div>
              <div className="w-1/6 bg-blue-400 rounded-t h-3/5"></div>
              <div className="w-1/6 bg-[#017E84] rounded-t h-full"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;