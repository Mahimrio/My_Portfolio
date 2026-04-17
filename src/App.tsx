import Layout from './components/Layout';
import BackgroundCanvas from './components/canvas/BackgroundCanvas';
import SmoothScroll from './components/SmoothScroll';
import Reveal from './components/animations/Reveal';
import HeroSection from './components/sections/HeroSection';

function App() {
  return (
    <>
      <BackgroundCanvas />
      <SmoothScroll>
        <Layout>
          <HeroSection />
          
          <section id="about" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Reveal direction="left">
               <h2>Scroll Animations are Working!</h2>
             </Reveal>
          </section>
        </Layout>
      </SmoothScroll>
    </>
  );
}

export default App;
