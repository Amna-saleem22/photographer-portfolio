import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  const refInfo = useScrollReveal();
  const refForm = useScrollReveal();
  const refImage = useScrollReveal();

  return (
    <section className="pt-32 md:pt-40 pb-24 bg-bone">
      <div className="container-lux">
        <div ref={refInfo} className="reveal max-w-3xl mb-16">
          <SectionTitle label="Contact" title="Have a story worth capturing?" />
          <p className="mt-6 text-ink/70 leading-relaxed">
            I'd love to hear about your upcoming project. Please fill out the form below or reach out directly.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div ref={refForm} className="reveal-left">
            <h3 className="font-display text-2xl mb-6">Send an Inquiry</h3>
            <ContactForm />
          </div>
          <div ref={refImage} className="reveal-right space-y-8">
            <div className="image-reveal">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
                alt="Photography contact"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <h3 className="font-display text-2xl mb-4">Contact Information</h3>
              <p className="text-ink/70">Email: hello@alexandre.photo</p>
              <p className="text-ink/70 mt-2">Phone: +1 (555) 123-4567</p>
              <p className="text-ink/70 mt-2">Location: Paris, France</p>
            </div>
            <div>
              <p className="text-ink/70">Available worldwide for commissions.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-ink/70 hover:text-ink">Instagram</a>
                <a href="#" className="text-ink/70 hover:text-ink">Facebook</a>
                <a href="#" className="text-ink/70 hover:text-ink">Pinterest</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}