import { Link } from 'react-router-dom';
import { services } from '../data/servicesData';
import useScrollReveal from '../hooks/useScrollReveal';
import SectionTitle from './SectionTitle';

export default function ServicesPreview() {
  const ref = useScrollReveal();
  return (
    <section className="py-24 md:py-32 bg-bone">
      <div className="container-lux">
        <div ref={ref} className="reveal">
          <SectionTitle label="What I Do" title="Signature Services" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal-scale group" style={{ transitionDelay: `${delay}s` }}>
      <Link to="/services" className="block overflow-hidden relative">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-bone font-display text-2xl">{service.title}</h3>
          <p className="text-bone/70 text-sm mt-2 line-clamp-2">{service.description}</p>
          <span className="text-champagne text-xs uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Explore Service →
          </span>
        </div>
      </Link>
    </div>
  );
}