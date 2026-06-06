// src/pages/Quotations.jsx
import React, { useState } from 'react';

const Quotations = () => {
  // State for the quotation line items so we can auto-calculate totals
  const [items, setItems] = useState([
    { id: 1, name: 'Ergonomic chair', qty: 25, unitPrice: 3500, deliveryDays: 7 },
    { id: 2, name: 'Standing desk', qty: 10, unitPrice: 8200, deliveryDays: 14 } // Fixed wireframe typo from "Tech Core" to the actual item
  ]);

  const [taxPercent, setTaxPercent] = useState(18);
  const [notes, setNotes] = useState('Payment terms: 20 days net...');

  // Handlers to update line item values
  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: Number(value) } : item
    ));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
  const taxAmount = subtotal * (taxPercent / 100);
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-[#212529]">Submit Quotations</h2>
        <p className="text-gray-500 mt-1">RFQ: office furniture procurement q2 - deadline 15 June 2025</p>
      </div>

      {/* RFQ Summary Card */}
      <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">RFQ Summary</h3>
        <p className="text-sm text-[#212529] font-medium">
          Ergonomic chair * 25, standing desk * 10 - category furniture
        </p>
      </div>

      {/* Quotation Table Area */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-700">Your Quotation</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-xs text-gray-500 border-b border-gray-200">
                <th className="px-6 py-3 font-medium w-1/4">Item</th>
                <th className="px-6 py-3 font-medium w-1/12 text-center">Qty</th>
                <th className="px-6 py-3 font-medium w-1/4">Unit price (₹)</th>
                <th className="px-6 py-3 font-medium w-1/6">Total</th>
                <th className="px-6 py-3 font-medium w-1/4">Delivery (days)</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-[#212529]">{item.name}</td>
                  <td className="px-6 py-4 text-center">{item.qty}</td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67]"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ₹ {(item.qty * item.unitPrice).toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      value={item.deliveryDays}
                      onChange={(e) => handleItemChange(item.id, 'deliveryDays', e.target.value)}
                      className="w-24 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Layout: Settings & Totals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        
        {/* Left Side: Tax & Notes */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">tax / GST %</label>
            <div className="relative w-1/2">
              <input 
                type="number" 
                value={taxPercent}
                onChange={(e) => setTaxPercent(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67]"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Note / terms</label>
            <textarea 
              rows="4" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67]"
            ></textarea>
          </div>
        </div>

        {/* Right Side: Calculation Summary */}
        <div className="flex justify-end">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-[#212529]">₹ {subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>GST ({taxPercent}%)</span>
              <span className="font-medium text-[#212529]">₹ {taxAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-base font-bold text-[#212529]">Grand total</span>
              <span className="text-xl font-bold text-[#017E84]">₹ {grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 border-t border-gray-200 pt-6">
        <button className="bg-[#714B67] text-white px-8 py-2.5 rounded font-medium hover:bg-[#5a3c52] transition-colors shadow-sm">
          Submit Quotation
        </button>
        <button className="border border-gray-300 bg-white text-gray-700 px-8 py-2.5 rounded hover:bg-gray-50 transition-colors shadow-sm">
          Save Draft
        </button>
      </div>

    </div>
  );
};

export default Quotations;