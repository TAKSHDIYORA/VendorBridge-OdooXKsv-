// src/pages/CompareQuotes.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompareQuotes = () => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

  const [rfqs, setRfqs] = useState([]);
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Fetch all RFQs on mount
  useEffect(() => {
    const fetchRfqs = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('vendorBridgeUser'))?.token;
        const role = JSON.parse(localStorage.getItem('vendorBridgeUser'))?.role;
        let response = [];
        if(role=='ROLE_OFFICER'){
        response  = await axios.get(`${API_BASE_URL}/rfqs/all`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }else{
         response  = await axios.get(`${API_BASE_URL}/rfqs/open`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
      console.log(response);
      
        setRfqs(response.data);
      } catch (err) {
        console.error("Failed to fetch RFQs", err);
      }
    };
    fetchRfqs();
  }, []);

  // 2. Fetch Quotations when an RFQ is selected
  const handleRfqSelect = async (e) => {
    const rfqId = e.target.value;
    if (!rfqId) {
      setSelectedRfq(null);
      setQuotations([]);
      return;
    }

    const rfq = rfqs.find(r => r.id === parseInt(rfqId));
    setSelectedRfq(rfq);
    setLoading(true);
    setError('');

    try {
      const token = JSON.parse(localStorage.getItem('vendorBridgeUser'))?.token;
      const response = await axios.get(`${API_BASE_URL}/quotations/rfq/${rfqId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setQuotations(response.data);
    } catch (err) {
      setError('Failed to load quotations for this RFQ.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Awarding the RFQ (Placeholder for next phase)
  const handleAward = async (quotationId, vendorEmail,rfqId) => {
    console.log("quote id  ",rfqId);
    
    if (window.confirm(`Are you sure you want to award this contract to ${vendorEmail}? This will generate a Purchase Order.`)) {
            const token = JSON.parse(localStorage.getItem('vendorBridgeUser'))?.token;

      const response = await axios.get(`${API_BASE_URL}/quotations/approvedByOfficer/${rfqId}/${quotationId}`,{
        headers : {'Authorization' : `Bearer ${token}`}
      });
      console.log("response");
      
      console.log(response);
      
      window.alert(response.data);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-semibold text-[#212529]">Compare Quotations</h2>
        <p className="text-gray-500 mt-1">Evaluate vendor bids side-by-side</p>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-800 rounded border border-red-200">{error}</div>}

      {/* RFQ Selector */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select an RFQ to Evaluate</label>
        <select 
          onChange={handleRfqSelect} 
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded focus:border-[#714B67] outline-none"
        >
          <option value="">-- Choose RFQ --</option>
          {rfqs.map(rfq => (
            <option key={rfq.id} value={rfq.id}>
              {rfq.title} (Status: {rfq.status})
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-500 animate-pulse">Loading vendor bids...</p>}

      {/* Comparison Matrix */}
      {selectedRfq && !loading && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          
          {quotations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No vendors have submitted quotes for this RFQ yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                
                {/* Table Header: Dynamically generates columns for each Vendor */}
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-700 w-64 border-r">Requested Item</th>
                    <th className="px-4 py-4 font-semibold text-gray-700 text-center border-r">Qty</th>
                    {quotations.map((quote, index) => (
                      <th key={quote.id} className="px-6 py-4 font-semibold text-center border-r min-w-[200px]">
                        <div className="text-[#714B67] text-base">Vendor {index + 1}</div>
                        <div className="text-xs text-gray-500 font-normal">{quote.vendor.email}</div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body: Maps original RFQ Line Items to Vendor Prices */}
                <tbody>
                  {selectedRfq.lineItems?.map(lineItem => (
                    <tr key={lineItem.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-3 border-r font-medium text-gray-800">{lineItem.item}</td>
                      <td className="px-4 py-3 border-r text-center text-gray-600">{lineItem.quantity} {lineItem.unit}</td>
                      
                      {/* Search each quotation for the matching line item price */}
                      {quotations.map(quote => {
                        const bidItem = quote.items.find(qi => qi.rfqLineItem?.id === lineItem.id);
                        return (
                          <td key={`${quote.id}-${lineItem.id}`} className="px-6 py-3 border-r text-center">
                            {bidItem ? `₹${bidItem.unitPrice.toFixed(2)}` : <span className="text-gray-300">No bid</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>

                {/* Table Footer: Totals, Remarks, and Action Buttons */}
                <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                  {/* Grand Totals */}
                  <tr>
                    <td colSpan="2" className="px-6 py-4 border-r text-right font-bold text-gray-800 uppercase tracking-wider">
                      Total Bid Amount
                    </td>
                    {quotations.map(quote => (
                      <td key={quote.id} className="px-6 py-4 border-r text-center font-bold text-lg text-[#017E84]">
                        ₹{quote.totalAmount.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Remarks */}
                  <tr className="border-t border-gray-200 bg-white">
                    <td colSpan="2" className="px-6 py-4 border-r text-right font-medium text-gray-600">
                      Vendor Terms / Remarks
                    </td>
                    {quotations.map(quote => (
                      <td key={quote.id} className="px-6 py-4 border-r text-center text-xs text-gray-500 whitespace-normal">
                        {quote.remarks || "-"}
                      </td>
                    ))}
                  </tr>

                  {/* Award Buttons */}
                  <tr className="border-t border-gray-200">
                    <td colSpan="2" className="px-6 py-4 border-r text-right"></td>
                    {quotations.map(quote => (
                      <td key={quote.id} className="px-6 py-4 border-r text-center">
                        <button 
                          onClick={() => handleAward(quote.id, quote.vendor.email,selectedRfq.id)}
                          className="bg-[#714B67] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#5a3c52] transition-colors w-full"
                        >
                          Award Contract
                        </button>
                      </td>
                    ))}
                  </tr>
                </tfoot>

              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompareQuotes;