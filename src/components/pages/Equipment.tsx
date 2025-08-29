import React, { useState } from 'react';
import { Search, Plus, Shield, AlertTriangle, CheckCircle, Clock, Filter } from 'lucide-react';

const Equipment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const equipment = [
    {
      id: 'FE001',
      name: 'ABC Dry Chemical Fire Extinguisher',
      category: 'Fire Extinguisher',
      location: 'Building A - Floor 1',
      client: 'ABC Corporation',
      status: 'good',
      lastInspection: '2024-01-15',
      nextInspection: '2024-04-15',
      certificationExpiry: '2025-01-15',
      serialNumber: 'FE-2023-001'
    },
    {
      id: 'ES001',
      name: 'LED Emergency Exit Sign',
      category: 'Emergency Lighting',
      location: 'Building A - Corridor',
      client: 'ABC Corporation',
      status: 'maintenance-due',
      lastInspection: '2023-12-10',
      nextInspection: '2024-01-20',
      certificationExpiry: '2024-12-10',
      serialNumber: 'ES-2023-001'
    },
    {
      id: 'SP001',
      name: 'Wet Pipe Sprinkler System',
      category: 'Sprinkler System',
      location: 'XYZ Manufacturing - Main Floor',
      client: 'XYZ Manufacturing',
      status: 'good',
      lastInspection: '2024-01-20',
      nextInspection: '2024-07-20',
      certificationExpiry: '2025-01-20',
      serialNumber: 'SP-2023-001'
    },
    {
      id: 'FA001',
      name: 'Addressable Fire Alarm Panel',
      category: 'Fire Alarm',
      location: 'Tech Startup - Reception',
      client: 'Tech Startup Ltd',
      status: 'critical',
      lastInspection: '2023-11-15',
      nextInspection: '2024-01-25',
      certificationExpiry: '2024-11-15',
      serialNumber: 'FA-2023-001'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'maintenance-due':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'maintenance-due':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    return <Shield className="w-8 h-8 text-blue-500" />;
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Equipment Tracking</h2>
          <p className="text-gray-600">Monitor and manage fire safety equipment</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Equipment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2,156</p>
              <p className="text-sm text-gray-600">Total Equipment</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">1,987</p>
              <p className="text-sm text-gray-600">Good Condition</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">154</p>
              <p className="text-sm text-gray-600">Maintenance Due</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">15</p>
              <p className="text-sm text-gray-600">Critical Issues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Fire Extinguisher">Fire Extinguishers</option>
              <option value="Emergency Lighting">Emergency Lighting</option>
              <option value="Sprinkler System">Sprinkler Systems</option>
              <option value="Fire Alarm">Fire Alarms</option>
            </select>
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="good">Good</option>
            <option value="maintenance-due">Maintenance Due</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Equipment List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Equipment Inventory</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredEquipment.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <span className="text-sm text-gray-500">#{item.id}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-blue-600">{item.category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{item.client}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.location}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Last Inspection</p>
                        <p className="font-medium text-gray-900">{item.lastInspection}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Next Inspection</p>
                        <p className="font-medium text-gray-900">{item.nextInspection}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Certification Expiry</p>
                        <p className="font-medium text-gray-900">{item.certificationExpiry}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status.replace('-', ' ')}
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

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No equipment found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Equipment;