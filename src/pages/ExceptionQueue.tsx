import { Search, Filter, AlertCircle, Copy, UserX, PackageX, DollarSign, Layers, Database, RotateCw, CheckCircle2, UserPlus, XCircle } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Link } from 'react-router-dom';

interface ExceptionItem {
  id: string;
  type: string;
  customer: string;
  poNumber: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  severity: 'Critical' | 'Warning' | 'Info';
  assignedUser: string;
  createdDate: string;
  details: string;
}

const mockExceptions: ExceptionItem[] = [
  { id: '1', type: 'Pricing Validation', customer: 'TechNova Solutions', poNumber: 'PO-2024-001', status: 'Unassigned', priority: 'High', severity: 'Critical', assignedUser: '-', createdDate: '2024-03-15 09:30 AM', details: 'Unit price mismatch on Item SKU-8921. PO Price: AED 6,500. System Price: AED 8,500.' },
  { id: '2', type: 'Mandatory Fields', customer: 'Global Logistics Corp', poNumber: 'PO-2024-002', status: 'In Progress', priority: 'Medium', severity: 'Warning', assignedUser: 'Sarah Jenkins', createdDate: '2024-03-15 10:15 AM', details: 'Missing Billing Address and Tax ID on the extracted document.' },
  { id: '3', type: 'Duplicate PO', customer: 'Apex Office Supplies', poNumber: 'PO-2024-003', status: 'Unassigned', priority: 'Low', severity: 'Info', assignedUser: '-', createdDate: '2024-03-15 11:45 AM', details: 'PO Number already exists in the system for this customer.' },
  { id: '4', type: 'Item Validation', customer: 'Nexus Hardware', poNumber: 'PO-2024-004', status: 'Resolved', priority: 'High', severity: 'Warning', assignedUser: 'Ahmed Al-Farsi', createdDate: '2024-03-14 02:20 PM', details: 'Unknown Item Code extracted: ITM-9999. Needs manual mapping.' },
  { id: '5', type: 'ERP Validation', customer: 'Quantum Dynamics', poNumber: 'PO-2024-005', status: 'Failed Sync', priority: 'High', severity: 'Critical', assignedUser: 'System', createdDate: '2024-03-14 04:00 PM', details: 'Connection timeout while pushing Sales Order to Oracle Netsuite.' },
];

const validationMetrics = [
  { title: 'Mandatory Fields', count: 12, icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
  { title: 'Duplicate PO', count: 3, icon: Copy, color: 'text-amber-500', bg: 'bg-amber-50' },
  { title: 'Customer Validation', count: 8, icon: UserX, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { title: 'Item Validation', count: 24, icon: PackageX, color: 'text-blue-500', bg: 'bg-blue-50' },
  { title: 'Pricing Validation', count: 15, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { title: 'Quantity Validation', count: 5, icon: Layers, color: 'text-purple-500', bg: 'bg-purple-50' },
  { title: 'ERP Validation', count: 2, icon: Database, color: 'text-slate-500', bg: 'bg-slate-100' },
];

export const ExceptionQueue = () => {

  const columns: Column<ExceptionItem>[] = [
    { 
      header: 'Exception Type', 
      accessor: (row) => {
        const isError = row.type === 'ERP Validation' || row.type === 'Pricing Validation';
        return (
          <div className="flex flex-col">
            <span className={`font-bold ${isError ? 'text-rose-600' : 'text-slate-800'}`}>{row.type}</span>
            <span className="text-xs text-slate-500 truncate max-w-[200px]" title={row.details}>{row.details}</span>
          </div>
        );
      } 
    },
    { header: 'Customer', accessor: 'customer', className: 'font-semibold text-slate-700' },
    { 
      header: 'PO Number', 
      accessor: (row) => (
        <Link to={`/purchase-orders/${row.poNumber}`} className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">
          {row.poNumber}
        </Link>
      ) 
    },
    { 
      header: 'Status', 
      accessor: (row) => {
        let color = 'text-slate-600 bg-slate-100 border-slate-200';
        if (row.status === 'Unassigned') color = 'text-amber-600 bg-amber-50 border-amber-200';
        if (row.status === 'In Progress') color = 'text-blue-600 bg-blue-50 border-blue-200';
        if (row.status === 'Resolved') color = 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (row.status === 'Failed Sync') color = 'text-rose-600 bg-rose-50 border-rose-200';
        
        return (
          <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${color} shadow-sm whitespace-nowrap`}>
            {row.status}
          </span>
        );
      } 
    },
    {
      header: 'Priority/Severity',
      accessor: (row) => (
        <div className="flex gap-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
            row.priority === 'High' ? 'border-rose-200 text-rose-600 bg-rose-50' : (row.priority === 'Medium' ? 'border-amber-200 text-amber-600 bg-amber-50' : 'border-slate-200 text-slate-600 bg-slate-50')
          }`}>
            {row.priority}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
            row.severity === 'Critical' ? 'border-purple-200 text-purple-600 bg-purple-50' : (row.severity === 'Warning' ? 'border-amber-200 text-amber-600 bg-amber-50' : 'border-slate-200 text-slate-600 bg-slate-50')
          }`}>
            {row.severity}
          </span>
        </div>
      )
    },
    { 
      header: 'Assignment', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">{row.assignedUser}</span>
          <span className="text-xs text-slate-400">{row.createdDate}</span>
        </div>
      ) 
    },
    { 
      header: 'Actions', 
      accessor: () => (
        <div className="flex items-center gap-1 justify-end">
          <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Retry Processing">
            <RotateCw className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Resolve Exception">
            <CheckCircle2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Assign User">
            <UserPlus className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Close/Ignore">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Validation Center</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Monitor system health and resolve processing exceptions.</p>
        </div>
      </div>

      {/* Validation Dashboard Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {validationMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx} className="hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full gap-3">
                <div className={`p-3 rounded-full ${metric.bg} ${metric.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 leading-tight">{metric.title}</h3>
                  <p className={`text-2xl font-black ${metric.color}`}>{metric.count}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Exception Queue Table */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-800">Exception Queue</h2>
            <span className="px-2.5 py-0.5 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">69 Active</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative max-w-md w-full group xl:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search exceptions..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
              <Filter className="w-4 h-4 text-slate-400" />
              <select className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer">
                <option value="">All Types</option>
                <option value="Pricing">Pricing Validation</option>
                <option value="Item">Item Validation</option>
                <option value="Mandatory">Mandatory Fields</option>
              </select>
            </div>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 outline-none cursor-pointer">
              <option value="">All Statuses</option>
              <option value="Unassigned">Unassigned</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockExceptions} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 font-medium bg-slate-50/50 mt-auto">
          <div>Showing 1 to 5 of 69 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white font-semibold shadow-sm">1</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">2</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">3</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};
