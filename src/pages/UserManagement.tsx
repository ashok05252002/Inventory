import { useState } from 'react';
import { UserPlus, Search, Filter, Shield, MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Card, CardContent } from '../components/ui/Card';
import { StatisticCard } from '../components/ui/StatisticCard';
import { Modal } from '../components/ui/Modal';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'Invited';
  lastLogin: string;
}

const mockUsers: UserData[] = [
  { id: '1', name: 'John Doe', email: 'johndoe@nexuserp.com', role: 'System Admin', department: 'IT', status: 'Active', lastLogin: '2 mins ago' },
  { id: '2', name: 'Sarah Jenkins', email: 's.jenkins@nexuserp.com', role: 'Procurement Manager', department: 'Purchasing', status: 'Active', lastLogin: '1 hour ago' },
  { id: '3', name: 'Ahmed Al-Farsi', email: 'ahmed.f@nexuserp.com', role: 'Warehouse Supervisor', department: 'Logistics', status: 'Active', lastLogin: 'Yesterday' },
  { id: '4', name: 'Mohammed Tareq', email: 'm.tareq@nexuserp.com', role: 'Inventory Clerk', department: 'Logistics', status: 'Active', lastLogin: '3 days ago' },
  { id: '5', name: 'Emily Chen', email: 'e.chen@nexuserp.com', role: 'Financial Analyst', department: 'Finance', status: 'Invited', lastLogin: 'Never' },
  { id: '6', name: 'Michael Scott', email: 'm.scott@nexuserp.com', role: 'Sales Manager', department: 'Sales', status: 'Inactive', lastLogin: '3 months ago' },
];

export const UserManagement = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const columns: Column<UserData>[] = [
    { 
      header: 'User', 
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
            {row.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800">{row.name}</span>
            <span className="text-xs text-slate-500">{row.email}</span>
          </div>
        </div>
      ) 
    },
    { 
      header: 'Role & Dept', 
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-700">{row.role}</span>
          <span className="text-xs font-medium text-slate-500">{row.department}</span>
        </div>
      ) 
    },
    { 
      header: 'Status', 
      accessor: (row) => {
        let color = 'bg-slate-100 text-slate-600 border-slate-200';
        if (row.status === 'Active') color = 'bg-emerald-50 text-emerald-600 border-emerald-200';
        if (row.status === 'Inactive') color = 'bg-rose-50 text-rose-600 border-rose-200';
        if (row.status === 'Invited') color = 'bg-amber-50 text-amber-600 border-amber-200';
        
        const Icon = row.status === 'Active' ? CheckCircle2 : (row.status === 'Inactive' ? XCircle : UserPlus);
        
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${color} shadow-sm`}>
            <Icon className="w-3 h-3" /> {row.status}
          </span>
        );
      } 
    },
    { header: 'Last Login', accessor: 'lastLogin', className: 'text-sm font-medium text-slate-500' },
    { 
      header: 'Actions', 
      accessor: () => (
        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md transition-colors float-right">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-500" /> User Management
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage user access, roles, and granular security permissions.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <UserPlus className="w-4 h-4" /> Invite User
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatisticCard title="Total Users" value="124" icon={UserPlus} />
        <StatisticCard title="Active Users" value="118" icon={CheckCircle2} colorClass="text-emerald-500" bgClass="bg-emerald-50" borderClass="border-emerald-100" />
        <StatisticCard title="Pending Invites" value="6" icon={Shield} colorClass="text-amber-500" bgClass="bg-amber-50" borderClass="border-amber-100" />
      </div>

      {/* Main Table Card */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full group xl:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search users by name or email..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
              <Filter className="w-4 h-4 text-slate-400" />
              <select className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer">
                <option value="">All Roles</option>
                <option value="Admin">System Admin</option>
                <option value="Manager">Manager</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 outline-none cursor-pointer">
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Invited">Invited</option>
            </select>
          </div>
        </div>

        <CardContent className="p-0 overflow-hidden flex flex-col">
          <DataTable data={mockUsers} columns={columns} keyExtractor={(row) => row.id} />
        </CardContent>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 font-medium bg-slate-50/50 mt-auto">
          <div>Showing 1 to 6 of 124 users</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white font-semibold shadow-sm">1</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">2</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">3</button>
            <button className="px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">Next</button>
          </div>
        </div>
      </Card>

      <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite New User">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Send an invitation email to a new team member to access the system.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email Address <span className="text-rose-500">*</span></label>
              <input type="email" placeholder="e.g. user@nexuserp.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all">
                  <option>System Admin</option>
                  <option>Manager</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Department</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all">
                  <option>IT</option>
                  <option>Sales</option>
                  <option>Finance</option>
                  <option>Logistics</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={() => setIsInviteModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all">
              Send Invite
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
