
import { useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { QuranicVerseSection } from '../components/sections/QuranicVerseSection';
import { PainPointSection } from '../components/sections/PainPointSection';
import { SolutionSection } from '../components/sections/SolutionSection';
import { ProgramsSection } from '../components/ProgramsSection';
import { ValuePropositionSection } from '../components/sections/ValuePropositionSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { StatsSection } from '../components/sections/StatsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import FAQSection from '../components/sections/FAQSection';
import { CommunitySection } from '../components/sections/CommunitySection';
import { RegistrationSection } from '../components/RegistrationSection';
import { ExitIntentModal } from '../components/modals/ExitIntentModal';
import sdk from '../lib/sdk';

const Index = () => {
  useEffect(() => {
    // Initialize SDK when component mounts
    sdk.init().then(() => {
      console.log('SDK initialized from Index page');
    });
  }, []);

  return (
    <>
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
    </>
  );
};

export default Index;
