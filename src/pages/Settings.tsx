import { useState } from 'react';
import { 
  Building2, 
  Scan, 
  Network, 
  FolderSync, 
  Mail, 
  BellRing, 
  Activity, 
  Save,
  Server,
  Database,
  HardDrive
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const settingTabs = [
  { id: 'company', label: 'Company Profile', icon: Building2 },
  { id: 'ocr', label: 'OCR Configuration', icon: Scan },
  { id: 'erp', label: 'ERP API', icon: Network },
  { id: 'network', label: 'Network Folders', icon: FolderSync },
  { id: 'email', label: 'Email Settings', icon: Mail },
  { id: 'notifications', label: 'Notification Preferences', icon: BellRing },
  { id: 'health', label: 'System Health', icon: Activity },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');

  const renderContent = () => {
    switch (activeTab) {
      case 'company':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Company Name</label>
                <input type="text" defaultValue="Nexus Enterprise" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Tax Registration Number (TRN)</label>
                <input type="text" defaultValue="100299388400003" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Registered Address</label>
                <textarea rows={3} defaultValue="Dubai Investment Park, PO Box 12345, UAE" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 custom-scrollbar" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mt-8 pt-4">Localization Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">System Language</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Arabic (UAE)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Base Currency</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white" disabled>
                  <option>AED (United Arab Emirates Dirham)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">UI Theme</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white">
                  <option>Oracle Fusion Light (Default)</option>
                  <option>Dark Mode</option>
                  <option>System Default</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'ocr':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">OCR Processing Engine</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Confidence Threshold (%)</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="50" max="100" defaultValue="85" className="flex-1 accent-indigo-600" />
                  <span className="font-bold text-slate-700 w-12">85%</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Documents scoring below this threshold will be sent to the Exception Queue.</p>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="autoApprove" defaultChecked className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
                <label htmlFor="autoApprove" className="text-sm font-medium text-slate-700">Auto-approve documents scoring above 95%</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="lineItems" defaultChecked className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
                <label htmlFor="lineItems" className="text-sm font-medium text-slate-700">Enable advanced line item extraction</label>
              </div>
            </div>
          </div>
        );
      case 'erp':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">ERP API Configuration (Oracle Netsuite)</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">API Endpoint URL</label>
                <input type="text" defaultValue="https://api.netsuite.com/rest/v1" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-mono text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Client ID</label>
                  <input type="password" defaultValue="****************" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Client Secret</label>
                  <input type="password" defaultValue="****************" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-mono text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Sync Frequency</label>
                <select className="w-full md:w-1/2 px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 bg-white">
                  <option>Real-time (Webhooks)</option>
                  <option>Every 5 minutes</option>
                  <option>Every 1 hour</option>
                  <option>Manual Sync Only</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'health':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-800">System Diagnostics</h2>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800">Run Diagnostics</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Storage */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><HardDrive className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-800">Storage Capacity</h3>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-blue-500 w-[65%]"></div>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-500">650GB Used</span>
                  <span className="text-slate-800">1TB Total</span>
                </div>
              </div>

              {/* Database */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Database className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-800">Database Health</h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Status</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Optimal</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-slate-500">Response Time</span>
                  <span className="text-sm font-bold text-slate-800">24ms</span>
                </div>
              </div>

              {/* API */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Server className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-800">API Gateway</h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Uptime</span>
                  <span className="text-sm font-bold text-slate-800">99.99%</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-slate-500">Requests/min</span>
                  <span className="text-sm font-bold text-slate-800">1,245</span>
                </div>
              </div>

              {/* Queue */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Activity className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-800">Background Queues</h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Active Workers</span>
                  <span className="text-sm font-bold text-slate-800">12 / 16</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-slate-500">Pending Jobs</span>
                  <span className="text-sm font-bold text-slate-800">42</span>
                </div>
              </div>

            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64 text-slate-500">
            <p className="font-medium">Settings panel under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Configure application parameters, integrations, and preferences.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </div>

      <Card className="flex-1 flex overflow-hidden bg-white shadow-xl">
        {/* Left Sidebar Menu */}
        <div className="w-64 border-r border-slate-100 bg-slate-50/50 p-4 hidden md:block">
          <div className="space-y-1">
            {settingTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Content Area */}
        <CardContent className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
};
