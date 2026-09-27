import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';

const stats = [
  { name: 'Total Leads', value: '142', change: '+12.5%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Conversion Rate', value: '4.2%', change: '+1.1%', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Avg. Project Size', value: '$8,450', change: '+5.4%', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'Active Projects', value: '12', change: '0%', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 rounded-[1.5rem] flex items-center justify-between group hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div>
              <p className="text-sm font-medium text-foreground/60 mb-1">{stat.name}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className={`text-xs font-semibold mt-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-foreground/40'}`}>
                {stat.change} from last month
              </p>
            </div>
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mock Chart Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass rounded-[2rem] p-6 h-[400px] flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Growth Overview</h3>
            <select className="bg-surface/50 border border-border/50 rounded-lg px-3 py-1 text-sm outline-none">
              <option>This Year</option>
              <option>Last 6 Months</option>
              <option>This Month</option>
            </select>
          </div>
          
          <div className="flex-1 relative flex items-end justify-between px-2 pb-4 gap-2 border-b border-l border-border/30">
             {/* Fake Bars */}
             {[40, 65, 45, 80, 55, 90, 75, 100].map((height, i) => (
               <div key={i} className="w-full flex justify-center group relative">
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${height}%` }}
                   transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                   className="w-full max-w-[40px] bg-gradient-to-t from-primary/20 to-primary rounded-t-lg group-hover:opacity-80 transition-opacity"
                 />
                 <span className="absolute -bottom-6 text-xs text-foreground/50 font-medium">
                   {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i]}
                 </span>
               </div>
             ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-[2rem] p-6 flex flex-col"
        >
          <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
          <div className="space-y-6 flex-1">
            {[
              { title: 'New lead from Sarah', time: '10 mins ago', type: 'lead' },
              { title: 'Payment received: $2,400', time: '2 hours ago', type: 'payment' },
              { title: 'Project "Canvas" deployed', time: '5 hours ago', type: 'system' },
              { title: 'New lead from John', time: '1 day ago', type: 'lead' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    activity.type === 'lead' ? 'bg-blue-500' : 
                    activity.type === 'payment' ? 'bg-green-500' : 'bg-purple-500'
                  }`} />
                  {i !== 3 && <div className="absolute top-4 left-1 w-px h-10 bg-border/50" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-foreground/50 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};
