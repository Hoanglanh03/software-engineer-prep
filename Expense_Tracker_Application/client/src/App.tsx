import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/useAuthStore';
import MobileDashboard from './pages/MobileDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminLogin from './pages/AdminLogin';
import { TooltipProvider } from './components/ui/tooltip';

function ProtectedRoute({ children, adminOnly = false }: { children: ReactNode; adminOnly?: boolean }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AuthRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/signin" element={<AuthRoute><SignIn /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />
          <Route path="/admin/login" element={<AuthRoute><AdminLogin /></AuthRoute>} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><MobileDashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}
