import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Edit, Trash2, Box, Tag } from 'lucide-react';
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
}

const mockData: ItemMaster[] = [
  { id: '1', sku: 'SKU-8921', code: 'ITM-9281', description: 'Dell XPS 15 Laptop', category: 'Electronics', uom: 'EA', purchasePrice: 'AED 6,500.00', salesPrice: 'AED 8,500.00' },
  { id: '2', sku: 'SKU-8922', code: 'ITM-9282', description: 'Logitech MX Master 3S', category: 'Electronics', uom: 'EA', purchasePrice: 'AED 250.00', salesPrice: 'AED 450.00' },
  { id: '3', sku: 'SKU-8923', code: 'ITM-9283', description: 'Dell UltraSharp 27 4K', category: 'Electronics', uom: 'EA', purchasePrice: 'AED 1,800.00', salesPrice: 'AED 2,800.00' },
  { id: '4', sku: 'SKU-8924', code: 'ITM-9284', description: 'Ergonomic Office Chair', category: 'Furniture', uom: 'EA', purchasePrice: 'AED 800.00', salesPrice: 'AED 1,200.00' },
  { id: '5', sku: 'SKU-8925', code: 'ITM-9285', description: 'Standing Desk Frame', category: 'Furniture', uom: 'EA', purchasePrice: 'AED 1,100.00', salesPrice: 'AED 1,800.00' },
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
    { header: 'Description', accessor: 'description', className: 'font-semibold text-slate-800' },
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
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
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
