import React from 'react';
import { Plus, Search, MapPin, Package, AlertTriangle, Building2, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const warehouses = [
  { 
    id: 'WH-01', 
    name: 'Central Warehouse (CW)', 
    type: 'Main Distribution Center',
    address: 'Dubai Industrial Park, Sector 4',
    manager: 'Ahmed Al-Farsi',
    capacity: '85%',
    activeSkus: 1240,
    stockValue: 'AED 2.4M',
    status: 'Operational'
  },
  { 
    id: 'WH-02', 
    name: 'DIP Facility', 
    type: 'Secondary Storage',
    address: 'Dubai Investment Park 2, Plot 45A',
    manager: 'Sarah Jenkins',
    capacity: '42%',
    activeSkus: 320,
    stockValue: 'AED 800K',
    status: 'Operational'
  },
  { 
    id: 'WH-03', 
    name: 'JAFZA Freezone', 
    type: 'Bonded Warehouse',
    address: 'Jebel Ali Free Zone, South Zone',
    manager: 'Mohammed Tareq',
    capacity: '96%',
    activeSkus: 890,
    stockValue: 'AED 1.0M',
    status: 'Near Capacity'
  },
];

export const Warehouse = () => {
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Warehouse Management</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Monitor and manage physical storage locations and capacity.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Add Warehouse
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {warehouses.map((wh) => {
          const isNearCapacity = wh.status === 'Near Capacity';
          const StatusIcon = isNearCapacity ? AlertTriangle : CheckCircle2;
          const statusColor = isNearCapacity ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-emerald-600 bg-emerald-50 border-emerald-200';
          const capacityNum = parseInt(wh.capacity);
          
          return (
            <Card key={wh.id} className="group hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">{wh.name}</h2>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{wh.id} • {wh.type}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">{wh.address}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active SKUs</p>
                    <p className="text-lg font-black text-slate-800">{wh.activeSkus.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Stock Value</p>
                    <p className="text-lg font-black text-indigo-600">{wh.stockValue}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capacity Utilization</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold border ${statusColor}`}>
                      <StatusIcon className="w-3 h-3" /> {wh.status}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${capacityNum > 90 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                      style={{ width: wh.capacity }}
                    ></div>
                  </div>
                  <p className="text-right text-xs font-bold text-slate-600 mt-1">{wh.capacity} Used</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
};
