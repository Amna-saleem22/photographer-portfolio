import { Link } from 'react-router-dom';
import { galleryItems } from '../data/galleryData';
import useScrollReveal from '../hooks/useScrollReveal';
import SectionTitle from './SectionTitle';

export default function FeaturedWork() {
  const featured = galleryItems.slice(0, 8);
  const ref = useScrollReveal();
  return (
    <section className="py-24 md:py-32 bg-bone">
      <div className="container-lux">
        <div ref={ref} className="reveal">
          <SectionTitle label="Selected Work" title="Featured Projects" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-16">
          {featured.map((item, index) => (
            <FeaturedCard key={item.id} item={item} delay={index * 0.1} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/portfolio" className="btn-secondary">
            View All Work
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ item, delay }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal-scale group" style={{ transitionDelay: `${delay}s` }}>
      <Link to="/portfolio" className="block overflow-hidden relative">
        <div className={`${item.aspect} overflow-hidden`}>
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
          <p className="text-champagne text-xs uppercase tracking-widest">{item.category}</p>
          <h3 className="text-bone font-display text-xl mt-1">{item.title}</h3>
          <p className="text-bone/70 text-xs mt-1">{item.location}, {item.year}</p>
        </div>
      </Link>
    </div>
  );
}