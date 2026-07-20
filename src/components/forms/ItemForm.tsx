interface ItemFormProps {
  initialData?: any;
}

export const ItemForm = ({ initialData }: ItemFormProps) => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">SKU</label>
          <input 
            type="text" 
            defaultValue={initialData?.sku || ''}
            placeholder="e.g. SKU-1092"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Item Code</label>
          <input 
            type="text" 
            defaultValue={initialData?.code || ''}
            placeholder="e.g. ITM-001"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Description</label>
          <textarea 
            rows={2}
            defaultValue={initialData?.description || ''}
            placeholder="Detailed item description..."
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm custom-scrollbar" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Category</label>
          <select 
            defaultValue={initialData?.category || ''}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
          >
            <option value="">Select category...</option>
            <option value="Electronics">Electronics</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Hardware">Hardware</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">UOM (Unit of Measure)</label>
          <select 
            defaultValue={initialData?.uom || ''}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
          >
            <option value="">Select UOM...</option>
            <option value="EA">Each (EA)</option>
            <option value="BOX">Box (BOX)</option>
            <option value="KG">Kilogram (KG)</option>
            <option value="MTR">Meter (MTR)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Purchase Price (AED)</label>
          <input 
            type="number" 
            defaultValue={initialData?.purchasePrice || ''}
            placeholder="0.00"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Sales Price (AED)</label>
          <input 
            type="number" 
            defaultValue={initialData?.salesPrice || ''}
            placeholder="0.00"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Tax Category</label>
          <select 
            defaultValue={initialData?.tax || '5% VAT'}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
          >
            <option value="5% VAT">5% VAT Standard</option>
            <option value="Zero Rated">Zero Rated (0%)</option>
            <option value="Exempt">Exempt</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Default Warehouse</label>
          <select 
            defaultValue={initialData?.warehouse || 'Central Warehouse'}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
          >
            <option value="Central Warehouse">Central Warehouse (CW)</option>
            <option value="Dubai Investment Park">DIP Facility</option>
            <option value="JAFZA Freezone">JAFZA Freezone</option>
          </select>
        </div>
      </div>
    </form>
  );
};
