import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../data/navLinks';

export default function MobileMenu({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-ink/95 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute top-0 right-0 h-full w-3/4 max-w-sm bg-bone transform transition-transform duration-500 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <span className="font-display text-xl">ALEXANDRE.</span>
            <button onClick={onClose} className="text-2xl" aria-label="Close menu">
              ×
            </button>
          </div>
          <nav className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-2xl font-display tracking-tight transition-colors ${
                    isActive ? 'text-champagne' : 'text-ink hover:text-champagne'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto">
            <Link to="/contact" className="btn-primary w-full" onClick={onClose}>
              Book a Session
            </Link>
            <p className="text-xs text-ink/60 mt-6">© 2024 Alexandre Photography</p>
          </div>
        </div>
      </div>
    </div>
  );
}