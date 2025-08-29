import React, { useState } from 'react';
import { Calendar, Clock, Filter, Plus, CheckCircle, AlertTriangle, User } from 'lucide-react';

const Services: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const services = [
    {
      id: 1,
      type: 'Fire Extinguisher Inspection',
      client: 'ABC Corporation',
      technician: 'John Doe',
      date: '2024-01-25',
      time: '09:00 AM',
      status: 'completed',
      priority: 'medium',
      duration: '2 hours',
      cost: '$150'
    },
    {
      id: 2,
      type: 'Emergency Lighting Test',
      client: 'XYZ Manufacturing',
      technician: 'Sarah Wilson',
      date: '2024-01-26',
      time: '10:30 AM',
      status: 'in-progress',
      priority: 'high',
      duration: '3 hours',
      cost: '$200'
    },
    {
      id: 3,
      type: 'Sprinkler System Installation',
      client: 'Tech Startup Ltd',
      technician: 'Mike Johnson',
      date: '2024-01-27',
      time: '08:00 AM',
      status: 'scheduled',
      priority: 'high',
      duration: '6 hours',
      cost: '$800'
    },
    {
      id: 4,
      type: 'Fire Alarm System Maintenance',
      client: 'Healthcare Center',
      technician: 'Lisa Brown',
      date: '2024-01-28',
      time: '02:00 PM',
      status: 'scheduled',
      priority: 'medium',
      duration: '4 hours',
      cost: '$350'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'scheduled':
        return <Calendar className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredServices = services.filter(service => {
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    const matchesType = filterType === 'all' || service.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Management</h2>
          <p className="text-gray-600">Schedule and track fire safety services</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Schedule Service
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Services</option>
            <option value="inspection">Inspections</option>
            <option value="maintenance">Maintenance</option>
            <option value="installation">Installations</option>
            <option value="testing">Testing</option>
          </select>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Services</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredServices.map((service) => (
            <div key={service.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getStatusIcon(service.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{service.type}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(service.priority)}`}>
                        {service.priority} priority
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{service.client}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{service.date} at {service.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{service.technician}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{service.cost}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No services found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Services;