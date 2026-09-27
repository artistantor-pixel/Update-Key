import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Save, LayoutTemplate, Briefcase, Tag, Target, Users, Search, Calculator, LayoutGrid } from 'lucide-react';

type Tab = 'hero' | 'sectors' | 'services' | 'pricing' | 'work' | 'team' | 'careers' | 'calculator';

export const AdminContent = () => {
  const { content, updateHero, updateSectors, updateServices, updatePricing, updateCaseStudies, updateTeam, updateCareers, updateCalculator } = useContent();
  const [activeTab, setActiveTab] = useState<Tab>('hero');

  // Local state for forms
  const [heroForm, setHeroForm] = useState(content.hero);
  const [sectorsForm, setSectorsForm] = useState(content.sectors);
  const [servicesForm, setServicesForm] = useState(content.services);
  const [pricingForm, setPricingForm] = useState(content.pricing);
  const [workForm, setWorkForm] = useState(content.caseStudies);
  const [teamForm, setTeamForm] = useState(content.team);
  const [careersForm, setCareersForm] = useState(content.careers);
  const [calculatorForm, setCalculatorForm] = useState(content.calculator);

  // Savers
  const handleSave = (tab: Tab) => {
    if (tab === 'hero') updateHero(heroForm);
    if (tab === 'sectors') updateSectors(sectorsForm);
    if (tab === 'services') updateServices(servicesForm);
    if (tab === 'pricing') updatePricing(pricingForm);
    if (tab === 'work') updateCaseStudies(workForm);
    if (tab === 'team') updateTeam(teamForm);
    if (tab === 'careers') updateCareers(careersForm);
    if (tab === 'calculator') updateCalculator(calculatorForm);
    alert(`${tab.toUpperCase()} section updated on live site!`);
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'hero', label: 'Hero', icon: LayoutTemplate },
    { id: 'sectors', label: 'Ecosystem', icon: LayoutGrid },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'pricing', label: 'Pricing', icon: Tag },
    { id: 'work', label: 'Case Studies', icon: Target },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'careers', label: 'Careers', icon: Search },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Manager (CMS)</h1>
          <p className="text-foreground/60">Edit website content here. Changes are instantly reflected on the live site.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <Button 
              key={t.id}
              variant={activeTab === t.id ? 'primary' : 'outline'} 
              onClick={() => setActiveTab(t.id)}
              className="rounded-full shrink-0"
            >
              <Icon size={16} className="mr-2" /> {t.label}
            </Button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* HERO EDITOR */}
        {activeTab === 'hero' && (
          <Card className="p-6 md:p-8 space-y-6 bg-surface border border-border shadow-sm">
            <h2 className="text-xl font-bold border-b border-border pb-4">Hero Section Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground/80">Badge Text</label>
                <input type="text" value={heroForm.badge} onChange={(e) => setHeroForm({...heroForm, badge: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground/80">Headline Line 1</label>
                  <input type="text" value={heroForm.headlineLine1} onChange={(e) => setHeroForm({...heroForm, headlineLine1: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground/80">Headline Line 2 (Gradient)</label>
                  <input type="text" value={heroForm.headlineLine2} onChange={(e) => setHeroForm({...heroForm, headlineLine2: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground/80">Description</label>
                <textarea value={heroForm.description} onChange={(e) => setHeroForm({...heroForm, description: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-3 h-24 focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground/80">Primary Button Text</label>
                  <input type="text" value={heroForm.primaryButtonText} onChange={(e) => setHeroForm({...heroForm, primaryButtonText: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground/80">Secondary Button Text</label>
                  <input type="text" value={heroForm.secondaryButtonText} onChange={(e) => setHeroForm({...heroForm, secondaryButtonText: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={() => handleSave('hero')} className="rounded-xl px-8 shadow-md">
                <Save size={18} className="mr-2" /> Save Hero
              </Button>
            </div>
          </Card>
        )}

        {/* SECTORS EDITOR */}
        {activeTab === 'sectors' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-foreground">Manage Ecosystem (Bento Grid)</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {sectorsForm.map((sector, idx) => (
                  <Card key={idx} className="p-5 bg-surface border border-border space-y-3">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Sector Title</label>
                      <input type="text" value={sector.title} onChange={e => { const newArr = [...sectorsForm]; newArr[idx].title = e.target.value; setSectorsForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Description</label>
                      <textarea value={sector.description} onChange={e => { const newArr = [...sectorsForm]; newArr[idx].description = e.target.value; setSectorsForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 h-20" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Icon Name</label>
                        <select value={sector.iconName} onChange={e => { const newArr = [...sectorsForm]; newArr[idx].iconName = e.target.value; setSectorsForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm">
                          <option value="Newspaper">Newspaper</option>
                          <option value="Smile">Smile</option>
                          <option value="Users">Users</option>
                          <option value="ShoppingCart">ShoppingCart</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Link</label>
                        <input type="text" value={sector.link} onChange={e => { const newArr = [...sectorsForm]; newArr[idx].link = e.target.value; setSectorsForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>
                  </Card>
               ))}
             </div>
             <div className="flex justify-end sticky bottom-6 z-10">
               <Button onClick={() => handleSave('sectors')} size="lg" className="rounded-xl px-8 shadow-xl shadow-primary/20">
                 <Save size={18} className="mr-2" /> Save Ecosystem
               </Button>
             </div>
          </div>
        )}

        {/* SERVICES EDITOR */}
        {activeTab === 'services' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-foreground">Manage Services</h2>
             </div>
             {servicesForm.map((svc, idx) => (
                <Card key={idx} className="p-6 bg-surface border border-border space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Service Title</label>
                      <input type="text" value={svc.title} onChange={e => { const newSvc = [...servicesForm]; newSvc[idx].title = e.target.value; setServicesForm(newSvc); }} className="w-full bg-background border border-border rounded-lg px-4 py-2 font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Description</label>
                    <textarea value={svc.description} onChange={e => { const newSvc = [...servicesForm]; newSvc[idx].description = e.target.value; setServicesForm(newSvc); }} className="w-full bg-background border border-border rounded-lg px-4 py-2 h-20" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Features (one per line)</label>
                    <textarea value={svc.features.join('\n')} onChange={e => { const newSvc = [...servicesForm]; newSvc[idx].features = e.target.value.split('\n'); setServicesForm(newSvc); }} className="w-full bg-background border border-border rounded-lg px-4 py-2 h-28" />
                  </div>
                </Card>
             ))}
             <div className="flex justify-end sticky bottom-6 z-10">
               <Button onClick={() => handleSave('services')} size="lg" className="rounded-xl px-8 shadow-xl shadow-primary/20">
                 <Save size={18} className="mr-2" /> Save Services
               </Button>
             </div>
          </div>
        )}

        {/* PRICING EDITOR */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-foreground">Manage Pricing Plans</h2>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {pricingForm.map((plan, idx) => (
                  <Card key={idx} className={`p-6 bg-surface border ${plan.popular ? 'border-primary' : 'border-border'} space-y-4 flex flex-col`}>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Plan Name</label>
                      <input type="text" value={plan.name} onChange={e => { const newArr = [...pricingForm]; newArr[idx].name = e.target.value; setPricingForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Price</label>
                      <input type="text" value={plan.price} onChange={e => { const newArr = [...pricingForm]; newArr[idx].price = e.target.value; setPricingForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Tagline</label>
                      <input type="text" value={plan.tagline} onChange={e => { const newArr = [...pricingForm]; newArr[idx].tagline = e.target.value; setPricingForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <input type="checkbox" checked={plan.popular} onChange={e => { const newArr = [...pricingForm]; newArr[idx].popular = e.target.checked; setPricingForm(newArr); }} className="w-5 h-5 accent-primary" />
                      <label className="text-sm font-bold">Mark as Popular</label>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Features (one per line)</label>
                      <textarea value={plan.features.join('\n')} onChange={e => { const newArr = [...pricingForm]; newArr[idx].features = e.target.value.split('\n'); setPricingForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 h-40" />
                    </div>
                  </Card>
               ))}
             </div>
             <div className="flex justify-end sticky bottom-6 z-10">
               <Button onClick={() => handleSave('pricing')} size="lg" className="rounded-xl px-8 shadow-xl shadow-primary/20">
                 <Save size={18} className="mr-2" /> Save Pricing
               </Button>
             </div>
          </div>
        )}

        {/* WORK / CASE STUDIES EDITOR */}
        {activeTab === 'work' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-foreground">Manage Case Studies</h2>
             </div>
             {workForm.map((work, idx) => (
                <Card key={idx} className="p-6 bg-surface border border-border space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Title</label>
                      <input type="text" value={work.title} onChange={e => { const newArr = [...workForm]; newArr[idx].title = e.target.value; setWorkForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Category</label>
                      <input type="text" value={work.category} onChange={e => { const newArr = [...workForm]; newArr[idx].category = e.target.value; setWorkForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Image URL</label>
                    <input type="text" value={work.image} onChange={e => { const newArr = [...workForm]; newArr[idx].image = e.target.value; setWorkForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background/50 rounded-xl border border-border">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-primary uppercase">Metric: ROAS / ROI</label>
                      <input type="text" value={work.metrics.roas} onChange={e => { const newArr = [...workForm]; newArr[idx].metrics.roas = e.target.value; setWorkForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-primary uppercase">Metric: Time Saved</label>
                      <input type="text" value={work.metrics.timeSaved} onChange={e => { const newArr = [...workForm]; newArr[idx].metrics.timeSaved = e.target.value; setWorkForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-primary uppercase">Metric: Conversion Lift</label>
                      <input type="text" value={work.metrics.conversionLift} onChange={e => { const newArr = [...workForm]; newArr[idx].metrics.conversionLift = e.target.value; setWorkForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Challenge Tab Content</label>
                      <textarea value={work.tabs.challenge} onChange={e => { const newArr = [...workForm]; newArr[idx].tabs.challenge = e.target.value; setWorkForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 h-24" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Solution Tab Content</label>
                      <textarea value={work.tabs.solution} onChange={e => { const newArr = [...workForm]; newArr[idx].tabs.solution = e.target.value; setWorkForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 h-24" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Impact Tab Content</label>
                      <textarea value={work.tabs.impact} onChange={e => { const newArr = [...workForm]; newArr[idx].tabs.impact = e.target.value; setWorkForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 h-24" />
                    </div>
                  </div>
                </Card>
             ))}
             <div className="flex justify-end sticky bottom-6 z-10">
               <Button onClick={() => handleSave('work')} size="lg" className="rounded-xl px-8 shadow-xl shadow-primary/20">
                 <Save size={18} className="mr-2" /> Save Case Studies
               </Button>
             </div>
          </div>
        )}

        {/* TEAM EDITOR */}
        {activeTab === 'team' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-foreground">Manage Team</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {teamForm.map((member, idx) => (
                  <Card key={idx} className="p-5 bg-surface border border-border space-y-3">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Name</label>
                      <input type="text" value={member.name} onChange={e => { const newArr = [...teamForm]; newArr[idx].name = e.target.value; setTeamForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Role</label>
                      <input type="text" value={member.role} onChange={e => { const newArr = [...teamForm]; newArr[idx].role = e.target.value; setTeamForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Image URL</label>
                      <input type="text" value={member.image} onChange={e => { const newArr = [...teamForm]; newArr[idx].image = e.target.value; setTeamForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Bio</label>
                      <textarea value={member.bio} onChange={e => { const newArr = [...teamForm]; newArr[idx].bio = e.target.value; setTeamForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 h-20" />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs font-bold mb-1 text-blue-500 uppercase">LinkedIn</label>
                        <input type="text" value={member.socials.linkedin} onChange={e => { const newArr = [...teamForm]; newArr[idx].socials.linkedin = e.target.value; setTeamForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-2 py-1 text-xs" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold mb-1 text-sky-500 uppercase">Twitter</label>
                        <input type="text" value={member.socials.twitter} onChange={e => { const newArr = [...teamForm]; newArr[idx].socials.twitter = e.target.value; setTeamForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-2 py-1 text-xs" />
                      </div>
                    </div>
                  </Card>
               ))}
             </div>
             <div className="flex justify-end sticky bottom-6 z-10">
               <Button onClick={() => handleSave('team')} size="lg" className="rounded-xl px-8 shadow-xl shadow-primary/20">
                 <Save size={18} className="mr-2" /> Save Team
               </Button>
             </div>
          </div>
        )}

        {/* CAREERS EDITOR */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-foreground">Manage Careers</h2>
             </div>
             {careersForm.map((job, idx) => (
                <Card key={idx} className="p-5 bg-surface border border-border space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Job Title</label>
                      <input type="text" value={job.title} onChange={e => { const newArr = [...careersForm]; newArr[idx].title = e.target.value; setCareersForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Department</label>
                      <input type="text" value={job.department} onChange={e => { const newArr = [...careersForm]; newArr[idx].department = e.target.value; setCareersForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Type & Location</label>
                      <div className="flex gap-2">
                        <input type="text" value={job.type} onChange={e => { const newArr = [...careersForm]; newArr[idx].type = e.target.value; setCareersForm(newArr); }} className="w-1/2 bg-background border border-border rounded-lg px-3 py-2" placeholder="Full-time" />
                        <input type="text" value={job.location} onChange={e => { const newArr = [...careersForm]; newArr[idx].location = e.target.value; setCareersForm(newArr); }} className="w-1/2 bg-background border border-border rounded-lg px-3 py-2" placeholder="Remote" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-foreground/60 uppercase">Description</label>
                    <textarea value={job.description} onChange={e => { const newArr = [...careersForm]; newArr[idx].description = e.target.value; setCareersForm(newArr); }} className="w-full bg-background border border-border rounded-lg px-3 py-2 h-16" />
                  </div>
                </Card>
             ))}
             <div className="flex justify-end sticky bottom-6 z-10">
               <Button onClick={() => handleSave('careers')} size="lg" className="rounded-xl px-8 shadow-xl shadow-primary/20">
                 <Save size={18} className="mr-2" /> Save Careers
               </Button>
             </div>
          </div>
        )}

        {/* CALCULATOR EDITOR */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-foreground">Manage Calculator Pricing</h2>
             </div>
             {calculatorForm.map((cat, catIdx) => (
                <Card key={catIdx} className="p-6 bg-surface border border-border space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-primary uppercase">Category Name</label>
                    <input type="text" value={cat.category} onChange={e => { const newArr = [...calculatorForm]; newArr[catIdx].category = e.target.value; setCalculatorForm(newArr); }} className="w-full max-w-md bg-background border border-border rounded-lg px-4 py-2 font-bold text-lg" />
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <label className="block text-xs font-bold text-foreground/60 uppercase">Service Items</label>
                    {cat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex flex-col md:flex-row gap-3 bg-background/50 p-4 rounded-xl border border-border items-start md:items-center">
                        <div className="flex-1 w-full">
                          <input type="text" value={item.name} onChange={e => { const newArr = [...calculatorForm]; newArr[catIdx].items[itemIdx].name = e.target.value; setCalculatorForm(newArr); }} className="w-full bg-background border border-border rounded-md px-3 py-1.5 font-bold mb-2" placeholder="Item Name" />
                          <input type="text" value={item.description} onChange={e => { const newArr = [...calculatorForm]; newArr[catIdx].items[itemIdx].description = e.target.value; setCalculatorForm(newArr); }} className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm" placeholder="Description" />
                        </div>
                        <div className="w-full md:w-32 shrink-0">
                          <label className="block text-[10px] font-bold text-foreground/40 uppercase mb-1">Price ($)</label>
                          <input type="number" value={item.price} onChange={e => { const newArr = [...calculatorForm]; newArr[catIdx].items[itemIdx].price = parseInt(e.target.value) || 0; setCalculatorForm(newArr); }} className="w-full bg-background border border-border rounded-md px-3 py-2 font-mono" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
             ))}
             <div className="flex justify-end sticky bottom-6 z-10">
               <Button onClick={() => handleSave('calculator')} size="lg" className="rounded-xl px-8 shadow-xl shadow-primary/20">
                 <Save size={18} className="mr-2" /> Save Calculator Config
               </Button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};
