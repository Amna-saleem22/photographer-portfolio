import { Link } from 'react-router-dom';
import { navLinks } from '../data/navLinks';
import { services } from '../data/servicesData';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="bg-ink text-bone py-16 md:py-20">
      <div className="container-lux">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <p className="font-display text-2xl">ALEXANDRE.</p>
            <p className="mt-4 text-bone/60 text-sm leading-relaxed">
              Professional photographer capturing timeless stories through light and emotion.
            </p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-champagne mb-4">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-bone/70 hover:text-bone transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-champagne mb-4">Services</h4>
            <ul className="space-y-3">
              {services.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="text-bone/70 hover:text-bone transition-colors text-sm">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-champagne mb-4">Contact</h4>
            <p className="text-bone/70 text-sm">hello@alexandre.photo</p>
            <p className="text-bone/70 text-sm mt-2">+1 (555) 123-4567</p>
            <p className="text-bone/70 text-sm mt-2">Paris, France</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-bone/70 hover:text-bone">Instagram</a>
              <a href="#" className="text-bone/70 hover:text-bone">Facebook</a>
              <a href="#" className="text-bone/70 hover:text-bone">Pinterest</a>
            </div>
          </div>
        </div>
       
      </div>
    </footer>
  );
}