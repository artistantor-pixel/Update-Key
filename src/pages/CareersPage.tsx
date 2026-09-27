import { useEffect } from 'react';
import { CareersSection } from '../components/sections/CareersSection';

export const CareersPage = () => {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen">
      <CareersSection />
    </div>
  );
};
