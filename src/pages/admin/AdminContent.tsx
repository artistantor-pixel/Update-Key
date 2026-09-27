import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Save, LayoutTemplate, Briefcase, Tag, Target } from 'lucide-react';

export const AdminContent = () => {
  const { content, updateHero } = useContent();
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'pricing' | 'work'>('hero');

  // Local state for forms
  const [heroForm, setHeroForm] = useState(content.hero);

  const handleHeroSave = () => {
    updateHero(heroForm);
    alert('Hero section updated on live site!');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Manager (CMS)</h1>
          <p className="text-foreground/60">Edit website content here. Changes are instantly reflected on the live site.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button 
          variant={activeTab === 'hero' ? 'primary' : 'outline'} 
          onClick={() => setActiveTab('hero')}
          className="rounded-full shrink-0"
        >
          <LayoutTemplate size={16} className="mr-2" /> Hero
        </Button>
        <Button 
          variant={activeTab === 'services' ? 'primary' : 'outline'} 
          onClick={() => setActiveTab('services')}
          className="rounded-full shrink-0"
        >
          <Briefcase size={16} className="mr-2" /> Services
        </Button>
        <Button 
          variant={activeTab === 'pricing' ? 'primary' : 'outline'} 
          onClick={() => setActiveTab('pricing')}
          className="rounded-full shrink-0"
        >
          <Tag size={16} className="mr-2" /> Pricing
        </Button>
        <Button 
          variant={activeTab === 'work' ? 'primary' : 'outline'} 
          onClick={() => setActiveTab('work')}
          className="rounded-full shrink-0"
        >
          <Target size={16} className="mr-2" /> Case Studies
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* HERO EDITOR */}
        {activeTab === 'hero' && (
          <Card className="p-6 md:p-8 space-y-6 glass border border-white/20">
            <h2 className="text-xl font-bold border-b border-border pb-4">Hero Section Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Badge Text</label>
                <input 
                  type="text" 
                  value={heroForm.badge}
                  onChange={(e) => setHeroForm({...heroForm, badge: e.target.value})}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Headline Line 1</label>
                  <input 
                    type="text" 
                    value={heroForm.headlineLine1}
                    onChange={(e) => setHeroForm({...heroForm, headlineLine1: e.target.value})}
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Headline Line 2 (Gradient)</label>
                  <input 
                    type="text" 
                    value={heroForm.headlineLine2}
                    onChange={(e) => setHeroForm({...heroForm, headlineLine2: e.target.value})}
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea 
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({...heroForm, description: e.target.value})}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 h-24 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Primary Button Text</label>
                  <input 
                    type="text" 
                    value={heroForm.primaryButtonText}
                    onChange={(e) => setHeroForm({...heroForm, primaryButtonText: e.target.value})}
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Secondary Button Text</label>
                  <input 
                    type="text" 
                    value={heroForm.secondaryButtonText}
                    onChange={(e) => setHeroForm({...heroForm, secondaryButtonText: e.target.value})}
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button variant="primary" className="rounded-full px-8" onClick={handleHeroSave}>
                <Save size={18} className="mr-2" /> Save Hero Section
              </Button>
            </div>
          </Card>
        )}

        {/* SERVICES EDITOR (Preview) */}
        {activeTab === 'services' && (
          <Card className="p-6 md:p-8 space-y-6 glass border border-white/20">
            <h2 className="text-xl font-bold border-b border-border pb-4">Services Editor</h2>
            <div className="p-8 text-center text-foreground/50 border-2 border-dashed border-border rounded-2xl">
              Full Services CMS editor logic will be expanded here. For now, edit Hero.
            </div>
          </Card>
        )}

        {/* PRICING EDITOR (Preview) */}
        {activeTab === 'pricing' && (
          <Card className="p-6 md:p-8 space-y-6 glass border border-white/20">
            <h2 className="text-xl font-bold border-b border-border pb-4">Pricing Editor</h2>
            <div className="p-8 text-center text-foreground/50 border-2 border-dashed border-border rounded-2xl">
              Pricing tier configurations will go here.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
