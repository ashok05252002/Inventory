import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  FileText, 
  Files,
  DownloadCloud,
  Database,
  Package, 
  Users, 
  Box, 
  Warehouse, 
  BarChart3, 
  AlertCircle, 
  ClipboardList, 
  Settings, 
  UserCog,
  Bell,
  Search,
  Network
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Purchase Orders', path: '/purchase-orders', icon: ShoppingCart },
  { name: 'Sales Orders', path: '/sales-orders', icon: FileText },
  { name: 'Document Collection', path: '/document-collection', icon: DownloadCloud },
  { name: 'Document Processing', path: '/document-processing', icon: Files },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Items', path: '/items', icon: Box },
  { name: 'Warehouse', path: '/warehouse', icon: Warehouse },
  { name: 'Master Data Hub', path: '/master-data', icon: Database },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Exception Queue', path: '/exception-queue', icon: AlertCircle },
  { name: 'ERP Integration', path: '/erp-integration', icon: Network },
  { name: 'Audit Logs', path: '/audit-logs', icon: ClipboardList },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'User Management', path: '/user-management', icon: UserCog },
];

export const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - Rich Dark Theme */}
      <aside className="w-64 bg-slate-900 text-white border-r border-slate-800 flex-col hidden lg:flex shadow-2xl z-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
        <div className="h-16 flex items-center px-6 border-b border-slate-800/60 relative z-10 backdrop-blur-sm bg-slate-900/50">
          <div className="flex items-center gap-3 text-indigo-400 group cursor-pointer">
            <div className="p-1.5 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
              <Box className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-50 transition-colors">NexusERP</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 custom-scrollbar relative z-10">
          <ul className="space-y-1.5 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'bg-indigo-500/20 text-indigo-300 shadow-sm border border-indigo-500/10' 
                        : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-300'}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* User profile at bottom of sidebar */}
        <div className="p-4 border-t border-slate-800 relative z-10 bg-slate-900/80">
          <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-slate-800 transition-colors group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:shadow-indigo-500/25 transition-all">
              JD
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-slate-200 leading-none group-hover:text-white transition-colors">John Doe</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Admin</p>
            </div>
            <Settings className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors rotate-0 group-hover:rotate-45 duration-300" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shrink-0 z-10 shadow-sm sticky top-0">
          <div className="flex items-center flex-1">
            <div className="max-w-md w-full hidden md:block relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources, orders, or items..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none shadow-inner group-focus-within:shadow-md"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2.5 relative text-slate-400 hover:text-indigo-600 transition-all rounded-full hover:bg-indigo-50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
          </div>
        </header>
        
        {/* Page Content with Mesh Background */}
        <div className="flex-1 overflow-auto bg-mesh relative">
          <div className="absolute inset-0 max-w-7xl mx-auto w-full p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
