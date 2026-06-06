// src/pages/RFQs.jsx
import React from 'react';

const RFQs = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#212529]">Create RFQ's</h2>
        <p className="text-gray-500 mt-1">new request for quotation</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between w-full max-w-2xl mb-8">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#017E84] text-white font-bold text-sm">1</div>
        <div className="flex-1 h-px bg-gray-300 mx-4"></div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 text-gray-400 font-bold text-sm">2</div>
        <div className="flex-1 h-px bg-gray-300 mx-4"></div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 text-gray-400 font-bold text-sm">3</div>
      </div>

      <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Form Details */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RFQ's title*</label>
            <input type="text" defaultValue="Office Furniture procurement Q2" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-[#714B67] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input type="text" defaultValue="Furniture" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-[#714B67] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline*</label>
            <input type="date" defaultValue="2025-06-15" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-[#714B67] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows="3" defaultValue="Ergonomic chairs and standing desks for 3rd floor" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-[#714B67] focus:outline-none"></textarea>
          </div>
        </div>

        {/* Right Column: Line Items, Assignments & Attachments */}
        <div className="space-y-6">
          
          {/* Line Items Table */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Line items</label>
            <table className="w-full text-sm text-left border border-gray-200 rounded">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 font-medium">Item</th>
                  <th className="px-4 py-2 font-medium">Qty</th>
                  <th className="px-4 py-2 font-medium">Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-2">Ergonomic chair</td>
                  <td className="px-4 py-2">25</td>
                  <td className="px-4 py-2">NOS</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Standing desks</td>
                  <td className="px-4 py-2">10</td>
                  <td className="px-4 py-2">NOS</td>
                </tr>
              </tbody>
            </table>
            <button className="mt-2 text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">+ add line item</button>
          </div>

          {/* Assign Vendors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 border-t border-gray-200 pt-4 uppercase tracking-wider">Assign Vendors</label>
            <div className="border border-gray-300 rounded p-2 space-y-2">
              <div className="flex justify-between items-center bg-gray-50 px-3 py-1 rounded text-sm">
                <span>Infra Supplies Pvt ltd</span>
                <button className="text-gray-400 hover:text-red-500">×</button>
              </div>
              <div className="flex justify-between items-center bg-gray-50 px-3 py-1 rounded text-sm">
                <span>Techcore LTD</span>
                <button className="text-gray-400 hover:text-red-500">×</button>
              </div>
              <button className="text-sm text-[#017E84] px-2 py-1 hover:underline">+ add vendor</button>
            </div>
          </div>

          {/* Attachments (Drag & Drop) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 border-t border-gray-200 pt-4 uppercase tracking-wider">Attachments</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[#714B67] transition-colors bg-white">
              {/* Optional SVG Icon to make it look professional */}
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm text-gray-500 font-medium">Drag & drop files or click to upload</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex space-x-4 border-t border-gray-200 pt-6">
        <button className="bg-[#017E84] text-white px-6 py-2 rounded font-medium hover:bg-[#01686d] transition-colors">Save & Send to Vendors</button>
        <button className="border border-gray-300 bg-white px-6 py-2 rounded hover:bg-gray-50 transition-colors">Save as Draft</button>
      </div>
    </div>
  );
};

export default RFQs;