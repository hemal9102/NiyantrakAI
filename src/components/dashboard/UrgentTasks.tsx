import React from 'react';
import { AlertTriangle, Clock, Calendar } from 'lucide-react';

const UrgentTasks: React.FC = () => {
  const urgentTasks = [
    {
      id: 1,
      title: 'Fire extinguisher inspection overdue',
      client: 'Downtown Office Complex',
      dueDate: 'Due 2 days ago',
      priority: 'critical',
      type: 'inspection'
    },
    {
      id: 2,
      title: 'Emergency lighting system maintenance',
      client: 'City Hospital',
      dueDate: 'Due today',
      priority: 'high',
      type: 'maintenance'
    },
    {
      id: 3,
      title: 'Annual safety audit scheduled',
      client: 'Manufacturing Plant A',
      dueDate: 'Due in 2 days',
      priority: 'medium',
      type: 'audit'
    },
    {
      id: 4,
      title: 'Sprinkler system repair required',
      client: 'Shopping Mall',
      dueDate: 'Due tomorrow',
      priority: 'high',
      type: 'repair'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Urgent Tasks
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all tasks
        </button>
      </div>

      <div className="space-y-3">
        {urgentTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {task.type === 'inspection' && <Clock className="w-4 h-4 text-blue-500" />}
                {task.type === 'maintenance' && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                {task.type === 'audit' && <Calendar className="w-4 h-4 text-purple-500" />}
                {task.type === 'repair' && <AlertTriangle className="w-4 h-4 text-red-500" />}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.client}</p>
                <p className="text-xs text-gray-500 mt-1">{task.dueDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrgentTasks;