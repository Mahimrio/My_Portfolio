import Layout from './components/Layout';
import BackgroundCanvas from './components/canvas/BackgroundCanvas';

function App() {
  return (
    <>
      <BackgroundCanvas />
      <Layout>
        <section id="hero" className="hero-section">
          <h1>Welcome to My Portfolio</h1>
          <p>The 3D interactive background is now active.</p>
        </section>
      </Layout>
    </>
  );
}

export default App;
