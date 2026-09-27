import { useState, useMemo } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Check } from 'lucide-react';

const serviceOptions = [
  { id: 'branding', label: 'Brand Identity', min: 1000, max: 2500 },
  { id: 'web', label: 'Custom Website', min: 2000, max: 5000 },
  { id: 'ads', label: 'Ad Creatives & Setup', min: 1500, max: 3000 },
  { id: 'ai', label: 'AI & Automation', min: 1000, max: 4000 },
];

export const EstimatorWidget = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const estimatedRange = useMemo(() => {
    if (selectedServices.length === 0) return { min: 0, max: 0 };
    
    return selectedServices.reduce((acc, curr) => {
      const service = serviceOptions.find(s => s.id === curr);
      if (service) {
        acc.min += service.min;
        acc.max += service.max;
      }
      return acc;
    }, { min: 0, max: 0 });
  }, [selectedServices]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) return;
    
    setIsSubmitting(true);
    // Simulate API call to NestJS backend
    const payload = {
      services: selectedServices,
      estimatedMin: estimatedRange.min,
      estimatedMax: estimatedRange.max,
    };
    console.log('Submitting Estimate Payload:', payload);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Estimate submitted successfully! We will contact you soon.');
      setSelectedServices([]);
    }, 1500);
  };

  return (
    <section id="estimator" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="p-8 md:p-12 border-primary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-3xl rounded-full" />
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Estimator</h2>
              <p className="text-foreground/70">
                Select the services you need and get an instant ballpark estimate.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {serviceOptions.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all text-left ${
                        isSelected 
                          ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                          : 'border-border bg-background hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border ${
                        isSelected ? 'bg-primary border-primary text-black' : 'border-foreground/30'
                      }`}>
                        {isSelected && <Check size={16} strokeWidth={3} />}
                      </div>
                      <div>
                        <div className="font-semibold">{service.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-background rounded-xl p-6 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-sm text-foreground/60 mb-1">Estimated Range</div>
                  <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    ${estimatedRange.min.toLocaleString()} - ${estimatedRange.max.toLocaleString()}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  disabled={selectedServices.length === 0 || isSubmitting}
                  isLoading={isSubmitting}
                  className="w-full md:w-auto"
                >
                  Request Detailed Proposal
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
};
