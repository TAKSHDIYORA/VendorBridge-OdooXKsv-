// src/pages/PurchaseOrders.jsx
import React from 'react';

const PurchaseOrders = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Top Header & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#212529]">Purchase Order & Invoice</h2>
          <p className="text-gray-500 mt-1">PO-2025-0068 - auto-generated after approval</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            <span>Download PDF</span>
          </button>
          <button className="flex items-center space-x-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            <span>Print</span>
          </button>
          <button className="flex items-center space-x-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span>Email invoice</span>
          </button>
        </div>
      </div>

      {/* The Document Area */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-10 mt-4 max-w-4xl mx-auto">
        
        {/* Addresses Section */}
        <div className="grid grid-cols-2 gap-12 border-b border-gray-200 pb-8">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Bill to:</h3>
            <p className="font-semibold text-[#212529]">Your Organization Name</p>
            <p className="text-sm text-gray-600 mt-1">123 business park, ahmedabad</p>
            <p className="text-sm text-gray-600">GSTIN: 25383438AFB</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Vendor</h3>
            <p className="font-semibold text-[#212529]">Infra supplies pvt ltd</p>
            <p className="text-sm text-gray-600 mt-1">456, industrial estate, surat</p>
            <p className="text-sm text-gray-600">GSTIN: 343434DB4523</p>
          </div>
        </div>

        {/* Meta Details Section */}
        <div className="grid grid-cols-2 gap-12 py-6 border-b border-gray-200">
          <div className="space-y-2">
            <div className="flex text-sm">
              <span className="w-32 text-gray-500 font-medium">PO Number:</span>
              <span className="font-semibold text-[#212529]">PO-2025-0068</span>
            </div>
            <div className="flex text-sm">
              <span className="w-32 text-gray-500 font-medium">PO date:</span>
              <span className="text-[#212529]">21 May, 2025</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex text-sm">
              <span className="w-32 text-gray-500 font-medium">Invoice date:</span>
              <span className="text-[#212529]">22 May 2025</span>
            </div>
            <div className="flex text-sm">
              <span className="w-32 text-gray-500 font-medium">Due date:</span>
              <span className="text-[#212529] font-medium">21 June 2025</span>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="pt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase border-y border-gray-200">
                <th className="py-3 px-4 font-medium">Item</th>
                <th className="py-3 px-4 font-medium text-center">Qty</th>
                <th className="py-3 px-4 font-medium text-right">Unit price</th>
                <th className="py-3 px-4 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#212529] divide-y divide-gray-100">
              <tr>
                <td className="py-4 px-4">Ergonomic chair</td>
                <td className="py-4 px-4 text-center">25</td>
                <td className="py-4 px-4 text-right">3,500</td>
                <td className="py-4 px-4 text-right">87,500</td>
              </tr>
              <tr>
                <td className="py-4 px-4">Tech Core LTD <span className="text-xs text-gray-400 block">(Standing Desk)</span></td>
                <td className="py-4 px-4 text-center">10</td>
                <td className="py-4 px-4 text-right">8,200</td>
                <td className="py-4 px-4 text-right">82,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end pt-6">
          <div className="w-full max-w-sm space-y-3">
            <div className="flex justify-between text-sm text-gray-600 px-4">
              <span>Subtotal</span>
              <span>1,69,500</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 px-4">
              <span>CGST (9%)</span>
              <span>15,255</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 px-4">
              <span>SGST (9%)</span>
              <span>15,255</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-3 px-4 mt-2">
              <span className="font-bold text-[#212529]">Grand total</span>
              <span className="text-lg font-bold text-[#017E84]">₹ 2,00,010</span>
            </div>
          </div>
        </div>

      </div>

      {/* Payment Status Action */}
      <div className="flex items-center space-x-4 max-w-4xl mx-auto px-2">
        <span className="text-sm font-medium text-gray-600">Status:</span>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wider">
          Pending Payment
        </span>
        <button className="text-sm font-semibold text-[#017E84] hover:text-[#01686d] hover:underline transition-colors ml-4">
          Mark as Paid
        </button>
      </div>

    </div>
  );
};

export default PurchaseOrders;