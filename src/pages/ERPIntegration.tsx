import React, { useState } from 'react';
import { Network, Server, ShieldCheck, Clock, Layers, ArrowRightLeft, CheckCircle2, XOctagon, RefreshCw, FileJson, Activity, Save, ArrowRight } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface ApiLog {
  id: string;
  timestamp: string;
  endpoint: string;
  executionTime: string;
  status: 'Success' | 'Failure' | 'Retrying';
  payload: string;
}

const mockLogs: ApiLog[] = [
  { id: '1', timestamp: '2024-03-15 14:32:01', endpoint: 'POST /api/v1/sales-orders', executionTime: '1.2s', status: 'Success', payload: '{\n  "orderId": "SO-2024-192",\n  "status": "created",\n  "erpReference": "NET-8921-A"\n}' },
  { id: '2', timestamp: '2024-03-15 14:30:15', endpoint: 'GET /api/v1/inventory/sync', executionTime: '4.5s', status: 'Success', payload: '{\n  "syncId": "SYNC-992",\n  "itemsProcessed": 1248,\n  "status": "completed"\n}' },
  { id: '3', timestamp: '2024-03-15 14:15:22', endpoint: 'POST /api/v1/purchase-orders', executionTime: '15.0s', status: 'Failure', payload: '{\n  "error": "Timeout",\n  "message": "Connection to Sage 300 timed out after 15000ms",\n  "code": "ERR_GATEWAY_TIMEOUT"\n}' },
  { id: '4', timestamp: '2024-03-15 14:05:00', endpoint: 'POST /api/v1/customers/upsert', executionTime: '0.8s', status: 'Success', payload: '{\n  "customerId": "CUST-1005",\n  "action": "updated",\n  "erpId": "C-9921"\n}' },
  { id: '5', timestamp: '2024-03-15 13:50:11', endpoint: 'POST /api/v1/purchase-orders', executionTime: '2.1s', status: 'Retrying', payload: '{\n  "attempt": 2,\n  "status": "queued",\n  "nextRetry": "2024-03-15 14:00:11"\n}' },
];

const fieldMappings = [
  { id: '1', type: 'Header', nexus: 'PO Number', sage: 'CUSTOMER_PO_NUMBER', required: true },
  { id: '2', type: 'Header', nexus: 'Customer Code', sage: 'CUSTOMER_NUMBER', required: true },
  { id: '3', type: 'Header', nexus: 'PO Date', sage: 'ORDER_DATE', required: true },
  { id: '4', type: 'Header', nexus: 'Delivery Date', sage: 'EXPECTED_SHIP_DATE', required: false },
  { id: '5', type: 'Header', nexus: 'Billing Address', sage: 'BILL_TO_ADDRESS_1', required: false },
  { id: '6', type: 'Header', nexus: 'Shipping Address', sage: 'SHIP_TO_ADDRESS_1', required: false },
  { id: '7', type: 'Header', nexus: 'Currency', sage: 'CURRENCY_CODE', required: true },
  { id: '8', type: 'Header', nexus: 'Payment Terms', sage: 'TERM_CODE', required: false },
  { id: '9', type: 'Line Item', nexus: 'Item Code', sage: 'ITEM_NUMBER', required: true },
  { id: '10', type: 'Line Item', nexus: 'Quantity', sage: 'ORDERED_QTY', required: true },
  { id: '11', type: 'Line Item', nexus: 'Unit Price', sage: 'UNIT_PRICE', required: false },
  { id: '12', type: 'Line Item', nexus: 'Discount', sage: 'DISCOUNT_AMOUNT', required: false },
];

