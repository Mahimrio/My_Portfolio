import { useEffect, useState } from 'react';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        // Accelerate towards the end
        const increment = prev < 70 ? Math.random() * 8 + 2 : Math.random() * 3 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loader-overlay ${fadeOut ? 'loader-fade-out' : ''}`}>
      <div className="loader-content">
        <h1 className="loader-logo">Portfolio</h1>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="loader-percent">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default Loader;
