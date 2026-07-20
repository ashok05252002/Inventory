import { useState } from 'react';
import { Download, Calendar, Filter, BarChart3, TrendingUp, Activity, AlertCircle, ShoppingCart, Users, Package } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataTable, type Column } from '../components/ui/DataTable';

const tabs = [
  { id: 'purchase-orders', label: 'Purchase Orders', icon: ShoppingCart },
  { id: 'sales-orders', label: 'Sales Orders', icon: TrendingUp },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'processing', label: 'Processing', icon: Activity },
  { id: 'exceptions', label: 'Exceptions', icon: AlertCircle },
];

const poData = [
  { name: 'Jan', orders: 120, value: 450000 },
  { name: 'Feb', orders: 135, value: 520000 },
  { name: 'Mar', orders: 180, value: 750000 },
  { name: 'Apr', orders: 145, value: 610000 },
  { name: 'May', orders: 190, value: 820000 },
  { name: 'Jun', orders: 210, value: 950000 },
];

const salesData = [
  { name: 'Q1', target: 1500000, actual: 1720000 },
  { name: 'Q2', target: 1600000, actual: 1580000 },
  { name: 'Q3', target: 1800000, actual: 2100000 },
  { name: 'Q4', target: 2000000, actual: 2450000 },
];

const inventoryPieData = [
  { name: 'Electronics', value: 45 },
  { name: 'Furniture', value: 25 },
  { name: 'Office', value: 15 },
  { name: 'Hardware', value: 15 },
];

const COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#ec4899'];


const getColumnsForTab = (tab: string): Column<any>[] => {
  switch (tab) {
    case 'purchase-orders':
      return [
        { header: 'Date', accessor: 'date', className: 'text-slate-500' },
        { header: 'PO Number', accessor: 'po', className: 'font-bold text-indigo-600' },
        { header: 'Supplier', accessor: 'supplier', className: 'font-semibold text-slate-700' },
        { header: 'Amount', accessor: 'amount', className: 'font-bold text-slate-800 text-right' },
        { header: 'Status', accessor: 'status', className: 'text-sm font-medium text-slate-600' }
      ];
    case 'sales-orders':
      return [
        { header: 'Date', accessor: 'date', className: 'text-slate-500' },
        { header: 'SO Number', accessor: 'so', className: 'font-bold text-indigo-600' },
        { header: 'Customer', accessor: 'customer', className: 'font-semibold text-slate-700' },
        { header: 'Value', accessor: 'value', className: 'font-bold text-emerald-600 text-right' },
        { header: 'Margin', accessor: 'margin', className: 'font-bold text-slate-500 text-right' }
      ];
    case 'inventory':
      return [
        { header: 'Category', accessor: 'category', className: 'font-bold text-slate-700' },
        { header: 'SKU Count', accessor: 'skuCount', className: 'text-slate-600 text-right' },
        { header: 'Total Value', accessor: 'value', className: 'font-bold text-indigo-600 text-right' },
        { header: 'Turnover Rate', accessor: 'turnover', className: 'text-sm font-medium text-slate-500' }
      ];
    case 'customers':
      return [
        { header: 'Customer Name', accessor: 'name', className: 'font-bold text-slate-700' },
        { header: 'Lifetime Value', accessor: 'lifetimeValue', className: 'font-bold text-emerald-600 text-right' },
        { header: 'Status', accessor: 'status', className: 'text-slate-600' },
        { header: 'Tier', accessor: 'tier', className: 'font-semibold text-amber-600' }
      ];
    case 'processing':
      return [
        { header: 'Date', accessor: 'date', className: 'text-slate-500' },
        { header: 'Docs Processed', accessor: 'docsProcessed', className: 'font-bold text-slate-700 text-right' },
        { header: 'OCR Success Rate', accessor: 'ocrSuccess', className: 'font-bold text-emerald-600 text-right' },
        { header: 'Avg Time/Doc', accessor: 'avgTime', className: 'text-slate-600 text-right' }
      ];
    case 'exceptions':
      return [
        { header: 'Exception Type', accessor: 'type', className: 'font-bold text-rose-600' },
        { header: 'Occurrence Count', accessor: 'count', className: 'font-bold text-slate-700 text-right' },
        { header: 'Avg Resolution Time', accessor: 'avgResolution', className: 'text-slate-600 text-right' },
        { header: 'Trend', accessor: 'trend', className: 'font-semibold text-slate-500 text-right' }
      ];
    default:
      return [];
  }
};

