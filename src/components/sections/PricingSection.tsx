import { Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useContent } from '../../context/ContentContext';

export const PricingSection = () => {
  const { content } = useContent();
  const pricingData = content.pricing;
  return (
    <section id="pricing" className="py-20 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Transparent Pricing Bundles</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            No hidden fees. Just value-packed bundles designed for ROI.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingData.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative flex flex-col h-full ${
                plan.popular 
                  ? 'border-primary/50 shadow-[0_0_30px_rgba(0,240,255,0.1)] -translate-y-2' 
                  : 'hover:border-foreground/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/60 text-sm h-10">{plan.tagline}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.id !== 'full-ecosystem' && <span className="text-foreground/60">/project</span>}
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="text-primary shrink-0" size={18} />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={plan.popular ? 'primary' : 'outline'} 
                className="w-full mt-auto"
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
