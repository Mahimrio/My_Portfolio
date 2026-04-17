import Layout from './components/Layout';
import BackgroundCanvas from './components/canvas/BackgroundCanvas';
import SmoothScroll from './components/SmoothScroll';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';

function App() {
  return (
    <>
      <BackgroundCanvas />
      <SmoothScroll>
        <Layout>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
        </Layout>
      </SmoothScroll>
    </>
  );
}

export default App;
