import { useState, Suspense, lazy } from 'react';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';
import Loader from './components/Loader';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import SocialsSection from './components/sections/SocialsSection';

const BackgroundCanvas = lazy(() => import('./components/canvas/BackgroundCanvas'));

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Suspense fallback={null}>
        <BackgroundCanvas />
      </Suspense>
      <SmoothScroll>
        <Layout>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
          <SocialsSection />
        </Layout>
      </SmoothScroll>
    </>
  );
}

export default App;
