import { useState } from 'react';
import { Plus, Search, Filter, Download, Edit, Trash2, Eye, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { SupplierForm } from '../components/forms/SupplierForm';

interface SupplierModel {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  creditLimit: string;
  paymentTerms: string;
  status: string;
}

const mockData: SupplierModel[] = [
  { id: '1', code: 'SUPP-1001', name: 'Global Parts Inc.', email: 'billing@technova.ae', phone: '+971 4 123 4567', creditLimit: 'AED 150,000.00', paymentTerms: 'Net 30', status: 'Active' },
  { id: '2', code: 'SUPP-1002', name: 'Global Logistics Corp', email: 'finance@globallogistics.com', phone: '+971 50 987 6543', creditLimit: 'AED 50,000.00', paymentTerms: 'Net 15', status: 'Active' },
  { id: '3', code: 'SUPP-1003', name: 'Apex Office Supplies', email: 'accounts@apex.ae', phone: '+971 4 555 1234', creditLimit: 'AED 10,000.00', paymentTerms: 'COD', status: 'On Hold' },
  { id: '4', code: 'SUPP-1004', name: 'Nexus Hardware', email: 'payables@nexus.io', phone: '+971 52 111 2222', creditLimit: 'AED 200,000.00', paymentTerms: 'Net 60', status: 'Active' },
  { id: '5', code: 'SUPP-1005', name: 'Quantum Dynamics', email: 'vendor.mgmt@quantum.com', phone: '+971 2 444 8888', creditLimit: 'AED 0.00', paymentTerms: 'COD', status: 'Inactive' },
];

export const Suppliers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierModel | null>(null);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedSupplier(null);
    setIsModalOpen(true);
  };

  const handleEdit = (supplier: SupplierModel) => {
    setModalMode('edit');
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const columns: Column<SupplierModel>[] = [
    { 
      header: 'Code', 
      accessor: (row) => (
        <Link to={`/suppliers/${row.code}`} className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
          {row.code}
        </Link>
      ) 
    },
    { header: 'Supplier Name', accessor: 'name', className: 'font-semibold text-slate-800' },
    { 
      header: 'Contact', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="text-sm text-slate-700">{row.email}</span>
          <span className="text-xs text-slate-500">{row.phone}</span>
        </div>
      ) 
    },
    { header: 'Credit Limit', accessor: 'creditLimit', className: 'font-bold text-slate-700 text-right' },
    { header: 'Terms', accessor: 'paymentTerms', className: 'text-sm font-medium text-slate-600' },
    { 
      header: 'Status', 
      accessor: (row) => {
        const isActive = row.status === 'Active';
        const isHold = row.status === 'On Hold';
        const Icon = isActive ? CheckCircle2 : (isHold ? Clock : XCircle);
        const color = isActive ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 
                     (isHold ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-slate-600 bg-slate-100 border-slate-200');
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${color} shadow-sm whitespace-nowrap`}>
            <Icon className="w-3.5 h-3.5" /> {row.status}
          </span>
        );
      } 
    },
    { 
      header: 'Actions', 
      accessor: (row) => (
        <div className="flex items-center gap-1 justify-end">
          <Link to={`/suppliers/${row.code}`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View">
            <Eye className="w-4 h-4" />
          </Link>
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
        {modalMode === 'create' ? 'Create Supplier' : 'Save Changes'}
      </button>
    </>
  );

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Supplier Master</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage your supplier database and credit terms.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export
          </button>
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Add Supplier
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search by code, name, or email..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm group-focus-within:shadow-md"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer">
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockData} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 font-medium bg-slate-50/50 mt-auto">
          <div>Showing 1 to 5 of 120 entries</div>
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
        title={modalMode === 'create' ? 'Create New Supplier' : 'Edit Supplier'}
        footer={modalFooter}
      >
        <SupplierForm initialData={selectedSupplier} />
      </Modal>
    </div>
  );
};
