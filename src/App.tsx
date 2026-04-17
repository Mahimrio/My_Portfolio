import Layout from './components/Layout';
import BackgroundCanvas from './components/canvas/BackgroundCanvas';
import SmoothScroll from './components/SmoothScroll';
import Reveal from './components/animations/Reveal';

function App() {
  return (
    <>
      <BackgroundCanvas />
      <SmoothScroll>
        <Layout>
          <section id="hero" className="hero-section">
            <Reveal direction="down" delay={0.2}>
              <h1>Welcome to My Portfolio</h1>
            </Reveal>
            <Reveal direction="up" delay={0.5}>
              <p>The 3D interactive background is now active.</p>
            </Reveal>
          </section>
          
          <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
