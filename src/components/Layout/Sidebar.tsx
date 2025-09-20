import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Shield,
  Calendar,
  FileText,
  Send,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/employees', icon: Users, label: 'Funcionários' },
    { path: '/risks', icon: Shield, label: 'Riscos Ocupacionais' },
    { path: '/exams', icon: Calendar, label: 'Exames' },
    { path: '/documents', icon: FileText, label: 'Documentos' },
    { path: '/esocial', icon: Send, label: 'eSocial' },
    { path: '/reports', icon: BarChart3, label: 'Relatórios' },
    { path: '/settings', icon: Settings, label: 'Configurações' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-blue-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <Shield className="h-8 w-8 mr-3" />
        <div>
          <h1 className="text-xl font-bold">Sistema SST</h1>
          <p className="text-blue-200 text-sm">Saúde e Segurança</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-800 text-white'
                : 'text-blue-100 hover:bg-blue-800'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg transition-colors w-full"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
