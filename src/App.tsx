import Layout from './components/Layout';
import BackgroundCanvas from './components/canvas/BackgroundCanvas';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <>
      <BackgroundCanvas />
      <SmoothScroll>
        <Layout>
          <section id="hero" className="hero-section">
            <h1>Welcome to My Portfolio</h1>
            <p>The 3D interactive background is now active.</p>
          </section>
        </Layout>
      </SmoothScroll>
    </>
  );
}

export default App;
