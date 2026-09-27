import { HeroSection } from '../components/sections/HeroSection';
import { MarqueeSection } from '../components/sections/MarqueeSection';
import { ValueMatrixSection } from '../components/sections/ValueMatrixSection';
import { ServiceEcosystemSection } from '../components/sections/ServiceEcosystemSection';
import { PricingSection } from '../components/sections/PricingSection';
import { MultiStepWizard } from '../components/sections/MultiStepWizard';
import { CaseStudiesSection } from '../components/sections/CaseStudiesSection';
import { TestimonialsSlider } from '../components/sections/TestimonialsSlider';
import { FaqSection } from '../components/sections/FaqSection';
import { TeamSection } from '../components/sections/TeamSection';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ValueMatrixSection />
      <ServiceEcosystemSection />
      <CaseStudiesSection />
      <TeamSection />
      <TestimonialsSlider />
      <PricingSection />
      <MultiStepWizard />
      <FaqSection />
    </>
  );
};
