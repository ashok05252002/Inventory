import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, AlertTriangle, XOctagon, DollarSign, PieChart as PieChartIcon, Layers, Plus, ScanLine, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { StatisticCard } from '../components/ui/StatisticCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Modal } from '../components/ui/Modal';

interface InventoryItem {
  id: string;
  sku: string;
  description: string;
  warehouse: string;
  available: number;
  reserved: number;
  minStock: number;
  maxStock: number;
  status: string;
  type?: 'Standard' | 'Combo';
  subItems?: { sku: string; desc: string; qty: number }[];
}

const mockInventory: InventoryItem[] = [
  { id: '1', sku: 'SKU-CAM-01', description: '4K CCTV Security Camera', warehouse: 'Central Warehouse', available: 120, reserved: 45, minStock: 50, maxStock: 500, status: 'In Stock' },
  { id: '2', sku: 'SKU-CBL-100', description: 'CCTV Coaxial Cable (RG59) 100m', warehouse: 'DIP Facility', available: 15, reserved: 10, minStock: 20, maxStock: 200, status: 'Low Stock' },
  { id: '3', sku: 'SKU-NVR-08', description: 'NVR 8-Channel Recorder', warehouse: 'Central Warehouse', available: 0, reserved: 0, minStock: 10, maxStock: 100, status: 'Out of Stock' },
  { id: '4', sku: 'SKU-BNC-50', description: 'BNC Connectors (Pack of 50)', warehouse: 'JAFZA Freezone', available: 450, reserved: 50, minStock: 100, maxStock: 1000, status: 'In Stock' },
  { id: '5', sku: 'SKU-MLD-100', description: 'Cable Molding / Conduit 100m', warehouse: 'DIP Facility', available: 8, reserved: 2, minStock: 15, maxStock: 150, status: 'Low Stock' },
  { 
    id: '6', 
    sku: 'SKU-KIT-01', 
    description: 'Camera Installation Kit', 
    warehouse: 'Central Warehouse', 
    available: 15, 
    reserved: 2, 
    minStock: 10, 
    maxStock: 50, 
    status: 'In Stock',
    type: 'Combo',
    subItems: [
      { sku: 'SKU-CAM-01', desc: '4K CCTV Security Camera', qty: 4 },
      { sku: 'SKU-CBL-100', desc: 'CCTV Coaxial Cable (RG59) 100m', qty: 1 },
      { sku: 'SKU-MLD-100', desc: 'Cable Molding / Conduit 100m', qty: 1 },
      { sku: 'SKU-SPR-01', desc: 'Installation Spares Kit', qty: 1 }
    ]
  },
];

const distributionData = [
  { name: 'Central Warehouse', value: 45000, fill: '#6366f1' },
  { name: 'DIP Facility', value: 25000, fill: '#14b8a6' },
  { name: 'JAFZA Freezone', value: 30000, fill: '#f59e0b' },
];
const COLORS = ['#6366f1', '#14b8a6', '#f59e0b'];

const columns: Column<InventoryItem>[] = [
  { 
    header: 'SKU & Description', 
    accessor: (row) => (
      <div className="flex flex-col">
        <span className="font-bold text-indigo-600 flex items-center gap-2">
          {row.sku}
          {row.type === 'Combo' && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full">COMBO</span>}
        </span>
        <span className="text-sm text-slate-500 font-medium">{row.description}</span>
        {row.type === 'Combo' && row.subItems && (
          <div className="mt-2 pl-3 border-l-2 border-indigo-100 space-y-1">
            {row.subItems.map((sub, idx) => (
              <div key={idx} className="flex gap-1.5 text-[11px]">
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
  { header: 'Warehouse', accessor: 'warehouse', className: 'font-semibold text-slate-700' },
  { 
    header: 'Availability', 
    accessor: (row) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-800">{row.available} Available</span>
        <span className="text-xs font-medium text-slate-500">{row.reserved} Reserved</span>
      </div>
    ),
    className: 'text-right'
  },
  { 
    header: 'Thresholds (Min/Max)', 
    accessor: (row) => (
      <span className="text-sm font-medium text-slate-600">{row.minStock} / {row.maxStock}</span>
    ),
    className: 'text-right'
  },
  { 
    header: 'Status', 
    accessor: (row) => {
      const isOk = row.status === 'In Stock';
      const isLow = row.status === 'Low Stock';
      
      const color = isOk ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 
                   (isLow ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200');
                   
      // Need CheckCircle2 import, but let's just use CSS. Wait, I imported CheckCircle2 in others but not here.
      // I'll import it above or just use standard HTML.
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${color} shadow-sm whitespace-nowrap`}>
          {row.status}
        </span>
      );
    } 
  },
];

export const Inventory = () => {
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight">Inventory Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">Real-time overview of your stock levels and warehouse distribution.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsReceiveModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Receive Stock
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatisticCard 
          title="Total Stock Value" value="AED 4.2M" trend="+5.2%" isPositive={true} trendLabel="vs last month"
          icon={DollarSign} colorClass="text-emerald-500" bgClass="bg-emerald-50" borderClass="border-emerald-100" gradientClass="from-emerald-500/20 to-emerald-500/5"
        />
        <StatisticCard 
          title="Total Active SKUs" value="1,248" trend="+12 New" isPositive={true} trendLabel="vs last week"
          icon={Package} colorClass="text-indigo-500" bgClass="bg-indigo-50" borderClass="border-indigo-100" gradientClass="from-indigo-500/20 to-indigo-500/5"
        />
        <StatisticCard 
          title="Low Stock Items" value="15" trend="Action Required" isPositive={false} trendLabel="Below Min Level"
          icon={AlertTriangle} colorClass="text-amber-500" bgClass="bg-amber-50" borderClass="border-amber-100" gradientClass="from-amber-500/20 to-amber-500/5"
        />
        <StatisticCard 
          title="Out of Stock" value="3" trend="Critical" isPositive={false} trendLabel="Zero Availability"
          icon={XOctagon} colorClass="text-rose-500" bgClass="bg-rose-50" borderClass="border-rose-100" gradientClass="from-rose-500/20 to-rose-500/5"
        />
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Inventory Table */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle><Layers className="w-5 h-5 text-indigo-500" /> Real-time Stock Levels</CardTitle>
            <div className="flex gap-2">
              <select className="text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none">
                <option>All Warehouses</option>
                <option>Central Warehouse</option>
                <option>DIP Facility</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable data={mockInventory} columns={columns} keyExtractor={(row) => row.id} />
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
               <Link to="/inventory/list" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">View All Inventory</Link>
            </div>
          </CardContent>
        </Card>

        {/* Warehouse Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle><PieChartIcon className="w-5 h-5 text-purple-500" /> Warehouse Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center flex-col">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value" stroke="none">
                  {distributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} formatter={(value: any) => `AED ${value?.toLocaleString()}`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={isReceiveModalOpen} onClose={() => setIsReceiveModalOpen(false)} title="Receive Stock">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Scan or manually enter the PO / ASN number to start receiving items into the warehouse.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Purchase Order or ASN No.</label>
              <div className="relative">
                <input type="text" placeholder="e.g. PO-2024-001" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-indigo-300 transition-colors cursor-pointer mt-4">
              <ScanLine className="w-8 h-8 text-indigo-500 mb-2" />
              <p className="text-sm font-bold text-slate-700">Scan Barcode</p>
              <p className="text-xs text-slate-500 mt-1">Ensure scanner is connected</p>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setIsReceiveModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all">
              Proceed
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
