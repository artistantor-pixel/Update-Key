import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './pages/HomePage';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminContent } from './pages/admin/AdminContent';
import { ContentProvider } from './context/ContentContext';
import { ProblemProvider } from './context/ProblemContext';
import { CareersPage } from './pages/CareersPage';
import { ProblemKeyPage } from './pages/ProblemKeyPage';

function App() {
  return (
    <ContentProvider>
      <ProblemProvider>
        <BrowserRouter>
          <Routes>
            {/* Main Public Site */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="careers" element={<CareersPage />} />
              <Route path="problem-key" element={<ProblemKeyPage />} />
            </Route>

            {/* Admin Panel */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="login" element={<AdminLogin />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="content" element={<AdminContent />} />
              {/* Mock settings route to prevent 404s from sidebar */}
              <Route path="settings" element={<div className="p-8 glass rounded-[2rem]">Settings Page Placeholder</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProblemProvider>
    </ContentProvider>
  );
}

export default App;
