import React from 'react';
import { Clock, User, CheckCircle, AlertTriangle } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'service',
      title: 'Fire extinguisher inspection completed',
      client: 'ABC Corporation',
      time: '2 hours ago',
      status: 'completed',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Emergency light maintenance due',
      client: 'XYZ Manufacturing',
      time: '4 hours ago',
      status: 'pending',
      icon: AlertTriangle,
      color: 'text-yellow-500'
    },
    {
      id: 3,
      type: 'service',
      title: 'Sprinkler system installation',
      client: 'Tech Startup Ltd',
      time: '6 hours ago',
      status: 'in-progress',
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      id: 4,
      type: 'client',
      title: 'New client onboarded',
      client: 'Retail Chain Inc',
      time: '1 day ago',
      status: 'completed',
      icon: User,
      color: 'text-purple-500'
    },
    {
      id: 5,
      type: 'service',
      title: 'Annual safety audit completed',
      client: 'Healthcare Center',
      time: '2 days ago',
      status: 'completed',
      icon: CheckCircle,
      color: 'text-green-500'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`mt-0.5 ${activity.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.client}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                activity.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {activity.status}
              </span>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
        View all activities
      </button>
    </div>
  );
};

export default RecentActivity;