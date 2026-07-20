import { 
  Package, ShoppingCart, Users, Activity, TrendingUp, Bell, 
  Files, FileWarning, Link2, UploadCloud, FolderSearch, Mail, RefreshCw, AlertCircle, CheckCircle2, Clock, XCircle 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

import { StatisticCard } from '../components/ui/StatisticCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';

// --- Dummy Data ---
const poTrendData = [
  { name: 'Mon', value: 120 }, { name: 'Tue', value: 180 }, { name: 'Wed', value: 150 }, 
  { name: 'Thu', value: 240 }, { name: 'Fri', value: 290 }, { name: 'Sat', value: 110 }, { name: 'Sun', value: 90 }
];

const processingSuccessData = [
  { name: 'Success', value: 85, fill: '#10b981' },
  { name: 'Failed', value: 15, fill: '#f43f5e' },
];

const validationStatusData = [
  { name: 'Validated', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Errors', value: 300 },
];

const customerDistributionData = [
  { name: 'North America', value: 400 },
  { name: 'Europe', value: 300 },
  { name: 'Asia', value: 300 },
  { name: 'Others', value: 200 },
];
const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b'];

interface PurchaseOrder {
  id: string;
  customer: string;
  status: string;
  time: string;
  salesOrder: string;
}

const recentPOs: PurchaseOrder[] = [
  { id: 'PO-2026-9812', customer: 'TechNova Solutions', status: 'Processed', time: '10 mins ago', salesOrder: 'SO-10492' },
  { id: 'PO-2026-9813', customer: 'Global Logistics Corp', status: 'Pending', time: '45 mins ago', salesOrder: 'SO-10493' },
  { id: 'PO-2026-9814', customer: 'Apex Office Supplies', status: 'Processed', time: '1 hr ago', salesOrder: 'SO-10494' },
  { id: 'PO-2026-9815', customer: 'Nexus Hardware', status: 'Exception', time: '2 hrs ago', salesOrder: '-' },
  { id: 'PO-2026-9816', customer: 'Quantum Dynamics', status: 'Processed', time: '3 hrs ago', salesOrder: 'SO-10495' },
];

const columns: Column<PurchaseOrder>[] = [
  { header: 'PO Number', accessor: (row) => <span className="font-bold text-indigo-600 cursor-pointer hover:underline">{row.id}</span> },
  { header: 'Customer', accessor: 'customer', className: 'font-semibold text-slate-800' },
  { header: 'Status', accessor: (row) => {
      const isSuccess = row.status === 'Processed';
      const isPending = row.status === 'Pending';
      const Icon = isSuccess ? CheckCircle2 : (isPending ? Clock : XCircle);
      const color = isSuccess ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 
                   (isPending ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200');
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${color} shadow-sm`}>
          <Icon className="w-3.5 h-3.5" /> {row.status}
        </span>
      );
    } 
  },
  { header: 'Received Time', accessor: 'time', className: 'text-sm font-medium text-slate-500' },
  { header: 'Sales Order', accessor: 'salesOrder', className: 'font-medium text-slate-600' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight">Enterprise Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">Real-time overview of your PO automation pipeline.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatisticCard 
          title="Purchase Orders Received" value="1,248" trend="+12.5%" isPositive={true} trendLabel="vs last week"
          icon={ShoppingCart} colorClass="text-indigo-500" bgClass="bg-indigo-50" borderClass="border-indigo-100" gradientClass="from-indigo-500/20 to-indigo-500/5"
        />
        <StatisticCard 
          title="Documents Processing" value="42" trend="Processing now" isPositive={true} trendLabel="Real-time"
          icon={Files} colorClass="text-blue-500" bgClass="bg-blue-50" borderClass="border-blue-100" gradientClass="from-blue-500/20 to-blue-500/5"
        />
        <StatisticCard 
          title="Orders Created" value="1,190" trend="+8.2%" isPositive={true} trendLabel="vs last week"
          icon={Package} colorClass="text-emerald-500" bgClass="bg-emerald-50" borderClass="border-emerald-100" gradientClass="from-emerald-500/20 to-emerald-500/5"
        />
        <StatisticCard 
          title="Pending Validation" value="15" trend="-2.4%" isPositive={true} trendLabel="vs yesterday"
          icon={Activity} colorClass="text-amber-500" bgClass="bg-amber-50" borderClass="border-amber-100" gradientClass="from-amber-500/20 to-amber-500/5"
        />
        <StatisticCard 
          title="Exceptions" value="8" trend="+2 New" isPositive={false} trendLabel="Requires attention"
          icon={FileWarning} colorClass="text-rose-500" bgClass="bg-rose-50" borderClass="border-rose-100" gradientClass="from-rose-500/20 to-rose-500/5"
        />
        <StatisticCard 
          title="ERP Connected" value="Active" trend="99.9% Uptime" isPositive={true} trendLabel="Syncing normally"
          icon={Link2} colorClass="text-purple-500" bgClass="bg-purple-50" borderClass="border-purple-100" gradientClass="from-purple-500/20 to-purple-500/5"
        />
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: 'Upload PO', icon: UploadCloud, color: 'text-indigo-600', bg: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-100' },
            { label: 'Scan Folder', icon: FolderSearch, color: 'text-blue-600', bg: 'bg-blue-50 hover:bg-blue-100 border-blue-100' },
            { label: 'Sync Email', icon: Mail, color: 'text-emerald-600', bg: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-100' },
            { label: 'Retry Failed', icon: RefreshCw, color: 'text-amber-600', bg: 'bg-amber-50 hover:bg-amber-100 border-amber-100' },
            { label: 'Exception Queue', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50 hover:bg-rose-100 border-rose-100' },
          ].map((action, idx) => (
            <button key={idx} className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${action.bg} group`}>
              <action.icon className={`w-6 h-6 mb-2 ${action.color} group-hover:scale-110 transition-transform duration-300`} />
              <span className={`text-sm font-semibold ${action.color}`}>{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Analytics Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle><TrendingUp className="w-5 h-5 text-indigo-500" /> PO Volume Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={poTrendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><Activity className="w-5 h-5 text-emerald-500" /> Processing Success Rate</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={processingSuccessData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                  {processingSuccessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><CheckCircle2 className="w-5 h-5 text-amber-500" /> Validation Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={validationStatusData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><Users className="w-5 h-5 text-pink-500" /> Customer Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={customerDistributionData} cx="50%" cy="50%" outerRadius={100} dataKey="value" stroke="none" labelLine={false}>
                  {customerDistributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Bottom Section: Table and Timeline */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle><Files className="w-5 h-5 text-indigo-500" /> Recent Purchase Orders</CardTitle>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">View All</button>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable data={recentPOs} columns={columns} keyExtractor={(row) => row.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><Bell className="w-5 h-5 text-purple-500" /> Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { title: 'System sync completed', time: 'Just now', type: 'info' },
                { title: 'PO-2026-9812 parsed successfully', time: '10 mins ago', type: 'success' },
                { title: 'Validation error on PO-2026-9815', time: '2 hrs ago', type: 'error' },
                { title: 'New vendor onboarded: TechNova', time: '5 hrs ago', type: 'info' },
                { title: 'Daily digest email sent', time: '1 day ago', type: 'default' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer relative">
                  <div className="relative mt-1 flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full relative z-10 
                      ${activity.type === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                        activity.type === 'error' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 
                        activity.type === 'info' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-400'}`}>
                    </div>
                    {i !== 4 && <div className="absolute top-3 left-1.5 bottom-[-28px] w-px bg-slate-200 -translate-x-1/2 group-hover:bg-indigo-200 transition-colors"></div>}
                  </div>
                  <div className="flex-1 bg-slate-50/50 group-hover:bg-indigo-50/50 p-3 rounded-xl transition-all duration-300 group-hover:shadow-sm -mt-2">
                    <p className="text-sm font-semibold text-slate-800">{activity.title}</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
