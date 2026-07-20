import React, { useState } from 'react';
import { Database, Coins, CreditCard, Receipt, Scale, MapPin, Building, Shield, Settings2, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';

const masterTabs = [
  { id: 'currency', label: 'Currencies', icon: Coins },
  { id: 'tax', label: 'Tax Codes', icon: Receipt },
  { id: 'payment', label: 'Payment Terms', icon: CreditCard },
  { id: 'uom', label: 'Units of Measure', icon: Scale },
  { id: 'location', label: 'Locations', icon: MapPin },
  { id: 'company', label: 'Company', icon: Building },
  { id: 'bp', label: 'Business Partners', icon: Users },
  { id: 'roles', label: 'Roles & Perms', icon: Shield },
];

const mockCurrencies = [
  { id: '1', code: 'AED', name: 'UAE Dirham', rate: 1.0, status: 'Active' },
  { id: '2', code: 'USD', name: 'US Dollar', rate: 3.67, status: 'Active' },
  { id: '3', code: 'EUR', name: 'Euro', rate: 4.12, status: 'Active' },
  { id: '4', code: 'GBP', name: 'British Pound', rate: 4.85, status: 'Inactive' },
];

export const MasterData = () => {
  const [activeTab, setActiveTab] = useState('currency');

  const getColumns = (): Column<any>[] => {
    switch (activeTab) {
      case 'currency':
        return [
          { header: 'Code', accessor: 'code', className: 'font-bold text-indigo-600' },
          { header: 'Name', accessor: 'name', className: 'font-medium text-slate-700' },
          { header: 'Exchange Rate', accessor: 'rate', className: 'font-bold text-slate-800' },
          { header: 'Status', accessor: (row) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {row.status}
            </span>
          ) }
        ];
      default:
        return [
          { header: 'Data', accessor: () => 'Not implemented yet for this tab' }
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
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all">
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
          {activeTab === 'currency' ? (
            <DataTable data={mockCurrencies} columns={getColumns()} keyExtractor={(row) => row.id} />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <Settings2 className="w-12 h-12 mb-4 text-slate-300" />
              <p className="font-bold text-lg">Master Data Section</p>
              <p className="text-sm mt-1">Configure {masterTabs.find(t => t.id === activeTab)?.label} here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
