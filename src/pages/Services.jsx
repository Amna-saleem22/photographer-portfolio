import { Link } from 'react-router-dom';
import { services } from '../data/servicesData';
import SectionTitle from '../components/SectionTitle';
import useScrollReveal from '../hooks/useScrollReveal';
import CTASection from '../components/CTASection';

export default function Services() {
  const refIntro = useScrollReveal();
  return (
    <>
      <section className="pt-32 md:pt-40 pb-24 bg-bone">
        <div className="container-lux">
          <div ref={refIntro} className="reveal max-w-3xl">
            <SectionTitle label="Services" title="Photography Offerings" />
            <p className="mt-6 text-ink/70 leading-relaxed">
              From intimate weddings to high-fashion editorials, I offer a range of professional photography services tailored to your story.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-bone">
        <div className="container-lux space-y-24">
          {services.map((service, index) => (
            <ServiceDetail key={service.id} service={service} reverse={index % 2 === 1} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}

function ServiceDetail({ service, reverse }) {
  const refImage = useScrollReveal();
  const refText = useScrollReveal();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div ref={refImage} className={`reveal-left image-reveal ${reverse ? 'lg:order-2' : ''}`}>
        <img src={service.image} alt={service.title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
      </div>
      <div ref={refText} className={`reveal-right ${reverse ? 'lg:order-1' : ''}`}>
        <h3 className="font-display text-3xl md:text-4xl">{service.title}</h3>
        <p className="mt-4 text-ink/70 leading-relaxed">{service.description}</p>
        <div className="mt-6">
          <h4 className="text-sm uppercase tracking-widest text-champagne mb-3">What's Included</h4>
          <ul className="space-y-2">
            {service.includes.map((item) => (
              <li key={item} className="text-ink/70 text-sm">— {item}</li>
            ))}
          </ul>
        </div>
        <Link to="/contact" className="btn-primary mt-8">
          Book This Service
        </Link>
      </div>
    </div>
  );
}