import { testimonials } from '../data/testimonialsData';
import useScrollReveal from '../hooks/useScrollReveal';
import SectionTitle from './SectionTitle';

export default function Testimonials() {
  const ref = useScrollReveal();
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-lux">
        <div ref={ref} className="reveal">
          <SectionTitle label="Client Love" title="What Clients Say" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, delay }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal-scale p-8 bg-bone border border-ink/5" style={{ transitionDelay: `${delay}s` }}>
      <p className="text-ink/70 italic leading-relaxed">"{testimonial.text}"</p>
      <div className="flex items-center mt-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div className="ml-4">
          <p className="font-medium">{testimonial.name}</p>
          <p className="text-xs text-ink/60 uppercase tracking-widest">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}