import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const leadsData = [
  { id: '1024', name: 'Sarah Jenkins', company: 'TechFlow', email: 'sarah@techflow.io', service: 'Web Development', status: 'New', date: 'Today, 10:42 AM', budget: '$5k - $10k' },
  { id: '1023', name: 'Marcus Chen', company: 'Elevate Ads', email: 'm.chen@elevate.co', service: 'Paid Ads', status: 'Contacted', date: 'Yesterday', budget: '$2k - $5k' },
  { id: '1022', name: 'Elena Rodriguez', company: 'Studio Nine', email: 'elena@studionine.art', service: 'Branding', status: 'In Progress', date: 'Oct 24', budget: '$1k - $2k' },
  { id: '1021', name: 'David Smith', company: 'AI Solutions', email: 'david@aisolutions.dev', service: 'AI Agents', status: 'Closed', date: 'Oct 22', budget: '$10k+' },
  { id: '1020', name: 'Lisa Wong', company: 'Growth Marketers', email: 'lisa@growth.com', service: 'Full Ecosystem', status: 'New', date: 'Oct 20', budget: '$10k+' },
];

export const AdminLeads = () => {
  return (
    <div className="space-y-6">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
          <input 
            type="text" 
            placeholder="Search leads by name or company..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-border/50 bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="bg-white/50 border-border/50 h-10 px-4 rounded-xl shadow-sm hidden md:flex">
            <Filter size={16} className="mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="bg-white/50 border-border/50 h-10 px-4 rounded-xl shadow-sm hidden md:flex">
            <Download size={16} className="mr-2" /> Export
          </Button>
          <Button variant="primary" size="sm" className="h-10 px-6 rounded-xl shadow-sm w-full sm:w-auto">
            Add Lead Manually
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2rem] overflow-hidden border border-white/60"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/30 bg-white/20">
                <th className="py-4 px-6 font-semibold text-sm text-foreground/70">Client</th>
                <th className="py-4 px-6 font-semibold text-sm text-foreground/70 hidden sm:table-cell">Service</th>
                <th className="py-4 px-6 font-semibold text-sm text-foreground/70 hidden md:table-cell">Budget</th>
                <th className="py-4 px-6 font-semibold text-sm text-foreground/70 hidden lg:table-cell">Date</th>
                <th className="py-4 px-6 font-semibold text-sm text-foreground/70">Status</th>
                <th className="py-4 px-6 font-semibold text-sm text-foreground/70 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leadsData.map((lead) => (
                <tr key={lead.id} className="border-b border-border/20 hover:bg-white/40 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="font-bold text-sm text-foreground">{lead.name}</p>
                    <p className="text-xs text-foreground/60">{lead.company} • {lead.email}</p>
                  </td>
                  <td className="py-4 px-6 hidden sm:table-cell text-sm font-medium text-foreground/80">{lead.service}</td>
                  <td className="py-4 px-6 hidden md:table-cell text-sm text-foreground/60">{lead.budget}</td>
                  <td className="py-4 px-6 hidden lg:table-cell text-sm text-foreground/60">{lead.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      lead.status === 'New' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' :
                      lead.status === 'Contacted' ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20' :
                      lead.status === 'In Progress' ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' :
                      'bg-green-500/10 text-green-600 border border-green-500/20'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-foreground/40 hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-border/30 bg-white/10 flex items-center justify-between text-sm text-foreground/60">
          <span>Showing 1 to 5 of 42 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md bg-white/50 hover:bg-white transition-colors border border-border/50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md bg-white/50 hover:bg-white transition-colors border border-border/50">Next</button>
          </div>
        </div>
      </motion.div>

    </div>
  );
};
