import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MapPin, Building2, Activity, ChartBar as BarChart3, Settings, FileText, Globe, Camera, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isContentOpen, setIsContentOpen] = React.useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Bookings', path: '/bookings' },
    {
      icon: Globe,
      label: 'Content Management',
      path: '/content',
      isParent: true,
      children: [
        { icon: Globe, label: 'Countries', path: '/content/countries' },
        { icon: Camera, label: 'Gallery Cities', path: '/content/cities' },
        { icon: MapPin, label: 'Locations', path: '/content/locations' },
        { icon: Building2, label: 'Activity Categories', path: '/content/categories' },
        { icon: Activity, label: 'Activities', path: '/content/activities' },
      ]
    },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', disabled: true },
    { icon: Settings, label: 'Settings', path: '/settings', disabled: true },
    { icon: FileText, label: 'Audit Log', path: '/audit', disabled: true },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-[#F5F6FA] z-50 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 h-20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#4E6AF3] rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2D2D2D]">My Lanka</h1>
              <p className="text-xs text-[#9CA3AF]">Journey Admin</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-200 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 flex-grow overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.label} className="mb-2">
              {item.isParent ? (
                <div>
                  <button
                    onClick={() => setIsContentOpen(!isContentOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-[#6B7280] hover:bg-white hover:text-[#4E6AF3] rounded-lg transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isContentOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isContentOpen && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) => `
                            flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                            ${isActive 
                              ? 'bg-[#4E6AF3] text-white' 
                              : 'text-[#6B7280] hover:bg-white hover:text-[#4E6AF3]'
                            }
                          `}
                        >
                          <child.icon className="w-4 h-4" />
                          <span>{child.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.disabled ? '#' : item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${isActive && !item.disabled
                      ? 'bg-[#4E6AF3] text-white' 
                      : item.disabled 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-[#6B7280] hover:bg-white hover:text-[#4E6AF3]'
                    }
                  `}
                  onClick={(e) => item.disabled && e.preventDefault()}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>
        
        {/* Logout Button */}
        <div className="mt-auto px-3 pb-8 pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-white rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;