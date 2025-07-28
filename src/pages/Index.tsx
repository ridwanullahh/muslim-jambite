
import { useState, useEffect } from 'react';
import { SharedLayout } from '../components/layout/SharedLayout';
import { HeroSection } from '../components/HeroSection';
import { QuranicVerseSection } from '../components/sections/QuranicVerseSection';
import { PainPointSection } from '../components/sections/PainPointSection';
import { SolutionSection } from '../components/sections/SolutionSection';
import { ProgramsSection } from '../components/ProgramsSection';
import { ValuePropositionSection } from '../components/sections/ValuePropositionSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { StatsSection } from '../components/sections/StatsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FAQSection } from '../components/sections/FAQSection';
import { CommunitySection } from '../components/sections/CommunitySection';
import { RegistrationSection } from '../components/RegistrationSection';
import { ExitIntentModal } from '../components/modals/ExitIntentModal';
import sdk from '../lib/sdk';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize SDK when component mounts
    sdk.init().then(() => {
      console.log('SDK initialized from Index page');
    });
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <SharedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <HeroSection />
      <QuranicVerseSection />
      <PainPointSection />
      <SolutionSection />
      <ProgramsSection />
      <ValuePropositionSection />
      <WhyChooseUsSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <CommunitySection />
      <RegistrationSection />
      <ExitIntentModal />
    </SharedLayout>
  );
};

export default Index;
