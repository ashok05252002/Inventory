import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface SubItem {
  sku: string;
  qty: number;
}

interface ItemFormProps {
  initialData?: any;
}

export const ItemForm = ({ initialData }: ItemFormProps) => {
  const [itemType, setItemType] = useState<'Standard' | 'Combo'>(initialData?.type || 'Standard');
  const [subItems, setSubItems] = useState<SubItem[]>(initialData?.subItems?.map((s: any) => ({ sku: s.sku, qty: s.qty })) || []);

  const addSubItem = () => {
    setSubItems([...subItems, { sku: '', qty: 1 }]);
  };

  const removeSubItem = (index: number) => {
    setSubItems(subItems.filter((_, i) => i !== index));
  };

  const updateSubItem = (index: number, field: keyof SubItem, value: any) => {
    const newItems = [...subItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setSubItems(newItems);
  };

  return (
    <form className="space-y-6">
      {/* Item Type Selector */}
      <div className="flex gap-4 p-1 bg-slate-100 rounded-lg w-fit">
        <button
          type="button"
          onClick={() => setItemType('Standard')}
          className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${
            itemType === 'Standard' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Standard Product
        </button>
        <button
          type="button"
          onClick={() => setItemType('Combo')}
          className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${
            itemType === 'Combo' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Combo Kit
        </button>
      </div>

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
            <option value="Cameras">Cameras</option>
            <option value="Cables">Cables</option>
            <option value="Recorders">Recorders</option>
            <option value="Accessories">Accessories</option>
            <option value="Hardware">Hardware</option>
            <option value="Kits">Kits / Combos</option>
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
            <option value="Set">Set</option>
            <option value="Roll">Roll</option>
            <option value="BOX">Box (BOX)</option>
            <option value="PK">Pack (PK)</option>
          </select>
        </div>

        {/* Combo Kit Specific Fields */}
        {itemType === 'Combo' && (
          <div className="col-span-1 md:col-span-2 border border-indigo-100 bg-indigo-50/30 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                Combo Kit Sub-Products (BOM)
              </h3>
              <button
                type="button"
                onClick={addSubItem}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-white border border-indigo-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Sub-Product
              </button>
            </div>
            
            {subItems.length === 0 ? (
              <div className="text-sm text-slate-500 font-medium text-center py-4 bg-white/50 border border-slate-200/60 border-dashed rounded-lg">
                No sub-products added yet. Click "Add Sub-Product" to build your kit.
              </div>
            ) : (
              <div className="space-y-3">
                {subItems.map((sub, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        value={sub.sku}
                        onChange={(e) => updateSubItem(idx, 'sku', e.target.value)}
                        placeholder="Search SKU..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 outline-none shadow-sm"
                      />
                    </div>
                    <div className="w-24">
                      <input 
                        type="number" 
                        value={sub.qty}
                        onChange={(e) => updateSubItem(idx, 'qty', parseInt(e.target.value) || 1)}
                        min="1"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-center focus:border-indigo-500 outline-none shadow-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSubItem(idx)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100 mt-0.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Purchase Cost (AED) {itemType === 'Combo' && <span className="text-[10px] text-slate-400 font-normal ml-1">(Estimated from BOM)</span>}
          </label>
          <input 
            type="number" 
            defaultValue={initialData?.purchasePrice?.replace(/[^0-9.]/g, '') || ''}
            placeholder="0.00"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Sales Price (AED)
          </label>
          <input 
            type="number" 
            defaultValue={initialData?.salesPrice?.replace(/[^0-9.]/g, '') || ''}
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
