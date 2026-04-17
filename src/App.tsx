import Layout from './components/Layout';
import BackgroundCanvas from './components/canvas/BackgroundCanvas';
import SmoothScroll from './components/SmoothScroll';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';

function App() {
  return (
    <>
      <BackgroundCanvas />
      <SmoothScroll>
        <Layout>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </Layout>
      </SmoothScroll>
    </>
  );
}

export default App;
