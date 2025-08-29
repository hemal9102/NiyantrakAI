import React from 'react';
import StatsCard from '../ui/StatsCard';
import RecentActivity from '../dashboard/RecentActivity';
import ServiceChart from '../dashboard/ServiceChart';
import UrgentTasks from '../dashboard/UrgentTasks';
import { 
  Users, 
  Calendar, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Services This Month',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Equipment Items',
      value: '2,156',
      change: '+3%',
      trend: 'up',
      icon: Shield,
      color: 'purple'
    },
    {
      title: 'Urgent Tasks',
      value: '12',
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Completed Services',
      value: '76',
      change: '+10%',
      trend: 'up',
      icon: CheckCircle,
      color: 'indigo'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceChart />
        <RecentActivity />
      </div>

      {/* Urgent Tasks */}
      <UrgentTasks />
    </div>
  );
};

export default Dashboard;