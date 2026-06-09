// src/pages/Approvals.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Approvals = () => {
  // 1. State Management
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
const API_BASE_URL = process.env.BACKEND_API_URL;
  // 2. Fetch the Queue on Mount
  useEffect(() => {
    const fetchPendingQueue = async () => {
      try {
        // Fetch all quotations where status is PENDING_APPROVAL
        // Replace with your actual Spring Boot endpoint
        const token = JSON.parse(localStorage.getItem('vendorBridgeUser'))?.token;
        const response = await axios.get(`${API_BASE_URL}/quotations/approved`,{
          headers: { 'Authorization': `Bearer ${token}` }
        }); 
        
        // Assuming response.data.data is an array of quotation objects
        setPendingApprovals(response.data);
        
        // Auto-select the first item if the list isn't empty
        if (response.data.length > 0) {
            setSelectedId(response.data[0].id);
        }
      } catch (err) {
        setError("Failed to load the approval queue. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingQueue();
  }, []);

  // Derived state: find the full object for the selected item
  const selectedQuotation = pendingApprovals.find(q => q.id === selectedId);

  // 3. Action Handlers (Approve / Reject)
  const handleAction = async (decision) => {
    if (!selectedId) return;
    
    setActionLoading(true);
    try {
      // Replace with your actual backend endpoint
      await axios.post(`/api/v1/quotations/${selectedId}/action`, {
        action: decision, // 'APPROVE' or 'REJECT'
        remarks: remarks
      });
      
      alert(`Quotation ${decision}D successfully!`);
      
      // Remove the processed item from the queue
      const updatedQueue = pendingApprovals.filter(q => q.id !== selectedId);
      setPendingApprovals(updatedQueue);
      
      // Clear remarks and auto-select the next item
      setRemarks('');
      setSelectedId(updatedQueue.length > 0 ? updatedQueue[0].id : null);

    } catch (err) {
      alert("An error occurred while processing the approval.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your approval queue...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-[#212529]">Manager Approvals</h2>
        <p className="text-gray-500 mt-1">Review and process quotations forwarded by Procurement Officers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8 h-[calc(100vh-200px)] min-h-[600px]">
        
        {/* LEFT COLUMN: The Queue (1/3 width) */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Pending Queue ({pendingApprovals.length})</h3>
            </div>
            
            <div className="overflow-y-auto flex-1 p-2 space-y-2">
                {pendingApprovals.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">No pending approvals in your queue.</div>
                ) : (
                    pendingApprovals.map((item) => (
                        <div 
                            key={item.id}
                            onClick={() => {
                                setSelectedId(item.id);
                                setRemarks(''); // Reset remarks when switching
                            }}
                            className={`p-4 rounded border cursor-pointer transition-all ${selectedId === item.id ? 'border-[#017E84] bg-[#017E84]/5 shadow-sm' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold text-[#017E84]">{item.rfqNumber || 'RFQ-XXX'}</span>
                                <span className="text-xs text-gray-500">{item.submittedDate || 'Recent'}</span>
                            </div>
                            <h4 className="font-semibold text-sm text-[#212529] truncate">{item.rfqTitle}</h4>
                            <p className="text-xs text-gray-500 mt-1 truncate">{item.vendorName}</p>
                            <div className="mt-3 text-sm font-bold text-gray-800">
                                ₹ {item.totalAmount?.toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

        {/* RIGHT COLUMN: The Action Panel (2/3 width) */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-y-auto p-8">
            
            {!selectedQuotation ? (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                    Select a quotation from the queue to review details.
                </div>
            ) : (
                <div className="space-y-8 flex-1 flex flex-col">
                    
                    {/* Detail Header */}
                    <div className="border-b border-gray-200 pb-4">
                        <h2 className="text-xl font-bold text-[#212529]">{selectedQuotation.rfqTitle}</h2>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className="text-gray-500">Vendor: <span className="font-semibold text-gray-800">{selectedQuotation.vendorName}</span></span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500">Amount: <span className="font-bold text-[#017E84]">₹ {selectedQuotation.totalAmount?.toLocaleString()}</span></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                        
                        {/* Approval Chain Timeline */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Approval Chain</h3>
                            <div className="space-y-6">
                            
                            {selectedQuotation.history && selectedQuotation.history.map((event, index) => (
                                <div key={index} className="flex items-start space-x-4 relative">
                                    {index !== selectedQuotation.history.length - 1 && (
                                    <div className="absolute top-8 left-3.5 w-0.5 h-10 bg-gray-200"></div>
                                    )}
                                    <div className="flex-shrink-0 z-10 bg-white">
                                        {event.status === 'APPROVED' ? (
                                            <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        ) : event.status === 'PENDING' ? (
                                            <svg className="w-7 h-7 text-[#017E84]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        ) : (
                                            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        )}
                                    </div>
                                    <div>
                                    <p className="text-sm font-semibold text-[#212529]">
                                        {event.userName} <span className="text-gray-500 font-normal">({event.role})</span>
                                    </p>
                                    {event.status === 'PENDING' && (
                                        <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase mt-1 mb-1">
                                        Awaiting Your Action
                                        </span>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1">{event.actionDate}</p>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Summary & Remarks */}
                        <div className="space-y-6 flex flex-col">
                            <div className="bg-[#F9F9F9] border border-gray-200 rounded-lg p-5 space-y-3">
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="text-sm text-gray-500">Delivery</span>
                                    <span className="text-sm font-medium text-[#212529]">{selectedQuotation.deliveryTime} days</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Vendor Rating</span>
                                    <div className="flex items-center space-x-1">
                                        <span className="text-sm font-medium text-[#212529]">{selectedQuotation.rating} / 5</span>
                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Manager Remarks</h3>
                                <textarea 
                                    rows="4" 
                                    placeholder="Add required conditions or reasons for rejection..." 
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67] text-sm bg-white placeholder-gray-400 transition-colors resize-none"
                                ></textarea>
                            </div>
                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-6 border-t border-gray-100 mt-auto">
                        <button 
                            onClick={() => handleAction('APPROVE')}
                            disabled={actionLoading}
                            className={`flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition-colors shadow-sm flex justify-center items-center space-x-2 ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>{actionLoading ? 'Processing...' : 'Approve & Create PO'}</span>
                        </button>
                        <button 
                            onClick={() => handleAction('REJECT')}
                            disabled={actionLoading}
                            className={`flex-1 border border-red-300 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded font-semibold transition-colors shadow-sm flex justify-center items-center space-x-2 ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            <span>{actionLoading ? 'Processing...' : 'Reject'}</span>
                        </button>
                    </div>

                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default Approvals;