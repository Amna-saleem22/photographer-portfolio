import { useEffect } from 'react';

export default function useParallax(speed = 0.5) {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('[data-parallax]');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
          const offset = (rect.top + rect.height / 2 - windowHeight / 2) * speed;
          el.style.transform = `translateY(${offset}px)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
}