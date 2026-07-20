import React from 'react';
import { UploadCloud, FileType, FileText, FileSpreadsheet, Eye, MoreHorizontal, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';

interface DocumentModel {
  id: string;
  filename: string;
  type: string;
  uploadDate: string;
  source: string;
  status: string;
  confidence: string;
}

const documentData: DocumentModel[] = [
  { id: 'DOC-9982', filename: 'PO-TechNova-Final.pdf', type: 'PDF', uploadDate: 'Jul 20, 2026 10:45 AM', source: 'Email', status: 'Requires Validation', confidence: '85%' },
  { id: 'DOC-9981', filename: 'Apex_Supplies_Order.docx', type: 'Word', uploadDate: 'Jul 20, 2026 09:12 AM', source: 'Manual', status: 'Processed', confidence: '99%' },
  { id: 'DOC-9980', filename: 'Bulk_Order_Q3.xlsx', type: 'Excel', uploadDate: 'Jul 19, 2026 04:30 PM', source: 'API', status: 'Failed', confidence: '20%' },
  { id: 'DOC-9979', filename: 'Nexus_Hardware_PO.pdf', type: 'PDF', uploadDate: 'Jul 19, 2026 02:15 PM', source: 'Email', status: 'Requires Validation', confidence: '72%' },
];

const columns: Column<DocumentModel>[] = [
  { 
    header: 'Document ID', 
    accessor: (row) => (
      <Link to={`/document-processing/${row.id}`} className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
        {row.id}
      </Link>
    ) 
  },
  { 
    header: 'File Name', 
    accessor: (row) => (
      <div className="flex items-center gap-2">
        {row.type === 'PDF' && <FileText className="w-4 h-4 text-rose-500" />}
        {row.type === 'Excel' && <FileSpreadsheet className="w-4 h-4 text-emerald-500" />}
        {row.type === 'Word' && <FileType className="w-4 h-4 text-blue-500" />}
        <span className="font-medium text-slate-800">{row.filename}</span>
      </div>
    ) 
  },
  { header: 'Upload Date', accessor: 'uploadDate', className: 'text-sm font-medium text-slate-500' },
  { header: 'Source', accessor: 'source', className: 'text-sm font-semibold text-slate-600' },
  { 
    header: 'Status', 
    accessor: (row) => {
      const isProcessed = row.status === 'Processed';
      const isFailed = row.status === 'Failed';
      const Icon = isProcessed ? CheckCircle2 : (isFailed ? AlertCircle : Clock);
      const color = isProcessed ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 
                   (isFailed ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-amber-600 bg-amber-50 border-amber-200');
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${color} shadow-sm`}>
          <Icon className="w-3.5 h-3.5" /> {row.status}
        </span>
      );
    } 
  },
  { 
    header: 'OCR Confidence', 
    accessor: (row) => {
      const num = parseInt(row.confidence);
      const color = num > 90 ? 'text-emerald-600' : (num > 70 ? 'text-amber-600' : 'text-rose-600');
      return <span className={`font-bold ${color}`}>{row.confidence}</span>;
    }
  },
  { 
    header: 'Actions', 
    accessor: (row) => (
      <div className="flex items-center gap-2 justify-end">
        <Link to={`/document-processing/${row.id}`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Review">
          <Eye className="w-4 h-4" />
        </Link>
        <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    ),
    className: 'text-right'
  }
];

export const DocumentProcessing = () => {
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Document Inbox</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Upload and manage unstructured purchase orders for OCR extraction.</p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white border-2 border-dashed border-indigo-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-indigo-50/50 hover:border-indigo-400 transition-all cursor-pointer group shadow-sm">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
          <UploadCloud className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">Drag & Drop documents here</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium max-w-md">
          Supported files: <span className="font-semibold text-slate-700">PDF, Excel (.xlsx), Word (.docx)</span>. 
          Maximum file size is 25MB.
        </p>
        <button className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:bg-indigo-700 transition-all hover:-translate-y-0.5">
          Browse Files
        </button>
      </div>

      {/* Document Grid */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-lg">Processing Queue</h3>
        </div>
        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={documentData} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>
    </div>
  );
};
