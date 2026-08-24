import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

export default function CTASection() {
  const ref = useScrollReveal();
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=80"
          alt="Cinematic photography"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/60" />
      </div>
      <div ref={ref} className="container-lux relative z-10 text-center reveal">
        <h2 className="font-display text-4xl md:text-6xl text-bone tracking-tight">
          Let's Create Something <span className="text-champagne italic">Timeless</span>
        </h2>
        <p className="mt-6 text-bone/80 max-w-xl mx-auto">
          Every story deserves to be told beautifully. Let's capture yours.
        </p>
        <Link to="/contact" className="btn-light mt-10">
          Book a Photography Session
        </Link>
      </div>
    </section>
  );
}