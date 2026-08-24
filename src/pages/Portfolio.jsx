import SectionTitle from '../components/SectionTitle';
import Gallery from '../components/Gallery';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Portfolio() {
  const refTitle = useScrollReveal();
  return (
    <section className="pt-32 md:pt-40 pb-24 bg-bone min-h-screen">
      <div className="container-lux">
        <div ref={refTitle} className="reveal max-w-3xl mb-16">
          <SectionTitle label="Portfolio" title="Selected Works" />
          <p className="mt-6 text-ink/70 leading-relaxed">
            A curated collection of my favorite images across weddings, portraits, fashion, travel, and architecture.
          </p>
        </div>
        <Gallery />
      </div>
    </section>
  );
}