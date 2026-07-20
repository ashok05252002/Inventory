

interface CustomerFormProps {
  initialData?: any;
}

export const CustomerForm = ({ initialData }: CustomerFormProps) => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Customer Code</label>
          <input 
            type="text" 
            defaultValue={initialData?.code || ''}
            placeholder="e.g. CUST-001"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Customer Name</label>
          <input 
            type="text" 
            defaultValue={initialData?.name || ''}
            placeholder="e.g. TechNova Solutions"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
          <input 
            type="email" 
            defaultValue={initialData?.email || ''}
            placeholder="contact@company.com"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
          <input 
            type="text" 
            defaultValue={initialData?.phone || ''}
            placeholder="+971 4 123 4567"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
          />
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Billing Address</label>
          <textarea 
            rows={2}
            defaultValue={initialData?.address || ''}
            placeholder="Full billing address..."
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm custom-scrollbar" 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Credit Limit (AED)</label>
          <input 
            type="number" 
            defaultValue={initialData?.creditLimit || ''}
            placeholder="e.g. 50000"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Payment Terms</label>
          <select 
            defaultValue={initialData?.paymentTerms || ''}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
          >
            <option value="">Select terms...</option>
            <option value="Net 15">Net 15 Days</option>
            <option value="Net 30">Net 30 Days</option>
            <option value="Net 60">Net 60 Days</option>
            <option value="COD">Cash on Delivery</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Account Status</label>
          <select 
            defaultValue={initialData?.status || 'Active'}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
      </div>
    </form>
  );
};
