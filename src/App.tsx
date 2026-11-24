import { useState, Suspense, lazy } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';
import Loader from './components/Loader';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import AchievementsSection from './components/sections/AchievementsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import CertificatesSection from './components/sections/CertificatesSection';
import ContactSection from './components/sections/ContactSection';
import SocialsSection from './components/sections/SocialsSection';

const BackgroundCanvas = lazy(() => import('./components/canvas/BackgroundCanvas'));

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = () => {
    setLoading(false);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  };

  return (
    <>
      {loading && <Loader onComplete={handleLoaderComplete} />}
      <Suspense fallback={null}>
        <BackgroundCanvas />
      </Suspense>
      <SmoothScroll>
        <Layout>
          <HeroSection />
          <AboutSection />
          <AchievementsSection />
          <ProjectsSection />
          <CertificatesSection />
          <ContactSection />
          <SocialsSection />
        </Layout>
      </SmoothScroll>
    </>
  );
}

export default App;
