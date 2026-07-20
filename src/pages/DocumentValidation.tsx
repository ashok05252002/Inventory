import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, RotateCw, AlertTriangle, ShieldCheck, Clock, Zap, ArrowLeft, ZoomIn, ZoomOut, Link as LinkIcon, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface QuoteItem {
  id: string;
  sku: string;
  desc: string;
  qty: number;
  price: number;
}

interface POItem {
  id: string;
  extractedSku: string;
  extractedDesc: string;
  extractedQty: number;
  extractedPrice: number;
  mappedQuoteItemId: string | null;
}

const quoteData: QuoteItem[] = [
  { id: 'q1', sku: 'SKU-8921', desc: 'Dell XPS 15 Laptop', qty: 2, price: 6500 },
  { id: 'q2', sku: 'SKU-8922', desc: 'Logitech MX Master 3S', qty: 5, price: 400 },
];

const initialPOItems: POItem[] = [
  { id: 'p1', extractedSku: 'SKU-8921', extractedDesc: 'Dell XPS 15', extractedQty: 2, extractedPrice: 6500, mappedQuoteItemId: 'q1' }, // Exact match
  { id: 'p2', extractedSku: 'SKU-8922', extractedDesc: 'MX Master Mouse', extractedQty: 4, extractedPrice: 400, mappedQuoteItemId: 'q2' }, // Qty mismatch (4 instead of 5)
  { id: 'p3', extractedSku: 'SKU-9999', extractedDesc: 'Extra Warranty', extractedQty: 1, extractedPrice: 500, mappedQuoteItemId: null }, // Unmapped
];

