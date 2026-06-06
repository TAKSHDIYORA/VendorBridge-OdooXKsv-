// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

// ==========================================
// MOCK BACKEND DATA
// Your Spring Boot API should return a JSON object matching this structure.
// ==========================================
const mockBackendData = {
  metrics: {
    activeRfqs: 12,
    pendingApprovals: 5,
    posThisMonth: "2.3L",
    overdueInvoices: 3
  },
  recentOrders: [
    { poNumber: 'Po1', vendor: 'Infra', amount: 87000, status: 'Approved' },
    { poNumber: 'Po2', vendor: 'Tech core', amount: 140000, status: 'Pending' },
    { poNumber: 'Po3', vendor: 'OfficeNeed Co', amount: 34900, status: 'Draft' }
  ],
  spendingTrends: [
    { month: 'Jan', spend: 12000 },
    { month: 'Feb', spend: 19000 },
    { month: 'Mar', spend: 15000 },
    { month: 'Apr', spend: 28000 },
    { month: 'May', spend: 22000 },
    { month: 'Jun', spend: 34000 }
  ]
};

const Dashboard = () => {
  // State to hold the data fetched from backend
  const [data, setData] = useState(mockBackendData);
  const [isLoading, setIsLoading] = useState(false);

  // Example of how you will fetch data from Spring Boot later:
  /*
  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8080/api/dashboard')
      .then(res => res.json())
      .then(backendData => {
        setData(backendData);
        setIsLoading(false);
      });
  }, []);
  */

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-semibold text-[#212529]">Dashboard</h2>
        <p className="text-gray-500 mt-2 text-sm">Welcome back, Procurement Officer - Today's Overview</p>
      </div>

      {/* 1. Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center transition-shadow hover:shadow-md">
          <span className="text-3xl font-bold text-[#212529]">{data.metrics.activeRfqs}</span>
          <span className="text-sm text-gray-500 mt-2 font-medium">Active RFQ's</span>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center transition-shadow hover:shadow-md">
          <span className="text-3xl font-bold text-[#017E84]">{data.metrics.pendingApprovals}</span>
          <span className="text-sm text-gray-500 mt-2 font-medium">Pending Approvals</span>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center transition-shadow hover:shadow-md">
          <span className="text-3xl font-bold text-[#212529]">$ {data.metrics.posThisMonth}</span>
          <span className="text-sm text-gray-500 mt-2 font-medium">PO's this month</span>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center transition-shadow hover:shadow-md">
          <span className="text-3xl font-bold text-red-600">{data.metrics.overdueInvoices}</span>
          <span className="text-sm text-gray-500 mt-2 font-medium">Overdue Invoices</span>
        </div>
      </div>

      {/* 2. Main Content Area (Table and Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Recent Purchase Orders Table (Takes up 2/3 of space) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Recent Purchase Orders</h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-full">
              <thead>
                <tr className="bg-white text-xs text-gray-500 border-b border-gray-200">
                  <th className="px-6 py-3 font-medium">PO#</th>
                  <th className="px-6 py-3 font-medium">Vendor</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                {data.recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#714B67]">{order.poNumber}</td>
                    <td className="px-6 py-4">{order.vendor}</td>
                    <td className="px-6 py-4">₹ {order.amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${order.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-gray-100 text-gray-600'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Charts Area (Takes up 1/3 of space) */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col">
           <h3 className="text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wider text-center">
             Spending Trends last 6 months
           </h3>
           
           {/* Real dynamic chart replacing the wireframe image */}
           <div className="flex-1 min-h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.spendingTrends} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} 
                         tickFormatter={(value) => `₹${value/1000}k`} />
                  <Tooltip 
                    formatter={(value) => [`₹ ${value.toLocaleString('en-IN')}`, 'Spend']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="spend" 
                    stroke="#017E84" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#017E84', strokeWidth: 2, stroke: '#FFF' }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* 3. Bottom Action Buttons */}
      <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
        <button className="px-6 py-2.5 text-sm font-medium bg-white border border-gray-300 rounded hover:border-[#714B67] hover:text-[#714B67] transition-colors shadow-sm">
          + New RFQ
        </button>
        <button className="px-6 py-2.5 text-sm font-medium bg-white border border-gray-300 rounded hover:border-[#714B67] hover:text-[#714B67] transition-colors shadow-sm">
          Add Vendor
        </button>
        <button className="px-6 py-2.5 text-sm font-medium bg-white border border-gray-300 rounded hover:border-[#714B67] hover:text-[#714B67] transition-colors shadow-sm">
          View Invoices
        </button>
      </div>

    </div>
  );
};

export default Dashboard;