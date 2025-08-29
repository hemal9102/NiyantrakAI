import React, { useState } from 'react';
import { Search, Plus, MapPin, Phone, Mail, Calendar, Filter } from 'lucide-react';

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const clients = [
    {
      id: 1,
      name: 'ABC Corporation',
      contact: 'John Smith',
      email: 'john@abccorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Ave, City, ST 12345',
      status: 'active',
      lastService: '2024-01-15',
      nextService: '2024-04-15',
      servicesCount: 12,
      contractValue: '$45,000'
    },
    {
      id: 2,
      name: 'XYZ Manufacturing',
      contact: 'Sarah Johnson',
      email: 'sarah@xyzmfg.com',
      phone: '+1 (555) 987-6543',
      address: '456 Industrial Blvd, City, ST 12345',
      status: 'active',
      lastService: '2024-01-20',
      nextService: '2024-03-20',
      servicesCount: 8,
      contractValue: '$32,500'
    },
    {
      id: 3,
      name: 'Tech Startup Ltd',
      contact: 'Mike Davis',
      email: 'mike@techstartup.com',
      phone: '+1 (555) 456-7890',
      address: '789 Innovation Dr, City, ST 12345',
      status: 'pending',
      lastService: '2023-12-10',
      nextService: '2024-02-28',
      servicesCount: 5,
      contractValue: '$18,750'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-600">Manage your fire safety clients and contracts</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Client
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg text-gray-900">{client.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                {client.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>{client.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Next Service: {client.nextService}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{client.servicesCount}</p>
                  <p className="text-xs text-gray-500">Services</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-green-600">{client.contractValue}</p>
                  <p className="text-xs text-gray-500">Contract Value</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
                View Details
              </button>
              <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
                Schedule Service
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No clients found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Clients;