import Hero from '@/react-app/components/Hero';
import ValueStack from '@/react-app/components/ValueStack';
import Fleet from '@/react-app/components/Fleet';
import Experience from '@/react-app/components/Experience';
import Chauffeurs from '@/react-app/components/Chauffeurs';
import Footer from '@/react-app/components/Footer';
import DynamicBackground from '@/react-app/components/DynamicBackground';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <DynamicBackground />
      <Hero />
      <ValueStack />
      <Fleet />
      <Experience />
      <Chauffeurs />
      <Footer />
    </div>
  );
}
