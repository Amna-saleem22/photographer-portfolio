import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <button
      onClick={scrollTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-ink text-bone flex items-center justify-center transition-all duration-500 hover:bg-champagne hover:text-ink ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}