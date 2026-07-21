import { useState } from 'react';
import { Plus, Search, Filter, Download, Edit, Trash2 } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { ItemForm } from '../components/forms/ItemForm';

interface ItemMaster {
  id: string;
  sku: string;
  code: string;
  description: string;
  category: string;
  uom: string;
  purchasePrice: string;
  salesPrice: string;
  type?: 'Standard' | 'Combo';
  subItems?: { sku: string; desc: string; qty: number }[];
}

const mockData: ItemMaster[] = [
  { id: '1', sku: 'SKU-CAM-01', code: 'ITM-9281', description: '4K CCTV Security Camera', category: 'Cameras', uom: 'EA', purchasePrice: 'AED 800.00', salesPrice: 'AED 1,200.00' },
  { id: '2', sku: 'SKU-CBL-100', code: 'ITM-9282', description: 'CCTV Coaxial Cable (RG59) 100m', category: 'Cables', uom: 'Roll', purchasePrice: 'AED 80.00', salesPrice: 'AED 150.00' },
  { id: '3', sku: 'SKU-NVR-08', code: 'ITM-9283', description: 'NVR 8-Channel Recorder', category: 'Recorders', uom: 'EA', purchasePrice: 'AED 1,200.00', salesPrice: 'AED 1,800.00' },
  { id: '4', sku: 'SKU-BNC-50', code: 'ITM-9284', description: 'BNC Connectors (Pack of 50)', category: 'Accessories', uom: 'PK', purchasePrice: 'AED 45.00', salesPrice: 'AED 90.00' },
  { id: '5', sku: 'SKU-MLD-100', code: 'ITM-9285', description: 'Cable Molding / Conduit 100m', category: 'Hardware', uom: 'Roll', purchasePrice: 'AED 300.00', salesPrice: 'AED 500.00' },
  { 
    id: '6', 
    sku: 'SKU-KIT-01', 
    code: 'ITM-9286', 
    description: 'Camera Installation Kit', 
    category: 'Kits', 
    uom: 'Set', 
    purchasePrice: 'AED 4,000.00', 
    salesPrice: 'AED 6,500.00',
    type: 'Combo',
    subItems: [
      { sku: 'SKU-CAM-01', desc: '4K CCTV Security Camera', qty: 4 },
      { sku: 'SKU-CBL-100', desc: 'CCTV Coaxial Cable (RG59) 100m', qty: 1 },
      { sku: 'SKU-MLD-100', desc: 'Cable Molding / Conduit 100m', qty: 1 },
      { sku: 'SKU-SPR-01', desc: 'Installation Spares Kit', qty: 1 }
    ]
  },
];

export const Items = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedItem, setSelectedItem] = useState<ItemMaster | null>(null);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: ItemMaster) => {
    setModalMode('edit');
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const columns: Column<ItemMaster>[] = [
    { 
      header: 'Identifiers', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-indigo-600">{row.sku}</span>
          <span className="text-xs text-slate-500">{row.code}</span>
        </div>
      ) 
    },
    { 
      header: 'Description', 
      accessor: (row) => (
        <div>
          <span className="font-semibold text-slate-800 flex items-center gap-2">
            {row.description}
            {row.type === 'Combo' && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full">COMBO</span>}
          </span>
          {row.type === 'Combo' && row.subItems && (
            <div className="mt-2 pl-4 border-l-2 border-indigo-100 space-y-1">
              {row.subItems.map((sub, idx) => (
                <div key={idx} className="flex gap-2 text-xs">
                  <span className="text-slate-400 font-bold">{sub.qty}x</span>
                  <span className="text-slate-600 font-medium">{sub.sku}</span>
                  <span className="text-slate-500">- {sub.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) 
    },
    { 
      header: 'Classification', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="text-sm text-slate-700">{row.category}</span>
          <span className="text-xs text-slate-500">UOM: {row.uom}</span>
        </div>
      ) 
    },
    { header: 'Purchase Price', accessor: 'purchasePrice', className: 'font-bold text-slate-600 text-right' },
    { header: 'Sales Price', accessor: 'salesPrice', className: 'font-bold text-emerald-600 text-right' },
    { 
      header: 'Actions', 
      accessor: (row) => (
        <div className="flex items-center gap-1 justify-end">
          <button onClick={() => handleEdit(row)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  const modalFooter = (
    <>
      <button 
        onClick={() => setIsModalOpen(false)}
        className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
      >
        Cancel
      </button>
      <button 
        onClick={() => setIsModalOpen(false)}
        className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
      >
        {modalMode === 'create' ? 'Create Item' : 'Save Changes'}
      </button>
    </>
  );

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Item Master</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage your product catalog, categories, and pricing.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export
          </button>
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search by SKU, code, or description..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm group-focus-within:shadow-md"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer">
              <option value="">All Categories</option>
              <option value="Cameras">Cameras</option>
              <option value="Cables">Cables</option>
              <option value="Recorders">Recorders</option>
              <option value="Accessories">Accessories</option>
              <option value="Hardware">Hardware</option>
            </select>
          </div>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockData} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 font-medium bg-slate-50/50 mt-auto">
          <div>Showing 1 to 5 of 1,248 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white font-semibold shadow-sm">1</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">2</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">3</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">Next</button>
          </div>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Create New Item' : 'Edit Item'}
        footer={modalFooter}
      >
        <ItemForm initialData={selectedItem} />
      </Modal>
    </div>
  );
};
