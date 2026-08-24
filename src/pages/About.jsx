import useScrollReveal from '../hooks/useScrollReveal';
import SectionTitle from '../components/SectionTitle';
import CTASection from '../components/CTASection';
import useCounter from '../hooks/useCounter';

export default function About() {
  const refImage = useScrollReveal();
  const refText = useScrollReveal();
  const refStats = useScrollReveal();
  const refApproach = useScrollReveal();
  const yearsCounter = useCounter(8, 2000);
  const sessionsCounter = useCounter(250, 2000);
  const clientsCounter = useCounter(120, 2000);
  const awardsCounter = useCounter(15, 2000);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-24 bg-bone">
        <div className="container-lux grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={refImage} className="reveal-left image-reveal">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Photographer portrait"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div ref={refText} className="reveal-right">
            <SectionTitle label="About Me" title="Alexandre Moreau" />
            <p className="mt-6 text-ink/70 leading-relaxed">
              Based in Paris, I am an international photographer with a passion for visual storytelling. My journey began 8 years ago, and since then I have had the privilege of documenting love stories, fashion editorials, and cultural narratives across 20+ countries.
            </p>
            <p className="mt-4 text-ink/70 leading-relaxed">
              My work is characterized by a cinematic aesthetic, natural light, and authentic emotion. I believe in creating images that are not just seen but felt.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-display">Specializations</h3>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-ink/70">
                <li>Wedding</li>
                <li>Portrait</li>
                <li>Fashion</li>
                <li>Editorial</li>
                <li>Travel</li>
                <li>Architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div ref={refStats} className="container-lux grid grid-cols-2 md:grid-cols-4 gap-8 text-center reveal">
          <div>
            <p className="font-display text-4xl md:text-5xl">{yearsCounter.count}+</p>
            <p className="text-xs uppercase tracking-widest text-ink/60 mt-2">Years Experience</p>
          </div>
          <div>
            <p className="font-display text-4xl md:text-5xl">{sessionsCounter.count}+</p>
            <p className="text-xs uppercase tracking-widest text-ink/60 mt-2">Sessions</p>
          </div>
          <div>
            <p className="font-display text-4xl md:text-5xl">{clientsCounter.count}+</p>
            <p className="text-xs uppercase tracking-widest text-ink/60 mt-2">Happy Clients</p>
          </div>
          <div>
            <p className="font-display text-4xl md:text-5xl">{awardsCounter.count}+</p>
            <p className="text-xs uppercase tracking-widest text-ink/60 mt-2">Awards</p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 bg-bone">
        <div className="container-lux">
          <div ref={refApproach} className="reveal max-w-3xl">
            <SectionTitle label="My Approach" title="Philosophy & Method" />
            <p className="mt-6 text-ink/70 leading-relaxed">
              Every assignment is a collaboration. I take time to understand your story, your vision, and the emotions you want to preserve. My approach blends fine art aesthetics with documentary authenticity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { title: 'Storytelling', text: 'Every image should contribute to a larger narrative.' },
              { title: 'Natural Emotions', text: 'I capture real moments, not forced poses.' },
              { title: 'Lighting', text: 'Mastery of natural and artificial light to create mood.' },
              { title: 'Composition', text: 'Intentional framing for timeless aesthetics.' },
            ].map((item, index) => (
              <div key={item.title} className="reveal-scale bg-white p-6" style={{ transitionDelay: `${index * 0.1}s` }}>
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}