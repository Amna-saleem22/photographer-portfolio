import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

export default function PhotographerIntro() {
  const refLeft = useScrollReveal({ rootMargin: '0px 0px -100px 0px' });
  const refRight = useScrollReveal({ rootMargin: '0px 0px -100px 0px' });
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-lux grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div ref={refLeft} className="reveal-left image-reveal">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
            alt="Alexandre portrait"
            className="w-full aspect-[4/5] object-cover"
            loading="lazy"
          />
        </div>
        <div ref={refRight} className="reveal-right">
          <p className="section-label">About the Photographer</p>
          <h2 className="section-heading">Alexandre Moreau</h2>
          <p className="mt-6 text-ink/70 leading-relaxed">
            For over 8 years, I have dedicated my craft to capturing the beauty of human connection, light, and fleeting moments. My work spans weddings, portraits, fashion, and editorial assignments across the globe.
          </p>
          <p className="mt-4 text-ink/70 leading-relaxed">
            My philosophy is simple: every photograph should tell a story and evoke emotion. I blend fine art aesthetics with documentary authenticity to create timeless images.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div>
              <p className="font-display text-3xl md:text-4xl">8+</p>
              <p className="text-xs uppercase tracking-widest text-ink/60 mt-1">Years Experience</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl">250+</p>
              <p className="text-xs uppercase tracking-widest text-ink/60 mt-1">Sessions</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl">15+</p>
              <p className="text-xs uppercase tracking-widest text-ink/60 mt-1">Awards</p>
            </div>
          </div>
          <Link to="/about" className="btn-primary mt-10">
            About Me
          </Link>
        </div>
      </div>
    </section>
  );
}