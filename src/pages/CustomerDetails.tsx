import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Building2, MapPin, CheckCircle2, Phone, Mail, Activity, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export const CustomerDetails = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header Navigation */}
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/customers" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Customers
        </Link>
        <span>/</span>
        <span className="text-slate-800">{id || 'CUST-1001'}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">TechNova Solutions</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4" /> Active
            </span>
          </div>
          <p className="text-slate-500 mt-2 font-medium">Customer Code: <span className="font-bold text-slate-700">{id || 'CUST-1001'}</span></p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-all">
            <Trash2 className="w-4 h-4 text-rose-500" /> Disable
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle><Building2 className="w-5 h-5 text-indigo-500" /> Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> Primary Email
              </p>
              <p className="text-base font-bold text-slate-800">billing@technova.ae</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Primary Phone
              </p>
              <p className="text-base font-bold text-slate-800">+971 4 123 4567</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Registered Address
              </p>
              <p className="text-base font-medium text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                Office 1402, Al Silila Tower<br />
                Sheikh Zayed Road<br />
                Dubai, United Arab Emirates<br />
                PO Box: 12345
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><Activity className="w-5 h-5 text-emerald-500" /> Financial Details</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-5">
                <div>
                  <span className="text-sm font-semibold text-slate-500 block mb-1">Credit Limit</span>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-slate-800 tracking-tight">150,000.00</span>
                    <span className="text-sm font-bold text-slate-500 mb-1">AED</span>
                  </div>
                </div>
                <div className="h-px bg-slate-100 w-full"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">Payment Terms</span>
                  <span className="text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-md">Net 30 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">Current Balance</span>
                  <span className="text-sm font-bold text-emerald-600">AED 0.00</span>
                </div>
              </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity / POs placeholder */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle><FileText className="w-5 h-5 text-purple-500" /> Recent Purchase Orders</CardTitle>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">View All</button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No recent purchase orders found for this customer.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
