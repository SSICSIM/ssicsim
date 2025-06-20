import './App.css'
import Landing from './pages/landing'
import Lenis from 'lenis'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Landing />
    </>
  )
}

export default App
