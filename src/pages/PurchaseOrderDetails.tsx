import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Edit, Building2, MapPin, CheckCircle2, FileText, AlertTriangle, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';

interface LineItem {
  id: string;
  itemCode: string;
  description: string;
  quantity: number;
  uom: string;
  price: string;
  discount: string;
  tax: string;
  amount: string;
}

const lineItemsData: LineItem[] = [
  { id: '1', itemCode: 'ITM-9281', description: '4K CCTV Security Camera - Night Vision, IP67', quantity: 5, uom: 'EA', price: 'AED 1,200.00', discount: '5%', tax: '5%', amount: 'AED 5,985.00' },
  { id: '2', itemCode: 'ITM-9282', description: 'CCTV Coaxial Cable (RG59) 100m Roll', quantity: 10, uom: 'Roll', price: 'AED 150.00', discount: '0%', tax: '5%', amount: 'AED 1,575.00' },
  { id: '3', itemCode: 'ITM-9283', description: 'NVR 8-Channel Recorder - 4TB HDD', quantity: 1, uom: 'EA', price: 'AED 1,800.00', discount: '10%', tax: '5%', amount: 'AED 1,701.00' },
];

const columns: Column<LineItem>[] = [
  { header: 'Item Code', accessor: 'itemCode', className: 'font-semibold text-indigo-600 whitespace-nowrap' },
  { header: 'Description', accessor: 'description', className: 'font-medium text-slate-800' },
  { header: 'Qty', accessor: 'quantity', className: 'font-bold text-slate-700' },
  { header: 'UOM', accessor: 'uom', className: 'text-slate-500 font-medium' },
  { header: 'Price', accessor: 'price', className: 'font-semibold text-slate-700 whitespace-nowrap' },
  { header: 'Discount', accessor: 'discount', className: 'text-rose-500 font-medium' },
  { header: 'Tax', accessor: 'tax', className: 'text-slate-500 font-medium' },
  { header: 'Total Amount', accessor: 'amount', className: 'font-bold text-slate-900 text-right whitespace-nowrap' },
];

export const PurchaseOrderDetails = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header Navigation */}
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/purchase-orders" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Purchase Orders
        </Link>
        <span>/</span>
        <span className="text-slate-800">{id || 'PO-2026-001'}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{id || 'PO-2026-001'}</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4" /> Approved
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm">
              <Activity className="w-4 h-4" /> ERP Synced
            </span>
          </div>
          <p className="text-slate-500 mt-2 font-medium">Processed from Email on Jul 20, 2026 at 10:45 AM.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-all">
            <Printer className="w-4 h-4 text-slate-400" /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
            <Edit className="w-4 h-4" /> Edit PO
          </button>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle><Building2 className="w-5 h-5 text-indigo-500" /> Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Customer Name <span className="text-rose-500">*</span></label>
                  <input type="text" defaultValue="CableTech Mfg" className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Customer Code <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input type="text" defaultValue="" placeholder="Missing code..." className="w-full px-3 py-2 border-2 border-amber-400 bg-amber-50 rounded-lg text-amber-900 placeholder:text-amber-600/50" />
                    <AlertTriangle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-[10px] text-amber-600 font-bold mt-1">Validation: Missing Customer Code</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">PO Number <span className="text-rose-500">*</span></label>
                  <input type="text" defaultValue="PO-2024-001" className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">PO Date</label>
                  <div className="relative">
                    <input type="date" defaultValue="2024-03-15" className="w-full px-3 py-2 border-2 border-rose-400 bg-rose-50 rounded-lg text-rose-900" />
                    <AlertTriangle className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
                  </div>
                  <p className="text-[10px] text-rose-600 font-bold mt-1">Validation: Date is in the future</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Currency</label>
                  <input type="text" defaultValue="AED" className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" disabled />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Payment Terms</label>
                  <input type="text" defaultValue="Net 30" className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><FileText className="w-5 h-5 text-purple-500" /> Commercial Terms</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-500">Currency</span>
                  <span className="text-sm font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">AED</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-500">Payment Terms</span>
                  <span className="text-sm font-bold text-slate-800">Net 30 Days</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-500 block mb-1">Remarks</span>
                  <p className="text-sm font-medium text-slate-700 bg-amber-50 border border-amber-100 p-3 rounded-lg">Please ensure fragile packing for the cameras.</p>
                </div>
              </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><MapPin className="w-5 h-5 text-emerald-500" /> Billing Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-bold text-slate-800 mb-1">Finance Department</p>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              Office 1402, Al Silila Tower<br />
              Sheikh Zayed Road<br />
              Dubai, United Arab Emirates<br />
              PO Box: 12345
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><MapPin className="w-5 h-5 text-blue-500" /> Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-bold text-slate-800 mb-1">Central Warehouse</p>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              Warehouse Block B-4<br />
              Dubai Investment Park (DIP 1)<br />
              Dubai, United Arab Emirates<br />
              Attn: Receiving Manager
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Line Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable data={lineItemsData} columns={columns} keyExtractor={(row) => row.id} />
          <div className="p-6 bg-slate-50 border-t border-slate-200">
            <div className="max-w-xs ml-auto space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-500">Subtotal</span>
                <span className="font-bold text-slate-800">AED 9,300.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-500">Discount</span>
                <span className="font-bold text-rose-500">- AED 480.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-500">Tax (5% VAT)</span>
                <span className="font-bold text-slate-800">AED 441.00</span>
              </div>
              <div className="flex justify-between text-lg pt-3 border-t border-slate-200">
                <span className="font-extrabold text-slate-900">Total</span>
                <span className="font-extrabold text-indigo-600">AED 9,261.00</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
