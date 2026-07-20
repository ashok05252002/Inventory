import { useState } from 'react';
import { ArrowLeft, Edit, Share2, CheckCircle2, XCircle, Printer, Download, Mail, Copy, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

export const QuotationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Draft'); // Draft, Sent, Approved, Rejected
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  // Mock quotation data
  const quote = {
    id: id || 'QT-2026-001',
    customer: 'Alpha Corp',
    contact: 'John Smith',
    email: 'john.smith@alphacorp.com',
    date: 'Jul 20, 2026',
    validUntil: 'Aug 20, 2026',
    salesRep: 'Sarah Jenkins',
    notes: 'Includes 10% volume discount as discussed.',
    items: [
      { id: '1', sku: 'SKU-8921', desc: 'Dell XPS 15 Laptop', qty: 2, unitPrice: 6500, total: 13000 },
      { id: '2', sku: 'SKU-8922', desc: 'Logitech MX Master 3S', qty: 5, unitPrice: 400, total: 2000 },
    ],
    subtotal: 15000,
    tax: 750,
    total: 15750
  };

  const handleApprove = () => {
    setStatus('Approved');
  };

  const handleReject = () => {
    setStatus('Rejected');
  };

  const handleShare = () => {
    setIsShareModalOpen(false);
  };

  const handleConvertToSO = () => {
    setIsConvertModalOpen(false);
    // In a real app, we would generate the SO in the backend and navigate to it.
    navigate('/sales-orders');
  };

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/quotations" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{quote.id}</h1>
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                'bg-amber-50 text-amber-600 border-amber-200'
              }`}>
                {status}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1 font-medium">Customer: <span className="text-slate-700 font-semibold">{quote.customer}</span></p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {status === 'Approved' && (
            <button 
              onClick={() => setIsConvertModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200">
              <CheckCircle2 className="w-4 h-4" /> Convert to Sales Order
            </button>
          )}
          {status !== 'Approved' && status !== 'Rejected' && (
            <>
              <button 
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 border border-emerald-200 text-sm font-semibold rounded-lg hover:bg-emerald-200 transition-all">
                <CheckCircle2 className="w-4 h-4" /> Approve
              </button>
              <button 
                onClick={handleReject}
                className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 border border-rose-200 text-sm font-semibold rounded-lg hover:bg-rose-200 transition-all">
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </>
          )}
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
            <Share2 className="w-4 h-4" /> Share with Customer
          </button>
          <button className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all">
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Details & Items */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-center">
                <CardTitle>Line Items</CardTitle>
                <button className="text-sm font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-800">
                  <Edit className="w-4 h-4" /> Edit Items
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500 font-bold">
                      <th className="p-4">Item</th>
                      <th className="p-4 text-center">Qty</th>
                      <th className="p-4 text-right">Unit Price</th>
                      <th className="p-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {quote.items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="p-4">
                          <p className="font-bold text-slate-800">{item.sku}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </td>
                        <td className="p-4 text-center font-semibold text-slate-700">{item.qty}</td>
                        <td className="p-4 text-right font-medium text-slate-600">AED {item.unitPrice.toLocaleString()}</td>
                        <td className="p-4 text-right font-bold text-indigo-600">AED {item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-slate-50 flex justify-end">
                <div className="w-64 space-y-3">
                  <div className="flex justify-between text-sm font-medium text-slate-500">
                    <span>Subtotal</span>
                    <span>AED {quote.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-slate-500">
                    <span>Tax (5%)</span>
                    <span>AED {quote.tax.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between text-lg font-black text-slate-900">
                    <span>Total</span>
                    <span>AED {quote.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Info & Notes */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-slate-100">
              <CardTitle>Quotation Details</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Customer</p>
                <p className="font-semibold text-slate-800">{quote.customer}</p>
                <p className="text-sm text-slate-500">{quote.contact}</p>
                <p className="text-sm text-indigo-600">{quote.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Quote Date</p>
                  <p className="font-semibold text-slate-800">{quote.date}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Valid Until</p>
                  <p className="font-semibold text-slate-800">{quote.validUntil}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Sales Rep</p>
                <p className="font-semibold text-slate-800">{quote.salesRep}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-slate-100">
              <CardTitle>Notes & Terms</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600 leading-relaxed">{quote.notes}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Share Modal */}
      <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} title="Share Quotation">
        <div className="space-y-5">
          <p className="text-sm text-slate-500">Send this quotation to the customer via email or share a direct link.</p>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <LinkIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <p className="text-sm font-medium text-slate-600 truncate">https://nexus.erp/quote/{quote.id}</p>
            </div>
            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors flex-shrink-0 text-slate-500 hover:text-indigo-600">
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">To:</label>
              <input type="email" defaultValue={quote.email} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Message:</label>
              <textarea 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none resize-none" 
                rows={4}
                defaultValue={`Hi ${quote.contact},\n\nPlease find attached the quotation ${quote.id} for your review.\n\nBest regards,\n${quote.salesRep}`}
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsShareModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all">
              <Mail className="w-4 h-4" /> Send Email
            </button>
          </div>
        </div>
      </Modal>

      {/* Convert to SO Modal */}
      <Modal isOpen={isConvertModalOpen} onClose={() => setIsConvertModalOpen(false)} title="Convert to Sales Order">
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-900">Ready for Conversion</h4>
              <p className="text-sm text-emerald-700 mt-1">This quotation has been approved and is ready to be converted into a Sales Order. All line items and customer details will be carried over automatically.</p>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setIsConvertModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={handleConvertToSO} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all">
              Confirm Conversion
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
