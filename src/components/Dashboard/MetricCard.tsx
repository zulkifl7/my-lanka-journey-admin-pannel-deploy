import React from 'react';
import { Video as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-[#2D2D2D] mb-1">{value}</h3>
        <p className="text-sm text-[#9CA3AF]">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;