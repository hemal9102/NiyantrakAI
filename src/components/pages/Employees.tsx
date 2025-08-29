import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Badge, Calendar, Filter } from 'lucide-react';

const Employees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const employees = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Senior Fire Safety Inspector',
      email: 'john.doe@niyantrak.com',
      phone: '+1 (555) 123-4567',
      certifications: ['NFPA Inspector', 'Fire Extinguisher Service'],
      activeServices: 12,
      completedServices: 156,
      joinDate: '2022-03-15',
      status: 'active',
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      role: 'Fire Safety Technician',
      email: 'sarah.wilson@niyantrak.com',
      phone: '+1 (555) 987-6543',
      certifications: ['Emergency Lighting', 'Fire Alarm Systems'],
      activeServices: 8,
      completedServices: 89,
      joinDate: '2023-01-20',
      status: 'active',
      avatar: 'SW'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Installation Specialist',
      email: 'mike.johnson@niyantrak.com',
      phone: '+1 (555) 456-7890',
      certifications: ['Sprinkler Installation', 'Fire Suppression Systems'],
      activeServices: 5,
      completedServices: 34,
      joinDate: '2023-06-10',
      status: 'active',
      avatar: 'MJ'
    },
    {
      id: 4,
      name: 'Lisa Brown',
      role: 'Senior Technician',
      email: 'lisa.brown@niyantrak.com',
      phone: '+1 (555) 321-0987',
      certifications: ['Fire Alarm Maintenance', 'System Integration'],
      activeServices: 15,
      completedServices: 203,
      joinDate: '2021-11-05',
      status: 'on-leave',
      avatar: 'LB'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || employee.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
          <p className="text-gray-600">Manage your fire safety team and certifications</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600">Total Employees</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">22</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">2</p>
            <p className="text-sm text-gray-600">On Leave</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">67</p>
            <p className="text-sm text-gray-600">Certifications</p>
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
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="inspector">Inspectors</option>
              <option value="technician">Technicians</option>
              <option value="specialist">Specialists</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {employee.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{employee.name}</h3>
                  <p className="text-gray-600">{employee.role}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                {employee.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Badge className="w-4 h-4 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Certifications:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {employee.certifications.map((cert, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined: {employee.joinDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{employee.activeServices}</p>
                <p className="text-xs text-gray-500">Active Services</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-green-600">{employee.completedServices}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
                View Profile
              </button>
              <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
                Assign Task
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No employees found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Employees;