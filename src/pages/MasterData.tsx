import { useState } from 'react';
import { Database, CreditCard, Receipt, Scale, MapPin, Building, Shield, Users } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Modal } from '../components/ui/Modal';

const masterTabs = [
  { id: 'tax', label: 'Tax Codes', icon: Receipt },
  { id: 'payment', label: 'Payment Terms', icon: CreditCard },
  { id: 'uom', label: 'Units of Measure', icon: Scale },
  { id: 'location', label: 'Locations', icon: MapPin },
  { id: 'company', label: 'Company', icon: Building },
  { id: 'bp', label: 'Business Partners', icon: Users },
  { id: 'roles', label: 'Roles & Perms', icon: Shield },
];

const mockDataMap: Record<string, any[]> = {
  tax: [
    { id: '1', code: 'TAX-00', name: 'Exempt', rate: '0%', status: 'Active' },
    { id: '2', code: 'TAX-05', name: 'Standard VAT', rate: '5%', status: 'Active' },
  ],
  payment: [
    { id: '1', code: 'NET30', name: 'Net 30 Days', days: 30, status: 'Active' },
    { id: '2', code: 'COD', name: 'Cash on Delivery', days: 0, status: 'Active' },
  ],
  uom: [
    { id: '1', code: 'EA', name: 'Each', type: 'Count', status: 'Active' },
    { id: '2', code: 'KG', name: 'Kilogram', type: 'Weight', status: 'Active' },
  ],
  location: [
    { id: '1', code: 'DXB-WH1', name: 'Dubai Main Warehouse', type: 'Warehouse', status: 'Active' },
    { id: '2', code: 'AUH-WH1', name: 'Abu Dhabi Branch', type: 'Branch', status: 'Active' },
  ],
  company: [
    { id: '1', code: 'COMP-01', name: 'ProCamera Connect LLC', country: 'UAE', status: 'Active' },
  ],
  bp: [
    { id: '1', code: 'CUST-01', name: 'CineRig Solutions', type: 'Customer', status: 'Active' },
    { id: '2', code: 'SUPP-01', name: 'CableTech Mfg', type: 'Supplier', status: 'Active' },
  ],
  roles: [
    { id: '1', code: 'ADMIN', name: 'System Administrator', users: 2, status: 'Active' },
    { id: '2', code: 'USER', name: 'Standard User', users: 15, status: 'Active' },
  ],
};

export const MasterData = () => {
  const [activeTab, setActiveTab] = useState('tax');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getColumns = (): Column<any>[] => {
    const commonStatus = {
      header: 'Status', accessor: (row: any) => (
        <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {row.status}
        </span>
      )
    };

    switch (activeTab) {
      case 'tax':
        return [
          { header: 'Code', accessor: 'code', className: 'font-bold text-indigo-600' },
          { header: 'Name', accessor: 'name', className: 'font-medium text-slate-700' },
          { header: 'Rate', accessor: 'rate', className: 'font-bold text-slate-800' },
          commonStatus
        ];
      case 'payment':
        return [
          { header: 'Code', accessor: 'code', className: 'font-bold text-indigo-600' },
          { header: 'Description', accessor: 'name', className: 'font-medium text-slate-700' },
          { header: 'Days', accessor: 'days', className: 'font-bold text-slate-800' },
          commonStatus
        ];
      case 'uom':
        return [
          { header: 'Code', accessor: 'code', className: 'font-bold text-indigo-600' },
          { header: 'Name', accessor: 'name', className: 'font-medium text-slate-700' },
          { header: 'Type', accessor: 'type', className: 'font-medium text-slate-600' },
          commonStatus
        ];
      case 'location':
        return [
          { header: 'Code', accessor: 'code', className: 'font-bold text-indigo-600' },
          { header: 'Location Name', accessor: 'name', className: 'font-medium text-slate-700' },
          { header: 'Type', accessor: 'type', className: 'font-medium text-slate-600' },
          commonStatus
        ];
      case 'company':
        return [
          { header: 'Code', accessor: 'code', className: 'font-bold text-indigo-600' },
          { header: 'Company Name', accessor: 'name', className: 'font-medium text-slate-700' },
          { header: 'Country', accessor: 'country', className: 'font-medium text-slate-600' },
          commonStatus
        ];
      case 'bp':
        return [
          { header: 'Code', accessor: 'code', className: 'font-bold text-indigo-600' },
          { header: 'Partner Name', accessor: 'name', className: 'font-medium text-slate-700' },
          { header: 'Type', accessor: 'type', className: 'font-medium text-slate-600' },
          commonStatus
        ];
      case 'roles':
        return [
          { header: 'Role Code', accessor: 'code', className: 'font-bold text-indigo-600' },
          { header: 'Role Name', accessor: 'name', className: 'font-medium text-slate-700' },
          { header: 'Assigned Users', accessor: 'users', className: 'font-bold text-slate-800' },
          commonStatus
        ];
      default:
        return [
          { header: 'Code', accessor: 'code' }
        ];
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Database className="w-8 h-8 text-indigo-500" /> Master Data Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Centralized management for all system dictionaries and master records.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all">
            + Create New Record
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-xl">
        {/* Horizontal Navigation */}
        <div className="flex gap-1 overflow-x-auto p-4 border-b border-slate-100 bg-slate-50/50 custom-scrollbar">
          {masterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            )
          })}
        </div>

        <CardContent className="p-0 overflow-auto flex-1">
          <DataTable data={mockDataMap[activeTab] || []} columns={getColumns()} keyExtractor={(row) => row.id} />
        </CardContent>
      </Card>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Record">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Add a new entry to the active master data list.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Record Code <span className="text-rose-500">*</span></label>
              <input type="text" placeholder="e.g. REC-001" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Description / Name <span className="text-rose-500">*</span></label>
              <input type="text" placeholder="Full name of the record" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all">
              Save Record
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
