// src/pages/Approvals.jsx
import React from 'react';

const Approvals = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-[#212529]">Approval Workflow</h2>
        <p className="text-gray-500 mt-1">RFQ: office furniture Q2 - Vendor: Infra Supplies - ₹ 1,85,400</p>
      </div>

      {/* Progress Stepper */}
      <div className="w-full max-w-3xl mb-10 pt-4">
        <div className="flex items-center justify-between">
          
          {/* Step 1: Completed */}
          <div className="flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <span className="absolute top-10 text-xs font-medium text-gray-700 whitespace-nowrap">Submitted</span>
          </div>
          
          <div className="flex-1 h-1 bg-green-500 mx-2 rounded"></div>
          
          {/* Step 2: Completed */}
          <div className="flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <span className="absolute top-10 text-xs font-medium text-gray-700 whitespace-nowrap">L1 Review</span>
          </div>
          
          <div className="flex-1 h-1 bg-gray-200 mx-2 rounded"></div>
          
          {/* Step 3: Current / Pending */}
          <div className="flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#017E84] text-white font-bold text-sm shadow-sm ring-4 ring-[#017E84]/20">
              3
            </div>
            <span className="absolute top-10 text-xs font-bold text-[#017E84] whitespace-nowrap">Approval</span>
          </div>
          
          <div className="flex-1 h-1 bg-gray-200 mx-2 rounded"></div>
          
          {/* Step 4: Upcoming */}
          <div className="flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 bg-white text-gray-400 font-bold text-sm">
              4
            </div>
            <span className="absolute top-10 text-xs font-medium text-gray-400 whitespace-nowrap">Generate PO</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        
        {/* Left Column: Approval Chain & Remarks */}
        <div className="space-y-8">
          
          {/* Approval Chain Timeline */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Approval Chain</h3>
            <div className="space-y-6">
              
              {/* Timeline Item 1: Approved */}
              <div className="flex items-start space-x-4 relative">
                {/* Connecting Line */}
                <div className="absolute top-8 left-3.5 w-0.5 h-10 bg-gray-200"></div>
                
                <div className="flex-shrink-0 z-10 bg-white">
                  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#212529]">
                    Rahul Mehta <span className="text-gray-500 font-normal">(Procurement Head)</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Approved on May 20, 10:32 AM</p>
                </div>
              </div>

              {/* Timeline Item 2: Pending */}
              <div className="flex items-start space-x-4 relative z-10">
                <div className="flex-shrink-0 bg-white">
                  <svg className="w-7 h-7 text-[#017E84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#212529]">
                    Priya Shah <span className="text-gray-500 font-normal">(Finance Manager)</span>
                  </p>
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase mt-1 mb-1">
                    Awaiting
                  </span>
                  <p className="text-xs text-gray-500">Assigned May 21</p>
                </div>
              </div>

            </div>
          </div>

          {/* Remarks Textarea */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Approval Remarks</h3>
            <textarea 
              rows="4" 
              placeholder="Add your comments or conditions..." 
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67] text-sm bg-gray-50 placeholder-gray-400 transition-colors"
            ></textarea>
          </div>
        </div>

        {/* Right Column: Quotation Summary & Actions */}
        <div className="flex flex-col space-y-8">
          
          {/* Summary Card */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Quotation Summary</h3>
            <div className="bg-[#F9F9F9] border border-gray-200 rounded-lg p-6 space-y-4">
              
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-sm text-gray-500">Vendor</span>
                <span className="text-sm font-semibold text-[#212529]">Infra Supplies PVT LTD</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-lg font-bold text-[#017E84]">₹ 1,85,400</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-sm text-gray-500">Delivery</span>
                <span className="text-sm font-medium text-[#212529]">10 days</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Rating</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-[#212529]">4.5 / 5</span>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 mt-auto">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition-colors shadow-sm flex justify-center items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Approve</span>
            </button>
            <button className="flex-1 border border-red-300 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded font-semibold transition-colors shadow-sm flex justify-center items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              <span>Reject</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Approvals;