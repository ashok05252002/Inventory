import { useState } from 'react';
import { Mail, FolderSync, Clock, RefreshCw, FileText, AlertCircle, HardDrive, DownloadCloud, Activity, ShieldCheck, Server } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';

const mockWaitingDocs = [
  { id: '1', filename: 'INV_GlobalLogistics_001.pdf', source: 'invoices@nexuserp.com', receivedAt: '2 mins ago', size: '2.4 MB', status: 'Pending OCR' },
  { id: '2', filename: 'PO_TechNova_4922.pdf', source: 'orders@nexuserp.com', receivedAt: '15 mins ago', size: '1.1 MB', status: 'Pending OCR' },
  { id: '3', filename: 'SupplierList_Updated.xlsx', source: 'Shared Folder (SFTP)', receivedAt: '1 hour ago', size: '4.8 MB', status: 'Queued' },
];

const mockFailedDocs = [
  { id: '1', filename: 'Unknown_Attachment.zip', source: 'invoices@nexuserp.com', error: 'Unsupported File Type', timestamp: '3 hours ago' },
  { id: '2', filename: 'Corrupted_Scan.pdf', source: 'Shared Folder (SMB)', error: 'File Corrupted / Unreadable', timestamp: '5 hours ago' },
];

export const DocumentCollection = () => {
  const [isScanning, setIsScanning] = useState(false);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const waitingColumns: Column<any>[] = [
    { 
      header: 'Filename', 
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-500" />
          <span className="font-bold text-slate-800">{row.filename}</span>
        </div>
      ) 
    },
    { header: 'Source', accessor: 'source', className: 'text-slate-600' },
    { header: 'Size', accessor: 'size', className: 'text-sm text-slate-500' },
    { header: 'Received', accessor: 'receivedAt', className: 'text-sm font-medium text-slate-500' },
    { 
      header: 'Status', 
      accessor: (row) => (
        <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-md flex items-center gap-1 w-max">
          <Clock className="w-3 h-3" /> {row.status}
        </span>
      ) 
    },
  ];

  const failedColumns: Column<any>[] = [
    { 
      header: 'Filename', 
      accessor: (row) => (
        <span className="font-bold text-rose-600">{row.filename}</span>
      ) 
    },
    { header: 'Source', accessor: 'source', className: 'text-slate-600' },
    { header: 'Error Reason', accessor: 'error', className: 'font-semibold text-slate-700' },
    { header: 'Timestamp', accessor: 'timestamp', className: 'text-sm text-slate-500' },
    { 
      header: 'Action', 
      accessor: () => (
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded">Retry</button>
      ) 
    },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <DownloadCloud className="w-8 h-8 text-indigo-500" /> Document Collection
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Monitor mailboxes and shared network folders for incoming documents.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={triggerScan}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} /> 
            {isScanning ? 'Scanning...' : 'Manual Scan Now'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Inbox Monitor */}
        <Card className="border-slate-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="w-5 h-5 text-blue-500" /> Connected Mailboxes
              </CardTitle>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Authenticated
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-white">
                <div>
                  <p className="font-bold text-slate-800">invoices@nexuserp.com</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> Scans every 5 mins</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">12 New</p>
                  <p className="text-xs text-slate-400">Last scan: 2 mins ago</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-white">
                <div>
                  <p className="font-bold text-slate-800">orders@nexuserp.com</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> Scans every 10 mins</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">4 New</p>
                  <p className="text-xs text-slate-400">Last scan: 8 mins ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shared Folder Monitor */}
        <Card className="border-slate-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FolderSync className="w-5 h-5 text-amber-500" /> Shared Folder Monitor
              </CardTitle>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded flex items-center gap-1">
                <Activity className="w-3 h-3" /> Active Watch
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-white">
                <div>
                  <p className="font-bold text-slate-800 font-mono text-sm">\\\\NEXUS-FS01\\DropFolder</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><HardDrive className="w-3 h-3" /> SMB Share (1.2 GB used)</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">Live Sync</p>
                  <p className="text-xs text-slate-400">Status: Listening</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-white">
                <div>
                  <p className="font-bold text-slate-800 font-mono text-sm">sftp://secure.nexuserp.com/incoming</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Server className="w-3 h-3" /> SFTP Gateway</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">1 New</p>
                  <p className="text-xs text-slate-400">Last sync: 1 hr ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        <Card className="xl:col-span-2 flex flex-col overflow-hidden shadow-md">
          <CardHeader className="py-4 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> Documents Waiting for Processing</CardTitle>
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">17 Total in Queue</span>
          </CardHeader>
          <CardContent className="p-0 overflow-auto flex-1">
            <DataTable data={mockWaitingDocs} columns={waitingColumns} keyExtractor={(row) => row.id} />
          </CardContent>
        </Card>

        <Card className="flex flex-col overflow-hidden shadow-md border-rose-100">
          <CardHeader className="py-4 border-b border-rose-50 bg-rose-50/30 flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2 text-rose-800"><AlertCircle className="w-4 h-4 text-rose-500" /> Failed Downloads</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-auto flex-1">
            <DataTable data={mockFailedDocs} columns={failedColumns} keyExtractor={(row) => row.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
