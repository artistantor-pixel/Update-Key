import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { servicesData, pricingData, caseStudiesData, teamData, careersData, calculatorData, sectorsData } from '../data';

// --- Types ---
export interface HeroContent {
  badge: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export interface ServiceContent {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface PricingContent {
  id: string;
  name: string;
  tagline: string;
  price: string;
  features: string[];
  popular: boolean;
}

export interface CaseStudyContent {
  id: string;
  title: string;
  category: string;
  image: string;
  metrics: {
    roas: string;
    timeSaved: string;
    conversionLift: string;
  };
  tabs: {
    challenge: string;
    solution: string;
    impact: string;
  };
}

export interface TeamMemberContent {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin: string;
    twitter: string;
  };
}

export interface CareerContent {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
}

export interface CalculatorItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface CalculatorCategory {
  category: string;
  items: CalculatorItem[];
}

export interface SectorContent {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  bgGlow: string;
  link: string;
  className: string;
  large: boolean;
  horizontal: boolean;
}

export interface ContentState {
  hero: HeroContent;
  services: ServiceContent[];
  pricing: PricingContent[];
  caseStudies: CaseStudyContent[];
  team: TeamMemberContent[];
  careers: CareerContent[];
  calculator: CalculatorCategory[];
  sectors: SectorContent[];
}

interface ContentContextType {
  content: ContentState;
  updateHero: (newHero: HeroContent) => void;
  updateServices: (newServices: ServiceContent[]) => void;
  updatePricing: (newPricing: PricingContent[]) => void;
  updateCaseStudies: (newCaseStudies: CaseStudyContent[]) => void;
  updateTeam: (newTeam: TeamMemberContent[]) => void;
  updateCareers: (newCareers: CareerContent[]) => void;
  updateCalculator: (newCalculator: CalculatorCategory[]) => void;
  updateSectors: (newSectors: SectorContent[]) => void;
}

// --- Default Data ---
const initialHeroContent: HeroContent = {
  badge: 'The Ultimate Agency Engine',
  headlineLine1: 'Upgrade your',
  headlineLine2: 'Digital Presence.',
  description: 'A single, powerful ecosystem merging premium branding, hyper-targeted ads, and brilliant web development.',
  primaryButtonText: 'Start Your Project',
  secondaryButtonText: 'Watch Showreel'
};

const defaultContent: ContentState = {
  hero: initialHeroContent,
  services: servicesData,
  pricing: pricingData,
  caseStudies: caseStudiesData,
  team: teamData,
  careers: careersData,
  calculator: calculatorData,
  sectors: sectorsData,
};

// --- Context Setup ---
const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ContentState>(defaultContent);

  const updateHero = (newHero: HeroContent) => {
    setContent((prev) => ({ ...prev, hero: newHero }));
  };

  const updateServices = (newServices: ServiceContent[]) => {
    setContent((prev) => ({ ...prev, services: newServices }));
  };

  const updatePricing = (newPricing: PricingContent[]) => {
    setContent((prev) => ({ ...prev, pricing: newPricing }));
  };

  const updateCaseStudies = (newCaseStudies: CaseStudyContent[]) => {
    setContent((prev) => ({ ...prev, caseStudies: newCaseStudies }));
  };
  
  const updateTeam = (newTeam: TeamMemberContent[]) => {
    setContent((prev) => ({ ...prev, team: newTeam }));
  };
  
  const updateCareers = (newCareers: CareerContent[]) => {
    setContent((prev) => ({ ...prev, careers: newCareers }));
  };
  
  const updateCalculator = (newCalculator: CalculatorCategory[]) => {
    setContent((prev) => ({ ...prev, calculator: newCalculator }));
  };

  const updateSectors = (newSectors: SectorContent[]) => {
    setContent((prev) => ({ ...prev, sectors: newSectors }));
  };

  return (
    <ContentContext.Provider value={{ content, updateHero, updateServices, updatePricing, updateCaseStudies, updateTeam, updateCareers, updateCalculator, updateSectors }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

