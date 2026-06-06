// src/pages/CompareQuotes.jsx
import React from 'react';

const CompareQuotes = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#212529]">Quotation Comparison</h2>
        <p className="text-gray-500 mt-1">RFQ: office furniture procurement q2 - 3 quotations received</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="px-6 py-4 text-left font-medium text-gray-500 border-r border-gray-200 w-1/4">Criteria</th>
              {/* Highlighted Winning Column */}
              <th className="px-6 py-4 font-bold text-green-700 bg-green-50 border-r border-green-200 w-1/4">Infra Supplies (Lowest)</th>
              <th className="px-6 py-4 font-medium text-[#212529] border-r border-gray-200 w-1/4">TechCore LTD</th>
              <th className="px-6 py-4 font-medium text-[#212529] w-1/4">Office Need Co.</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-100">
              <td className="px-6 py-4 text-left font-medium text-gray-700 border-r border-gray-200">Grand Total</td>
              <td className="px-6 py-4 font-bold text-green-700 bg-green-50 border-r border-green-200">₹ 1,85,000</td>
              <td className="px-6 py-4 border-r border-gray-200">₹ 2,00,010</td>
              <td className="px-6 py-4">₹ 2,14,800</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-6 py-4 text-left font-medium text-gray-700 border-r border-gray-200">GST %</td>
              <td className="px-6 py-4 bg-green-50 border-r border-green-200">18%</td>
              <td className="px-6 py-4 border-r border-gray-200">18%</td>
              <td className="px-6 py-4">18%</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-6 py-4 text-left font-medium text-gray-700 border-r border-gray-200">Delivery (days)</td>
              <td className="px-6 py-4 bg-green-50 border-r border-green-200">10</td>
              <td className="px-6 py-4 border-r border-gray-200 text-red-500">14</td>
              <td className="px-6 py-4 text-green-600">7</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-6 py-4 text-left font-medium text-gray-700 border-r border-gray-200">Vendor rating</td>
              <td className="px-6 py-4 bg-green-50 border-r border-green-200">4.5 / 5</td>
              <td className="px-6 py-4 border-r border-gray-200">4.2 / 5</td>
              <td className="px-6 py-4 text-red-500">3.8 / 5</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-6 py-4 text-left font-medium text-gray-700 border-r border-gray-200">Payment terms</td>
              <td className="px-6 py-4 bg-green-50 border-r border-green-200">30 days</td>
              <td className="px-6 py-4 border-r border-gray-200">30 days</td>
              <td className="px-6 py-4">15 days</td>
            </tr>
            {/* Actions Row */}
            <tr className="bg-gray-50">
              <td className="px-6 py-6 border-r border-gray-200"></td>
              <td className="px-6 py-6 bg-green-50 border-r border-green-200">
                <button className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 w-full">Select & Approve</button>
              </td>
              <td className="px-6 py-6 border-r border-gray-200">
                <button className="border border-gray-300 bg-white px-4 py-2 rounded hover:bg-gray-100 w-full">Select</button>
              </td>
              <td className="px-6 py-6">
                <button className="border border-gray-300 bg-white px-4 py-2 rounded hover:bg-gray-100 w-full">Select</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-red-500 mt-2">* Green = lowest price. Selecting vendor initiates the approval workflow.</p>
    </div>
  );
};

export default CompareQuotes;