import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';

import { Dashboard } from './pages/Dashboard';
import { Quotations } from './pages/Quotations';
import { QuotationDetails } from './pages/QuotationDetails';
import { PurchaseOrders } from './pages/PurchaseOrders';
import { PurchaseOrderDetails } from './pages/PurchaseOrderDetails';
import { SalesOrders } from './pages/SalesOrders';
import { DocumentProcessing } from './pages/DocumentProcessing';
import { DocumentValidation } from './pages/DocumentValidation';
import { Inventory } from './pages/Inventory';
import { InventoryList } from './pages/InventoryList';
import { Customers } from './pages/Customers';
import { CustomerDetails } from './pages/CustomerDetails';
import { Suppliers } from './pages/Suppliers';
import { SupplierDetails } from './pages/SupplierDetails';
import { Items } from './pages/Items';
import { Warehouse } from './pages/Warehouse';
import { Reports } from './pages/Reports';
import { ExceptionQueue } from './pages/ExceptionQueue';
import { AuditLogs } from './pages/AuditLogs';
import { Settings } from './pages/Settings';
import { UserManagement } from './pages/UserManagement';
import { ERPIntegration } from './pages/ERPIntegration';
import { DocumentCollection } from './pages/DocumentCollection';
import { MasterData } from './pages/MasterData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="quotations">
            <Route index element={<Quotations />} />
            <Route path=":id" element={<QuotationDetails />} />
          </Route>
          <Route path="purchase-orders">
            <Route index element={<PurchaseOrders />} />
            <Route path=":id" element={<PurchaseOrderDetails />} />
          </Route>
          <Route path="sales-orders" element={<SalesOrders />} />
          <Route path="document-collection" element={<DocumentCollection />} />
          <Route path="document-processing">
            <Route index element={<DocumentProcessing />} />
            <Route path=":id" element={<DocumentValidation />} />
          </Route>
          <Route path="inventory">
            <Route index element={<Inventory />} />
            <Route path="list" element={<InventoryList />} />
          </Route>
          <Route path="master-data" element={<MasterData />} />
          <Route path="customers">
            <Route index element={<Customers />} />
            <Route path=":id" element={<CustomerDetails />} />
          </Route>
          <Route path="suppliers">
            <Route index element={<Suppliers />} />
            <Route path=":id" element={<SupplierDetails />} />
          </Route>
          <Route path="items" element={<Items />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="reports" element={<Reports />} />
          <Route path="exception-queue" element={<ExceptionQueue />} />
          <Route path="erp-integration" element={<ERPIntegration />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="user-management" element={<UserManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