export const ERPIntegration = () => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'mapping'>('monitor');
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(mockLogs[0]);

  const columns: Column<ApiLog>[] = [
    { header: 'Timestamp', accessor: 'timestamp', className: 'text-sm font-medium text-slate-500' },
    { 
      header: 'Endpoint / Action', 
      accessor: (row) => (
        <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{row.endpoint}</span>
      ) 
    },
    { header: 'Execution Time', accessor: 'executionTime', className: 'text-sm font-semibold text-slate-700' },
    { 
      header: 'Status', 
      accessor: (row) => {
        const isSuccess = row.status === 'Success';
        const isFail = row.status === 'Failure';
        const Icon = isSuccess ? CheckCircle2 : (isFail ? XOctagon : RefreshCw);
        const colorClass = isSuccess ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 
                          (isFail ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-amber-600 bg-amber-50 border-amber-200');
        
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${colorClass} shadow-sm`}>
            <Icon className={`w-3.5 h-3.5 ${row.status === 'Retrying' ? 'animate-spin' : ''}`} /> {row.status}
          </span>
        );
      } 
    },
    { 
      header: 'Actions', 
      accessor: (row) => (
        <div className="flex items-center gap-1 justify-end">
          <button 
            onClick={() => setSelectedLog(row)}
            className={`p-1.5 rounded-md transition-colors title="View JSON" ${selectedLog?.id === row.id ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
          >
            <FileJson className="w-4 h-4" />
          </button>
          {row.status === 'Failure' && (
            <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Add to Retry Queue">
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Network className="w-8 h-8 text-indigo-500" /> ERP Integration
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Monitor API traffic or map Sales Order fields to Sage 300 ERP.</p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'monitor' ? (
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-all">
              <RefreshCw className="w-4 h-4 text-slate-400" /> Force Sync
            </button>
          ) : (
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5">
              <Save className="w-4 h-4" /> Save Mappings
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('monitor')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'monitor' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
        >
          <Activity className="w-4 h-4" /> API Monitoring
        </button>
        <button 
          onClick={() => setActiveTab('mapping')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'mapping' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
        >
          <ArrowRightLeft className="w-4 h-4" /> Data Mapping (Sales Orders)
        </button>
      </div>

      {activeTab === 'monitor' && (
        <div className="space-y-6">
          {/* System Status Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="rounded-2xl shadow-md shadow-emerald-200 border-none bg-emerald-500 text-white flex flex-col overflow-hidden">
              <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full gap-2">
                <Server className="w-6 h-6 opacity-80" />
                <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Sage 300</h3>
                <p className="text-xl font-black">Connected</p>
              </CardContent>
            </div>
            <div className="rounded-2xl shadow-md shadow-emerald-200 border-none bg-emerald-500 text-white flex flex-col overflow-hidden">
              <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full gap-2">
                <Activity className="w-6 h-6 opacity-80" />
                <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">API Status</h3>
                <p className="text-xl font-black">Healthy</p>
              </CardContent>
            </div>
            <div className="rounded-2xl shadow-md shadow-emerald-200 border-none bg-emerald-500 text-white flex flex-col overflow-hidden">
              <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full gap-2">
                <Network className="w-6 h-6 opacity-80" />
                <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Middleware</h3>
                <p className="text-xl font-black">Online</p>
              </CardContent>
            </div>
            <Card className="bg-white border-slate-200">
              <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full gap-2">
                <ShieldCheck className="w-6 h-6 text-indigo-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Authentication</h3>
                <p className="text-xl font-black text-slate-700">Valid Token</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-slate-200">
              <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full gap-2">
                <Clock className="w-6 h-6 text-blue-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Last Sync</h3>
                <p className="text-xl font-black text-slate-700">2 mins ago</p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Metrics Row */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Queue Status</p>
                <p className="text-2xl font-black text-slate-800">12<span className="text-sm font-semibold text-slate-500 ml-1">pending</span></p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Layers className="w-5 h-5" /></div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Sales Orders (24h)</p>
                <p className="text-2xl font-black text-slate-800">842</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-500"><ArrowRightLeft className="w-5 h-5" /></div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Success Responses</p>
                <p className="text-2xl font-black text-emerald-600">99.2%</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500"><CheckCircle2 className="w-5 h-5" /></div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Failure Responses</p>
                <p className="text-2xl font-black text-rose-600">0.8%</p>
              </div>
              <div className="p-3 bg-rose-50 rounded-xl text-rose-500"><XOctagon className="w-5 h-5" /></div>
            </div>
          </div>

          {/* Logs & JSON Viewer Split */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-[400px]">
            {/* Logs Table */}
            <Card className="xl:col-span-2 flex flex-col overflow-hidden">
              <CardHeader className="py-4 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-base"><Activity className="w-4 h-4 text-indigo-500 inline-block mr-2" /> Recent API Traffic</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-auto custom-scrollbar flex-1">
                <DataTable data={mockLogs} columns={columns} keyExtractor={(row) => row.id} />
              </CardContent>
            </Card>

            {/* JSON Viewer */}
            <Card className="flex flex-col overflow-hidden border-slate-800 bg-slate-900 shadow-xl">
              <CardHeader className="py-3 px-4 border-b border-slate-800 bg-slate-950 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-mono text-slate-300 flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-indigo-400" /> Response Viewer
                </CardTitle>
                {selectedLog && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    selectedLog.status === 'Success' ? 'bg-emerald-500/20 text-emerald-400' : 
                    (selectedLog.status === 'Failure' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400')
                  }`}>
                    {selectedLog.status}
                  </span>
                )}
              </CardHeader>
              <CardContent className="p-0 flex-1 relative">
                {selectedLog ? (
                  <pre className="p-4 text-xs font-mono text-indigo-200 overflow-auto h-full absolute inset-0 custom-scrollbar">
                    <code>{selectedLog.payload}</code>
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <FileJson className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm font-medium">Select a log to view JSON</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'mapping' && (
        <Card className="flex-1 shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base text-slate-800">Sales Order Payload Schema</CardTitle>
              <p className="text-sm text-slate-500 mt-1">Map incoming Purchase Order extracted fields directly to the target Sage 300 API fields.</p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Nexus PO Field</th>
                    <th className="py-3 px-6 w-10 text-center"></th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Sage 300 Target Field</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fieldMappings.map((mapping) => (
                    <tr key={mapping.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${mapping.type === 'Header' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                          {mapping.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-700 text-sm">
                        {mapping.nexus}
                      </td>
                      <td className="py-4 px-6 text-center text-slate-300">
                        <ArrowRight className="w-4 h-4 mx-auto" />
                      </td>
                      <td className="py-4 px-6">
                        <input 
                          type="text" 
                          defaultValue={mapping.sage}
                          className="w-full max-w-xs px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-mono text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        />
                      </td>
                      <td className="py-4 px-6">
                        {mapping.required ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-rose-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Yes
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-slate-400">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
