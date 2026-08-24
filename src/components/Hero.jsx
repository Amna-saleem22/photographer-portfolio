import { Link } from 'react-router-dom';
import useParallax from '../hooks/useParallax';

export default function Hero() {
  useParallax(0.3);
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0" data-parallax>
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
          alt="Cinematic photography hero"
          className="w-full h-full object-cover animate-slow-zoom"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/70" />
      </div>
      <div className="container-lux relative z-10 text-bone">
        <div className="max-w-4xl">
          <p className="section-label text-bone/80 animate-fade-down" style={{ animationDelay: '0.2s' }}>
            Professional Photographer
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Capturing Stories
            <br />
            Through <span className="text-champagne italic">Light</span> &{' '}
            <span className="text-champagne italic">Emotion</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-bone/80 max-w-2xl animate-fade-up" style={{ animationDelay: '0.6s' }}>
            I’m Alexandre, an international photographer specializing in weddings, portraits, and editorial work. Every image is a timeless piece of art.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <Link to="/portfolio" className="btn-light">
              View Portfolio
            </Link>
            <Link to="/contact" className="btn-outline-light">
              Book a Session
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-bone/70 text-xs tracking-widest uppercase animate-bounce">
        Scroll
      </div>
    </section>
  );
}