import React from 'react';

const ServiceChart: React.FC = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = [65, 78, 82, 95, 88, 102];
  const maxValue = Math.max(...data);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Service Trends</h3>
        <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-end gap-2 h-32">
          {data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-200 rounded-t-sm relative" style={{ height: '100px' }}>
                <div 
                  className="bg-blue-500 rounded-t-sm transition-all duration-700 ease-out"
                  style={{ 
                    height: `${(value / maxValue) * 100}%`,
                    width: '100%',
                    position: 'absolute',
                    bottom: 0
                  }}
                />
              </div>
              <span className="text-xs text-gray-600">{months[index]}</span>
              <span className="text-xs font-medium text-gray-900">{value}</span>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">+18%</p>
              <p className="text-xs text-gray-500">Growth Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">510</p>
              <p className="text-xs text-gray-500">Total Services</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">94%</p>
              <p className="text-xs text-gray-500">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceChart;