// src/pages/Activity.jsx
import React, { useState } from 'react';

// Mock Data for the Audit Trail
const mockLogs = [
  { 
    id: 1, 
    category: 'RFQ', 
    status: 'success', 
    title: 'Quotation submitted', 
    desc: 'Infra supplies pvt ltd submitted for office furniture Q2', 
    timestamp: '22 May 2025, 9:15 PM' 
  },
  { 
    id: 2, 
    category: 'Approvals', 
    status: 'pending', 
    title: 'Approval pending', 
    desc: 'PO-2025 awaiting L1 approval by priya shah', 
    timestamp: '22 May 2025, 09:15 AM' 
  },
  { 
    id: 3, 
    category: 'RFQ', 
    status: 'info', 
    title: 'RFQ published', 
    desc: 'office furniture Q2 sent to 3 vendors', 
    timestamp: '19 May 2025, 11:30 AM' 
  },
  { 
    id: 4, 
    category: 'Vendors', 
    status: 'alert', 
    title: 'Vendor added', 
    desc: 'FastLog Transport registered and pending verifications', 
    timestamp: '18 May 2025, 3:20 PM' 
  }
];

const Activity = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'RFQ', 'Approvals', 'Invoices', 'Vendors'];

  // Filter logic
  const filteredLogs = activeFilter === 'All' 
    ? mockLogs 
    : mockLogs.filter(log => log.category === activeFilter);

  // Helper to render the correct icon based on status
  const getIcon = (status) => {
    switch(status) {
      case 'success':
        return (
          <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center bg-green-50 text-green-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
        );
      case 'pending':
        return (
          <div className="w-8 h-8 rounded-full border-2 border-[#017E84] flex items-center justify-center bg-teal-50 text-[#017E84]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        );
      case 'alert':
        return (
          <div className="w-8 h-8 rounded-full border-2 border-red-400 flex items-center justify-center bg-red-50 text-red-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
        );
      default: // info
        return (
          <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center bg-gray-50 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Header Layout */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#212529]">Activity & Logs</h2>
          <p className="text-gray-500 mt-1">Procurement audit trail</p>
        </div>
        
        
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-6 mb-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-1.5 rounded text-sm font-medium transition-colors border ${
                activeFilter === filter 
                  ? 'bg-[#017E84] text-white border-[#017E84]' 
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Logs Feed */}
        <div className="space-y-0">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-4 py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-2 rounded">
                
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getIcon(log.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#212529]">
                    {log.title} <span className="text-gray-500 font-normal ml-1">- {log.desc}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1.5">{log.timestamp}</p>
                </div>

              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm">
              No activity found for this category.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Activity;