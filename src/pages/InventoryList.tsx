import React, { useState } from 'react';
import { Search, Filter, Download, ArrowRightLeft, Edit, AlertTriangle, XOctagon, CheckCircle2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';

interface InventoryDetailItem {
  id: string;
  sku: string;
  description: string;
  category: string;
  warehouse: string;
  available: number;
  reserved: number;
  total: number;
  minStock: number;
  status: string;
}

const mockInventoryList: InventoryDetailItem[] = [
  { id: '1', sku: 'SKU-8921', description: 'Dell XPS 15 Laptop', category: 'Electronics', warehouse: 'Central Warehouse', available: 120, reserved: 45, total: 165, minStock: 50, status: 'In Stock' },
  { id: '2', sku: 'SKU-8922', description: 'Logitech MX Master 3S', category: 'Electronics', warehouse: 'DIP Facility', available: 15, reserved: 10, total: 25, minStock: 20, status: 'Low Stock' },
  { id: '3', sku: 'SKU-8923', description: 'Dell UltraSharp 27 4K', category: 'Electronics', warehouse: 'Central Warehouse', available: 0, reserved: 0, total: 0, minStock: 10, status: 'Out of Stock' },
  { id: '4', sku: 'SKU-8924', description: 'Ergonomic Office Chair', category: 'Furniture', warehouse: 'JAFZA Freezone', available: 450, reserved: 50, total: 500, minStock: 100, status: 'In Stock' },
  { id: '5', sku: 'SKU-8925', description: 'Standing Desk Frame', category: 'Furniture', warehouse: 'DIP Facility', available: 8, reserved: 2, total: 10, minStock: 15, status: 'Low Stock' },
  { id: '6', sku: 'SKU-8926', description: 'Apple MacBook Pro M3', category: 'Electronics', warehouse: 'Central Warehouse', available: 32, reserved: 5, total: 37, minStock: 20, status: 'In Stock' },
  { id: '7', sku: 'SKU-8927', description: 'Keychron K2 Mechanical Keyboard', category: 'Electronics', warehouse: 'JAFZA Freezone', available: 210, reserved: 40, total: 250, minStock: 50, status: 'In Stock' },
  { id: '8', sku: 'SKU-8928', description: 'Herman Miller Aeron', category: 'Furniture', warehouse: 'Central Warehouse', available: 5, reserved: 15, total: 20, minStock: 10, status: 'Low Stock' },
];

export const InventoryList = () => {
  const columns: Column<InventoryDetailItem>[] = [
    { 
      header: 'SKU & Description', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-indigo-600 cursor-pointer hover:underline">{row.sku}</span>
          <span className="text-sm font-medium text-slate-700">{row.description}</span>
          <span className="text-xs text-slate-500">{row.category}</span>
        </div>
      ) 
    },
    { header: 'Warehouse', accessor: 'warehouse', className: 'font-semibold text-slate-600' },
    { header: 'Available', accessor: 'available', className: 'font-bold text-slate-800 text-right' },
    { header: 'Reserved', accessor: 'reserved', className: 'font-semibold text-slate-500 text-right' },
    { header: 'Total Stock', accessor: 'total', className: 'font-black text-indigo-600 text-right' },
    { header: 'Min Stock', accessor: 'minStock', className: 'font-medium text-slate-400 text-right' },
    { 
      header: 'Status', 
      accessor: (row) => {
        const isOk = row.status === 'In Stock';
        const isLow = row.status === 'Low Stock';
        const isOut = row.status === 'Out of Stock';
        
        const Icon = isOk ? CheckCircle2 : (isLow ? AlertTriangle : XOctagon);
        const color = isOk ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 
                     (isLow ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200');
                     
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
          <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Transfer Stock">
            <ArrowRightLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Adjust Stock">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Inventory List</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Detailed tracking of all SKUs across all warehouse locations.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-400" /> Export List
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Receive Stock
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Advanced Filters Toolbar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search by SKU or Description..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm group-focus-within:shadow-md"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
              <Filter className="w-4 h-4 text-slate-400" />
              <select className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer">
                <option value="">All Warehouses</option>
                <option value="Central Warehouse">Central Warehouse (CW)</option>
                <option value="DIP Facility">DIP Facility</option>
                <option value="JAFZA Freezone">JAFZA Freezone</option>
              </select>
            </div>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 outline-none cursor-pointer">
              <option value="">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 outline-none cursor-pointer">
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Hardware">Hardware</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockInventoryList} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 font-medium bg-slate-50/50 mt-auto">
          <div>Showing 1 to 8 of 3,492 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white font-semibold shadow-sm">1</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">2</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">3</button>
            <span className="px-2 py-1 text-slate-400">...</span>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">437</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};