export const DocumentValidation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [selectedQuote, setSelectedQuote] = useState('');
  const [poItems, setPoItems] = useState<POItem[]>(initialPOItems);
  
  // Calculate if everything is mapped and matches
  const validationStatus = useMemo(() => {
    if (selectedQuote === '') return { isValid: false, issues: 0 };
    
    let issues = 0;
    poItems.forEach(poItem => {
      if (!poItem.mappedQuoteItemId) {
        issues++;
      } else {
        const quoteItem = quoteData.find(q => q.id === poItem.mappedQuoteItemId);
        if (quoteItem) {
          if (quoteItem.qty !== poItem.extractedQty || quoteItem.price !== poItem.extractedPrice) {
            issues++;
          }
        }
      }
    });
    
    return { isValid: issues === 0, issues };
  }, [selectedQuote, poItems]);

  const handleMapItem = (poItemId: string, quoteItemId: string) => {
    setPoItems(prev => prev.map(item => item.id === poItemId ? { ...item, mappedQuoteItemId: quoteItemId === '' ? null : quoteItemId } : item));
  };

  const handleApproveDiscrepancy = (poItemId: string) => {
    // "Approving" a discrepancy means we force the PO quantity/price to match the quote, or accept the PO terms. 
    // For simplicity, let's update the PO item to match the quote item exactly so it passes validation.
    setPoItems(prev => prev.map(item => {
      if (item.id === poItemId && item.mappedQuoteItemId) {
        const qItem = quoteData.find(q => q.id === item.mappedQuoteItemId);
        if (qItem) {
          return { ...item, extractedQty: qItem.qty, extractedPrice: qItem.price };
        }
      }
      return item;
    }));
  };

  const handleCreateSalesOrder = () => {
    if (validationStatus.isValid) {
      navigate('/sales-orders');
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 absolute inset-0 bg-slate-100">
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/document-processing" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-8 w-px bg-slate-200"></div>
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-0.5">
              <span>Inbox</span> <ArrowRight className="w-3 h-3" /> <span className="text-indigo-600">Document #{id || 'PO-9982'}</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-500" /> Validation Center
            </h1>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 shadow-sm transition-colors">
            <RotateCw className="w-4 h-4" /> Reprocess
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold rounded-xl hover:bg-rose-100 shadow-sm transition-colors">
            <XCircle className="w-4 h-4" /> Reject
          </button>
          <button 
            disabled={!validationStatus.isValid}
            onClick={handleCreateSalesOrder}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-xl transition-all shadow-md ${
              validationStatus.isValid 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200 hover:-translate-y-0.5' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
            }`}>
            <CheckCircle2 className="w-4 h-4" /> Create Sales Order
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Document Viewer */}
        <div className="w-1/2 flex flex-col bg-slate-800 border-r border-slate-300 relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm rounded-lg p-1 z-10 border border-slate-700 shadow-xl">
            <button className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs font-bold text-slate-300 px-2">100%</span>
            <button className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"><ZoomIn className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 overflow-auto p-8 flex justify-center custom-scrollbar">
            <div className="w-full max-w-2xl bg-white shadow-2xl aspect-[1/1.4] p-12 relative flex flex-col">
              <div className="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">PURCHASE ORDER</h2>
                  <p className="text-slate-500 font-bold mt-2">PO-2026-9982</p>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold text-slate-800">Alpha Corp</h3>
                  <p className="text-sm text-slate-500">accounts@alphacorp.com</p>
                </div>
              </div>
              <div className="flex-1 border-2 border-dashed border-indigo-400 bg-indigo-50/50 flex flex-col items-center justify-center rounded-lg opacity-80 relative overflow-hidden">
                <p className="text-indigo-600 font-bold text-lg z-10">Document Source Image</p>
                <p className="text-sm text-indigo-400 mt-2 z-10">OCR engine highlights would appear here.</p>
                <div className="absolute inset-0 bg-indigo-500/5 mix-blend-multiply pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: OCR Results & Validation */}
        <div className="w-1/2 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar pb-12">
          <div className="p-6 space-y-6">
            
            <Card className="bg-slate-900 border-slate-800 text-slate-300">
              <CardContent className="p-4">
                <div className="flex justify-between items-center text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-bold">Nexus AI Engine v4.2</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Processed in 1.4s</span>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">98% Confidence</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-100 shadow-md">
              <CardHeader className="bg-indigo-50/50 border-b border-indigo-50 py-4">
                <CardTitle className="text-base text-indigo-900 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-indigo-500" /> Link to Approved Quotation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <select 
                      value={selectedQuote} 
                      onChange={(e) => setSelectedQuote(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm cursor-pointer"
                    >
                      <option value="">-- Select a Quotation to validate against --</option>
                      <option value="QT-2026-001">QT-2026-001 (Alpha Corp) - AED 15,750.00</option>
                    </select>
                  </div>
                  {selectedQuote !== '' && (
                    <div className="flex-shrink-0">
                      <Link to={`/quotations/${selectedQuote}`} target="_blank" className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                        <FileText className="w-4 h-4" /> View Quote
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {selectedQuote !== '' && (
              <Card className="flex-1 flex flex-col shadow-xl border-t-4 border-t-indigo-500">
                <CardHeader className="py-4 px-5 border-b border-slate-100 bg-white flex flex-row items-center justify-between">
                  <CardTitle className="text-base text-slate-800">Line Mapping: PO vs Quotation</CardTitle>
                  {!validationStatus.isValid ? (
                    <div className="flex items-center gap-2 text-xs font-bold px-2 py-1 bg-amber-50 text-amber-600 rounded border border-amber-200">
                      <AlertTriangle className="w-3 h-3" /> {validationStatus.issues} Action(s) Required
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> All Lines Validated
                    </div>
                  )}
                </CardHeader>
                
                <div className="p-0 overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-3 font-semibold text-slate-600 bg-slate-100/50 w-2/5">Extracted PO Item</th>
                        <th className="p-3 font-semibold text-slate-600 bg-indigo-50/30 w-2/5">Matched Quote Item</th>
                        <th className="p-3 font-semibold text-slate-600 w-1/5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {poItems.map((po) => {
                        const qItem = po.mappedQuoteItemId ? quoteData.find(q => q.id === po.mappedQuoteItemId) : null;
                        const isQtyMatch = qItem && qItem.qty === po.extractedQty;
                        const isPriceMatch = qItem && qItem.price === po.extractedPrice;
                        const isExactMatch = qItem && isQtyMatch && isPriceMatch;
                        
                        return (
                          <tr key={po.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 bg-slate-50/30 align-top">
                              <p className="font-bold text-slate-800">{po.extractedSku}</p>
                              <p className="text-xs text-slate-500 mb-1 truncate w-40">{po.extractedDesc}</p>
                              <div className="flex gap-2 text-xs">
                                <span className="font-medium text-slate-600">Qty: <span className="font-bold text-slate-800">{po.extractedQty}</span></span>
                                <span className="font-medium text-slate-600">Price: <span className="font-bold text-slate-800">AED {po.extractedPrice}</span></span>
                              </div>
                            </td>
                            
                            <td className="p-3 align-top bg-indigo-50/10 border-l border-slate-100">
                              {qItem ? (
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <select 
                                      value={po.mappedQuoteItemId || ''}
                                      onChange={(e) => handleMapItem(po.id, e.target.value)}
                                      className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5 outline-none cursor-pointer hover:border-indigo-300"
                                    >
                                      <option value="">Unmap</option>
                                      {quoteData.map(q => <option key={q.id} value={q.id}>{q.sku}</option>)}
                                    </select>
                                  </div>
                                  <p className="text-xs text-slate-500 mb-1 truncate w-40">{qItem.desc}</p>
                                  <div className="flex gap-2 text-xs">
                                    <span className={`font-medium ${!isQtyMatch ? 'text-amber-600 font-bold bg-amber-50 px-1 rounded' : 'text-slate-600'}`}>Qty: {qItem.qty}</span>
                                    <span className={`font-medium ${!isPriceMatch ? 'text-amber-600 font-bold bg-amber-50 px-1 rounded' : 'text-slate-600'}`}>Price: AED {qItem.price}</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full flex flex-col justify-center gap-2">
                                  <p className="text-xs font-medium text-rose-500">No match found.</p>
                                  <select 
                                    value=""
                                    onChange={(e) => handleMapItem(po.id, e.target.value)}
                                    className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 rounded px-1.5 py-1 outline-none cursor-pointer w-full max-w-[150px]"
                                  >
                                    <option value="">Select Quote Item</option>
                                    {quoteData.map(q => <option key={q.id} value={q.id}>{q.sku}</option>)}
                                  </select>
                                </div>
                              )}
                            </td>
                            
                            <td className="p-3 align-middle text-center border-l border-slate-100">
                              {qItem ? (
                                isExactMatch ? (
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Match
                                  </span>
                                ) : (
                                  <div className="flex flex-col items-center gap-2">
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                                      <AlertTriangle className="w-3.5 h-3.5" /> Mismatch
                                    </span>
                                    <button 
                                      onClick={() => handleApproveDiscrepancy(po.id)}
                                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 underline">
                                      Fix PO
                                    </button>
                                  </div>
                                )
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-200">
                                  <XCircle className="w-3.5 h-3.5" /> Unmapped
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
