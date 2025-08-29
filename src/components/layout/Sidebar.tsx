import React from 'react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Shield, 
  UserCheck,
  FileText,
  Settings,
  Menu,
  Flame,
  MessageCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'services', label: 'Services', icon: Calendar },
    { id: 'equipment', label: 'Equipment', icon: Shield },
    { id: 'employees', label: 'Employees', icon: UserCheck },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="font-bold text-lg">Niyantrak</h1>
              <p className="text-gray-400 text-sm">Admin Panel</p>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                title={!isOpen ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
        >
          <Menu className="w-5 h-5" />
          {isOpen && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;