export const Reports = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  
  const mockTableDataMap: Record<string, any[]> = {
    'purchase-orders': [
      { id: '1', date: '2024-03-01', po: 'PO-1001', supplier: 'TechNova', amount: 'AED 12,500', status: 'Completed' },
      { id: '2', date: '2024-03-02', po: 'PO-1002', supplier: 'Global Logistics', amount: 'AED 8,200', status: 'Pending' },
      { id: '3', date: '2024-03-03', po: 'PO-1003', supplier: 'Office Plus', amount: 'AED 1,500', status: 'Completed' },
      { id: '4', date: '2024-03-04', po: 'PO-1004', supplier: 'Nexus Hardware', amount: 'AED 45,000', status: 'In Transit' },
    ],
    'sales-orders': [
      { id: '1', date: '2024-03-01', so: 'SO-9921', customer: 'Alpha Corp', value: 'AED 15,000', margin: '22%' },
      { id: '2', date: '2024-03-02', so: 'SO-9922', customer: 'Beta LLC', value: 'AED 8,500', margin: '18%' },
      { id: '3', date: '2024-03-03', so: 'SO-9923', customer: 'Gamma Inc', value: 'AED 102,000', margin: '12%' },
      { id: '4', date: '2024-03-04', so: 'SO-9924', customer: 'Delta Ltd', value: 'AED 4,200', margin: '35%' },
    ],
    'inventory': [
      { id: '1', category: 'Electronics', skuCount: 452, value: 'AED 1.2M', turnover: 'High' },
      { id: '2', category: 'Furniture', skuCount: 120, value: 'AED 800K', turnover: 'Medium' },
      { id: '3', category: 'Hardware', skuCount: 890, value: 'AED 500K', turnover: 'Low' },
    ],
    'customers': [
      { id: '1', name: 'Alpha Corp', lifetimeValue: 'AED 450K', status: 'Active', tier: 'Gold' },
      { id: '2', name: 'Beta LLC', lifetimeValue: 'AED 120K', status: 'Active', tier: 'Silver' },
      { id: '3', name: 'Delta Ltd', lifetimeValue: 'AED 15K', status: 'Inactive', tier: 'Bronze' },
    ],
    'processing': [
      { id: '1', date: '2024-03-01', docsProcessed: 145, ocrSuccess: '98%', avgTime: '1.2s' },
      { id: '2', date: '2024-03-02', docsProcessed: 182, ocrSuccess: '97%', avgTime: '1.5s' },
      { id: '3', date: '2024-03-03', docsProcessed: 95, ocrSuccess: '99%', avgTime: '1.0s' },
    ],
    'exceptions': [
      { id: '1', type: 'Pricing Mismatch', count: 45, avgResolution: '2.5 hrs', trend: '+5%' },
      { id: '2', type: 'Missing Fields', count: 120, avgResolution: '0.5 hrs', trend: '-12%' },
      { id: '3', type: 'ERP Sync Fail', count: 12, avgResolution: '4.0 hrs', trend: '+2%' },
    ]
  };

  const currentTableData = mockTableDataMap[activeTab] || [];
  const currentColumns = getColumnsForTab(activeTab);

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      {/* Global Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-500" /> Analytics Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Comprehensive reporting and data visualization.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>This Year</option>
              <option>Custom Range...</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          )
        })}
      </div>

      {/* Dynamic Content based on Active Tab */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <Card className="xl:col-span-2 flex flex-col min-h-[400px]">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between py-4">
            <CardTitle>
              {activeTab === 'purchase-orders' && 'PO Volume Trend'}
              {activeTab === 'sales-orders' && 'Sales Performance (Actual vs Target)'}
              {activeTab === 'inventory' && 'Inventory Valuation Trend'}
              {['customers', 'processing', 'exceptions'].includes(activeTab) && 'Activity Trend'}
            </CardTitle>
            <button className="text-slate-400 hover:text-indigo-600"><Filter className="w-4 h-4" /></button>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={350}>
              {activeTab === 'sales-orders' ? (
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `${value / 1000}k`} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" />
                  <Bar dataKey="target" name="Target Revenue" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Actual Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={poData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="orders" name="Order Volume" stroke="#14b8a6" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Secondary Chart Area (Pie) */}
        <Card className="flex flex-col min-h-[400px]">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4">
            <CardTitle>Distribution Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={inventoryPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                  {inventoryPieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Data Table */}
      <Card>
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4">
          <CardTitle>Detailed Report Data</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {currentColumns.length > 0 ? (
            <DataTable data={currentTableData} columns={currentColumns} keyExtractor={(row) => row.id} />
          ) : (
            <div className="p-8 text-center text-slate-500">No columns configured for this report.</div>
          )}
          <div className="p-4 border-t border-slate-100 flex items-center justify-center bg-slate-50">
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">View Full Table</button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};
