import { Search, Filter, Download, Shield, MonitorPlay } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  module: string;
  action: string;
  status: 'Success' | 'Failure' | 'Warning';
  correlationId: string;
  duration: string;
  details: string;
}

const mockAuditData: AuditLogEntry[] = [
  { id: '1', timestamp: '2024-03-15 14:32:01', user: 'John Doe', role: 'Admin', module: 'Auth', action: 'Login', status: 'Success', correlationId: 'req_8f72h', duration: '120ms', details: 'Successful login from IP 192.168.1.45' },
  { id: '2', timestamp: '2024-03-15 14:15:22', user: 'Sarah Jenkins', role: 'Manager', module: 'Purchase Orders', action: 'Approve PO', status: 'Success', correlationId: 'act_99x1', duration: '450ms', details: 'Approved PO-2024-002 for Global Logistics Corp' },
  { id: '3', timestamp: '2024-03-15 13:50:11', user: 'System', role: 'System', module: 'ERP Integration', action: 'Sync Error', status: 'Failure', correlationId: 'job_4821', duration: '15.2s', details: 'Timeout connecting to Oracle Netsuite API' },
  { id: '4', timestamp: '2024-03-15 11:20:05', user: 'Ahmed Al-Farsi', role: 'Warehouse', module: 'Inventory', action: 'Adjust Stock', status: 'Warning', correlationId: 'txn_9821', duration: '85ms', details: 'Negative adjustment of 50 units for SKU-8921 bypassing standard transfer' },
  { id: '5', timestamp: '2024-03-15 09:10:00', user: 'Unknown', role: 'Unknown', module: 'Auth', action: 'Failed Login', status: 'Failure', correlationId: 'req_11a8', duration: '40ms', details: 'Invalid credentials attempted 3 times from IP 10.0.0.99' },
  { id: '6', timestamp: '2024-03-14 16:45:00', user: 'John Doe', role: 'Admin', module: 'Settings', action: 'Update Config', status: 'Success', correlationId: 'set_0021', duration: '210ms', details: 'Changed default Tax Rate from 5% to 0% (Zero Rated)' },
];

export const AuditLogs = () => {
  const columns: Column<AuditLogEntry>[] = [
    { 
      header: 'Timestamp', 
      accessor: (row) => (
        <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{row.timestamp}</span>
      ) 
    },
    { 
      header: 'User', 
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold shrink-0">
            {row.user === 'System' || row.user === 'Unknown' ? <MonitorPlay className="w-4 h-4" /> : row.user.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800">{row.user}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{row.role}</span>
          </div>
        </div>
      ) 
    },
    { 
      header: 'Module', 
      accessor: (row) => (
        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-md whitespace-nowrap">{row.module}</span>
      ) 
    },
    { header: 'Action', accessor: 'action', className: 'font-semibold text-slate-700 whitespace-nowrap' },
    { 
      header: 'Status', 
      accessor: (row) => {
        let color = 'bg-slate-100 text-slate-600';
        if (row.status === 'Success') color = 'bg-emerald-100 text-emerald-700';
        if (row.status === 'Failure') color = 'bg-rose-100 text-rose-700';
        if (row.status === 'Warning') color = 'bg-amber-100 text-amber-700';
        return <span className={`px-2 py-0.5 rounded text-xs font-bold ${color}`}>{row.status}</span>;
      } 
    },
    { 
      header: 'Trace', 
      accessor: (row) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1 py-0.5 rounded w-max">{row.correlationId}</span>
          <span className="text-[10px] font-medium text-slate-400">{row.duration}</span>
        </div>
      ) 
    },
    { header: 'Details', accessor: 'details', className: 'text-sm text-slate-600 max-w-xs truncate' },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-500" /> System Audit Logs
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Immutable record of all system events, user actions, and security alerts.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export Logs
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full group xl:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search users, actions, or details..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
              <Filter className="w-4 h-4 text-slate-400" />
              <select className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer">
                <option value="">All Modules</option>
                <option value="Auth">Auth</option>
                <option value="Inventory">Inventory</option>
                <option value="Purchase Orders">Purchase Orders</option>
                <option value="ERP Integration">ERP Integration</option>
              </select>
            </div>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 outline-none cursor-pointer">
              <option value="">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Warning">Warning</option>
              <option value="Failure">Failure</option>
            </select>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 outline-none cursor-pointer">
              <option value="">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockAuditData} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 font-medium bg-slate-50/50 mt-auto">
          <div>Showing 1 to 6 of 12,492 logs</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white font-semibold shadow-sm">1</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">2</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">3</button>
            <span className="px-2 py-1 text-slate-400">...</span>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">2082</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};
