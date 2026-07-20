import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, FileText, ArrowRight, CornerDownRight, RotateCw, AlertTriangle, ShieldCheck, Clock, Zap, ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';

interface ExtractedLineItem {
  id: string;
  item: string;
  description: string;
  quantity: string;
  uom: string;
  price: string;
  discount: string;
  tax: string;
  amount: string;
}

const extractedItems: ExtractedLineItem[] = [
  { id: '1', item: 'ITM-01', description: 'Office Chair', quantity: '12', uom: 'EA', price: '450.00', discount: '0.00', tax: '5%', amount: '5,400.00' },
  { id: '2', item: 'ITM-02', description: 'Standing Desk', quantity: '5', uom: 'EA', price: '1200.00', discount: '50.00', tax: '5%', amount: '5,950.00' },
];

const columns: Column<ExtractedLineItem>[] = [
  { header: 'Item', accessor: 'item', className: 'font-semibold text-slate-800' },
  { header: 'Description', accessor: 'description', className: 'text-sm font-medium text-slate-600' },
  { header: 'Qty', accessor: 'quantity', className: 'font-bold text-slate-800' },
  { header: 'UOM', accessor: 'uom', className: 'text-sm font-medium text-slate-500' },
  { header: 'Price', accessor: 'price', className: 'font-semibold text-slate-700' },
  { header: 'Discount', accessor: 'discount', className: 'text-sm font-medium text-amber-600' },
  { header: 'Tax', accessor: 'tax', className: 'text-sm font-medium text-slate-500' },
  { header: 'Amount', accessor: 'amount', className: 'font-bold text-indigo-600 text-right' },
];

export const DocumentValidation = () => {
  const { id } = useParams();

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 absolute inset-0 bg-slate-100">
      {/* Sticky Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/document-processing" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-slate-200"></div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none">Validating: {id || 'DOC-9982'}</h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">Source: Email • Uploaded: Today, 10:45 AM</p>
          </div>
        </div>
        
        {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
            <span>Inbox</span> <ArrowRight className="w-3 h-3" /> <span className="text-indigo-600">Document #{id}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Zap className="w-7 h-7 text-indigo-500" /> Validation Center
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-colors">
            <RotateCw className="w-4 h-4" /> Reprocess
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold rounded-xl hover:bg-rose-100 shadow-sm transition-colors">
            <XCircle className="w-4 h-4" /> Reject
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5">
            <CheckCircle2 className="w-4 h-4" /> Approve & Send to ERP
          </button>
        </div>
      </div>
      </header>

      {/* Split Screen Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Document Viewer */}
        <div className="w-1/2 flex flex-col bg-slate-800 border-r border-slate-300 relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm rounded-lg p-1 z-10 border border-slate-700 shadow-xl">
            <button className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs font-bold text-slate-300 px-2">100%</span>
            <button className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"><ZoomIn className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 overflow-auto p-8 flex justify-center custom-scrollbar">
            {/* Fake PDF Page Placeholder */}
            <div className="w-full max-w-2xl bg-white shadow-2xl aspect-[1/1.4] p-12 relative flex flex-col">
              <div className="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">PURCHASE ORDER</h2>
                  <p className="text-slate-500 font-bold mt-2">PO-2026-9982</p>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold text-slate-800">TechNova Solutions</h3>
                  <p className="text-sm text-slate-500">contact@technova.ae</p>
                </div>
              </div>
              <div className="flex-1 border-2 border-dashed border-indigo-400 bg-indigo-50/50 flex flex-col items-center justify-center rounded-lg opacity-80">
                <p className="text-indigo-600 font-bold text-lg">Document Source Image</p>
                <p className="text-sm text-indigo-400 mt-2">OCR engine highlights would appear here.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: OCR Results */}
        <div className="w-1/2 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-6">
            
            {/* Confidence Score */}
            <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
              {/* Engine Info */}
              <Card className="bg-slate-900 border-slate-800 text-slate-300">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-white">Nexus AI Engine v4.2</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Processed in 1.4s</span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">98% Confidence</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1 flex flex-col shadow-xl">
                <CardHeader className="py-3 px-4 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between">
                  <CardTitle className="text-base text-slate-800">Extracted Data</CardTitle>
                  <div className="flex items-center gap-2 text-xs font-bold px-2 py-1 bg-amber-50 text-amber-600 rounded border border-amber-200">
                    <AlertTriangle className="w-3 h-3" /> 1 Warning
                  </div>
                </CardHeader>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4 shadow-sm m-4">
                  <div className="w-12 h-12 rounded-full border-4 border-amber-400 flex items-center justify-center bg-white flex-shrink-0">
                    <span className="font-black text-amber-600 text-sm">85%</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Requires Validation
                    </h3>
                    <p className="text-sm font-medium text-amber-700 mt-0.5">Please review the highlighted fields for accuracy before approving.</p>
                  </div>
                </div>

                {/* Header Fields Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Header Fields</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Customer Name</label>
                        <input type="text" defaultValue="TechNova Solutions" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Customer Code</label>
                        <input type="text" defaultValue="TN-001" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">PO Number</label>
                        <input type="text" defaultValue="PO-2026-9982" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-amber-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Date
                        </label>
                        <input type="text" defaultValue="20-Jul-26" className="w-full px-3 py-2 bg-amber-50 border border-amber-300 rounded-lg text-sm font-semibold text-amber-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Delivery Date</label>
                        <input type="text" defaultValue="30-Jul-26" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Currency</label>
                        <input type="text" defaultValue="AED" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Payment Terms</label>
                        <input type="text" defaultValue="Net 30" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Reference</label>
                        <input type="text" defaultValue="REF-48291" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" />
                      </div>
                      <div className="col-span-2 grid grid-cols-2 gap-x-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Billing Address</label>
                          <textarea rows={2} defaultValue="Dubai Silicon Oasis, HQ Building" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm custom-scrollbar" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Shipping Address</label>
                          <textarea rows={2} defaultValue="Warehouse 4, JAFZA, Dubai" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm custom-scrollbar" />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Remarks</label>
                        <textarea rows={2} defaultValue="Urgent delivery required." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm custom-scrollbar" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Extracted Line Items */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Line Items</CardTitle>
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Add Row</button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <DataTable data={extractedItems} columns={columns} keyExtractor={(row) => row.id} />
                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
                      <span className="text-sm font-bold text-slate-500 uppercase mr-4">Total Amount</span>
                      <span className="text-xl font-black text-indigo-600">AED 11,400.00</span>
                    </div>
                  </CardContent>
                </Card>

              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
