import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 flex items-center h-20">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E6AF3] focus:border-transparent w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-[#6B7280]" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#EF4444] rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#4E6AF3] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-[#2D2D2D]">Admin User</p>
              <p className="text-xs text-[#9CA3AF]">admin@mylanka.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;