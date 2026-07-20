import { useState } from 'react';
import { Plus, Filter, Download, Search, CheckCircle2, Clock, XCircle, Eye, Edit, RotateCw, Trash2, Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

interface SalesOrder {
  id: string;
  customer: string;
  soDate: string;
  deliveryDate: string;
  amount: string;
  status: string;
  erpStatus: string;
  source: string;
}

const mockData: SalesOrder[] = [
  { id: 'SO-2026-001', customer: 'Alpha Corp', soDate: 'Jul 20, 2026', deliveryDate: 'Aug 05, 2026', amount: 'AED 15,000.00', status: 'Approved', erpStatus: 'Synced', source: 'Portal' },
  { id: 'SO-2026-002', customer: 'Beta LLC', soDate: 'Jul 19, 2026', deliveryDate: 'Aug 10, 2026', amount: 'AED 8,500.00', status: 'Pending', erpStatus: 'Pending', source: 'Manual' },
  { id: 'SO-2026-003', customer: 'Gamma Inc', soDate: 'Jul 18, 2026', deliveryDate: 'Jul 25, 2026', amount: 'AED 102,000.00', status: 'Approved', erpStatus: 'Synced', source: 'API' },
  { id: 'SO-2026-004', customer: 'Delta Ltd', soDate: 'Jul 17, 2026', deliveryDate: 'Jul 30, 2026', amount: 'AED 4,200.00', status: 'Rejected', erpStatus: 'Failed', source: 'API' },
];

const columns: Column<SalesOrder>[] = [
  { 
    header: 'SO Number', 
    accessor: (row) => (
      <Link to={`/sales-orders/${row.id}`} className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors flex flex-col">
        {row.id}
        <span className="text-xs font-normal text-slate-400 no-underline">{row.source}</span>
      </Link>
    ) 
  },
  { header: 'Customer', accessor: 'customer', className: 'font-semibold text-slate-800' },
  { header: 'SO Date', accessor: 'soDate', className: 'text-sm font-medium text-slate-600' },
  { header: 'Delivery Date', accessor: 'deliveryDate', className: 'text-sm font-medium text-slate-600' },
  { header: 'Amount', accessor: 'amount', className: 'font-bold text-slate-700' },
  { 
    header: 'Status', 
    accessor: (row) => {
      const isSuccess = row.status === 'Approved';
      const isPending = row.status === 'Pending' || row.status === 'Processing';
      const Icon = isSuccess ? CheckCircle2 : (isPending ? Clock : XCircle);
      const color = isSuccess ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 
                   (isPending ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200');
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${color} shadow-sm whitespace-nowrap`}>
          <Icon className="w-3.5 h-3.5" /> {row.status}
        </span>
      );
    } 
  },
  { 
    header: 'ERP Status', 
    accessor: (row) => {
      const isSynced = row.erpStatus === 'Synced';
      const isFailed = row.erpStatus === 'Failed';
      const Icon = isSynced ? Cloud : (isFailed ? CloudOff : RefreshCw);
      const color = isSynced ? 'text-indigo-600 bg-indigo-50 border-indigo-200' : 
                   (isFailed ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-slate-600 bg-slate-100 border-slate-200');
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${color} shadow-sm whitespace-nowrap`}>
          <Icon className={`w-3.5 h-3.5 ${!isSynced && !isFailed ? 'animate-spin' : ''}`} /> {row.erpStatus}
        </span>
      );
    } 
  },
  { 
    header: 'Actions', 
    accessor: (row) => (
      <div className="flex items-center gap-1 justify-end">
        <Link to={`/sales-orders/${row.id}`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View Details">
          <Eye className="w-4 h-4" />
        </Link>
        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
          <Edit className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Reprocess">
          <RotateCw className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Delete">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
    className: 'text-right'
  }
];

export const SalesOrders = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sales Orders</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage and track your customer sales orders.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Create SO
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Advanced Filters Toolbar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search by SO number or Customer..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm group-focus-within:shadow-md"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
              <Filter className="w-4 h-4 text-slate-400" />
              <select className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer">
                <option value="">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 outline-none cursor-pointer">
              <option value="">All Customers</option>
              <option value="Alpha Corp">Alpha Corp</option>
              <option value="Beta LLC">Beta LLC</option>
            </select>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 outline-none cursor-pointer">
              <option value="">Any Date</option>
              <option value="today">Today</option>
              <option value="last7">Last 7 Days</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockData} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 font-medium bg-slate-50/50 mt-auto">
          <div>Showing 1 to 4 of 4 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white font-semibold shadow-sm">1</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </Card>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create Sales Order">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Enter the details for the new sales order.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Customer Name <span className="text-rose-500">*</span></label>
              <input type="text" placeholder="e.g. Alpha Corp" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Expected Delivery Date</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all">
              Create Order
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
