import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reports = [
    {
      id: 1,
      title: 'Monthly Service Summary',
      description: 'Complete overview of services performed this month',
      type: 'service',
      generatedDate: '2024-01-25',
      size: '2.4 MB',
      pages: 12
    },
    {
      id: 2,
      title: 'Equipment Compliance Report',
      description: 'Status of all equipment and compliance requirements',
      type: 'compliance',
      generatedDate: '2024-01-20',
      size: '1.8 MB',
      pages: 8
    },
    {
      id: 3,
      title: 'Client Performance Analytics',
      description: 'Analysis of client service history and trends',
      type: 'analytics',
      generatedDate: '2024-01-15',
      size: '3.2 MB',
      pages: 16
    },
    {
      id: 4,
      title: 'Employee Productivity Report',
      description: 'Team performance and productivity metrics',
      type: 'employee',
      generatedDate: '2024-01-10',
      size: '1.5 MB',
      pages: 6
    }
  ];

  const metrics = [
    {
      title: 'Services Completed',
      value: '234',
      change: '+12%',
      period: 'This Month'
    },
    {
      title: 'Revenue Generated',
      value: '$67,890',
      change: '+18%',
      period: 'This Month'
    },
    {
      title: 'Client Satisfaction',
      value: '4.8/5.0',
      change: '+0.2',
      period: 'Average Rating'
    },
    {
      title: 'Compliance Rate',
      value: '98.5%',
      change: '+1.2%',
      period: 'Overall'
    }
  ];

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <FileText className="w-8 h-8 text-blue-500" />;
      case 'compliance':
        return <BarChart3 className="w-8 h-8 text-green-500" />;
      case 'analytics':
        return <TrendingUp className="w-8 h-8 text-purple-500" />;
      case 'employee':
        return <PieChart className="w-8 h-8 text-orange-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const getReportColor = (type: string) => {
    switch (type) {
      case 'service':
        return 'bg-blue-50 border-blue-200';
      case 'compliance':
        return 'bg-green-50 border-green-200';
      case 'analytics':
        return 'bg-purple-50 border-purple-200';
      case 'employee':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Generate and download comprehensive reports</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.period}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">{metric.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Report Generation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left">
            <FileText className="w-8 h-8 text-blue-500 mb-3" />
            <h4 className="font-medium text-gray-900">Service Report</h4>
            <p className="text-sm text-gray-600 mt-1">Complete service overview</p>
          </button>
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left">
            <BarChart3 className="w-8 h-8 text-green-500 mb-3" />
            <h4 className="font-medium text-gray-900">Compliance Report</h4>
            <p className="text-sm text-gray-600 mt-1">Equipment compliance status</p>
          </button>
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left">
            <TrendingUp className="w-8 h-8 text-purple-500 mb-3" />
            <h4 className="font-medium text-gray-900">Analytics Report</h4>
            <p className="text-sm text-gray-600 mt-1">Performance analytics</p>
          </button>
          <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-left">
            <PieChart className="w-8 h-8 text-orange-500 mb-3" />
            <h4 className="font-medium text-gray-900">Financial Report</h4>
            <p className="text-sm text-gray-600 mt-1">Revenue and costs</p>
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg border ${getReportColor(report.type)}`}>
                    {getReportIcon(report.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{report.title}</h4>
                    <p className="text-gray-600 mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Generated: {report.generatedDate}</span>
                      </div>
                      <span>{report.size} • {report.pages} pages</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Trends Overview</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-2" />
            <p>Interactive charts and analytics</p>
            <p className="text-sm">Service trends, revenue growth, and performance metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;