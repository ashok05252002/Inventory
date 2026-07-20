import { useState } from 'react';
import { Plus, Filter, Download, Search, CheckCircle2, Clock, XCircle, Eye, Edit, Trash2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

interface Quotation {
  id: string;
  customer: string;
  date: string;
  validUntil: string;
  amount: string;
  status: string;
}

const mockData: Quotation[] = [
  { id: 'QT-2026-001', customer: 'Alpha Corp', date: 'Jul 20, 2026', validUntil: 'Aug 20, 2026', amount: 'AED 15,000.00', status: 'Approved' },
  { id: 'QT-2026-002', customer: 'Beta LLC', date: 'Jul 19, 2026', validUntil: 'Aug 19, 2026', amount: 'AED 8,500.00', status: 'Draft' },
  { id: 'QT-2026-003', customer: 'Gamma Inc', date: 'Jul 18, 2026', validUntil: 'Aug 18, 2026', amount: 'AED 102,000.00', status: 'Draft' },
  { id: 'QT-2026-004', customer: 'Delta Ltd', date: 'Jul 17, 2026', validUntil: 'Aug 17, 2026', amount: 'AED 4,200.00', status: 'Rejected' },
];

const columns: Column<Quotation>[] = [
  { 
    header: 'Quote Number', 
    accessor: (row) => (
      <Link to={`/quotations/${row.id}`} className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
        {row.id}
      </Link>
    ) 
  },
  { header: 'Customer', accessor: 'customer', className: 'font-semibold text-slate-800' },
  { header: 'Date', accessor: 'date', className: 'text-sm font-medium text-slate-600' },
  { header: 'Valid Until', accessor: 'validUntil', className: 'text-sm font-medium text-slate-600' },
  { header: 'Total Amount', accessor: 'amount', className: 'font-bold text-slate-700' },
  { 
    header: 'Status', 
    accessor: (row) => {
      let Icon = Clock;
      let color = 'text-slate-600 bg-slate-100 border-slate-200';
      
      if (row.status === 'Approved') {
        Icon = CheckCircle2;
        color = 'text-emerald-600 bg-emerald-50 border-emerald-200';
      } else if (row.status === 'Draft') {
        Icon = Edit;
        color = 'text-amber-600 bg-amber-50 border-amber-200';
      } else if (row.status === 'Rejected') {
        Icon = XCircle;
        color = 'text-rose-600 bg-rose-50 border-rose-200';
      }
      
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${color} shadow-sm whitespace-nowrap`}>
          <Icon className="w-3.5 h-3.5" /> {row.status}
        </span>
      );
    } 
  },
  { 
    header: 'Actions', 
    accessor: (row) => (
      <div className="flex items-center gap-1 justify-end">
        <Link to={`/quotations/${row.id}`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View Details">
          <Eye className="w-4 h-4" />
        </Link>
        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
          <Edit className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Delete">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
    className: 'text-right'
  }
];

export const Quotations = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Quotations</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Create, manage, and share quotes with your customers.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Create Quote
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
              placeholder="Search by Quote number or Customer..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm group-focus-within:shadow-md"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
              <Filter className="w-4 h-4 text-slate-400" />
              <select className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer">
                <option value="">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 outline-none cursor-pointer">
              <option value="">All Customers</option>
              <option value="Alpha Corp">Alpha Corp</option>
              <option value="Beta LLC">Beta LLC</option>
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

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create Quotation">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Customer Name <span className="text-rose-500">*</span></label>
              <input type="text" placeholder="e.g. Alpha Corp" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Valid Until</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-700">Line Items</label>
            </div>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-2 font-semibold text-slate-600">Item Name / SKU</th>
                    <th className="p-2 font-semibold text-slate-600 w-24">Qty</th>
                    <th className="p-2 font-semibold text-slate-600 w-32">Unit Price</th>
                    <th className="p-2 font-semibold text-slate-600 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Mock empty rows for the form UI */}
                  <tr>
                    <td className="p-2"><input type="text" placeholder="Item name..." className="w-full px-2 py-1.5 border border-slate-200 rounded-md focus:border-indigo-500 outline-none" defaultValue="Dell XPS 15 Laptop" /></td>
                    <td className="p-2"><input type="number" min="1" className="w-full px-2 py-1.5 border border-slate-200 rounded-md focus:border-indigo-500 outline-none" defaultValue="2" /></td>
                    <td className="p-2"><input type="number" step="0.01" className="w-full px-2 py-1.5 border border-slate-200 rounded-md focus:border-indigo-500 outline-none" defaultValue="6500" /></td>
                    <td className="p-2 text-center"><button className="text-rose-500 hover:text-rose-700"><XCircle className="w-4 h-4 mx-auto" /></button></td>
                  </tr>
                  <tr>
                    <td className="p-2"><input type="text" placeholder="Item name..." className="w-full px-2 py-1.5 border border-slate-200 rounded-md focus:border-indigo-500 outline-none" /></td>
                    <td className="p-2"><input type="number" min="1" className="w-full px-2 py-1.5 border border-slate-200 rounded-md focus:border-indigo-500 outline-none" defaultValue="1" /></td>
                    <td className="p-2"><input type="number" step="0.01" className="w-full px-2 py-1.5 border border-slate-200 rounded-md focus:border-indigo-500 outline-none" defaultValue="0" /></td>
                    <td className="p-2 text-center"><button className="text-slate-400 hover:text-rose-500"><XCircle className="w-4 h-4 mx-auto" /></button></td>
                  </tr>
                </tbody>
              </table>
              <div className="p-2 bg-slate-50 border-t border-slate-200">
                <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Notes / Terms</label>
            <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none" rows={3} placeholder="Add any special conditions or notes here..."></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all">
              Create Quote
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
