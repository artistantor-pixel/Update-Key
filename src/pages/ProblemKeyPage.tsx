import { useEffect } from 'react';
import { ProblemHero } from '../components/sections/ProblemHero';
import { ProblemForum } from '../components/sections/ProblemForum';
import { CareerGuidelines } from '../components/sections/CareerGuidelines';

export const ProblemKeyPage = () => {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ProblemHero />
      <ProblemForum />
      <CareerGuidelines />
    </div>
  );
};
