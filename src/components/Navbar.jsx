import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../data/navLinks.js';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-bone/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container-lux flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-display tracking-tight">
            ALEXANDRE<span className="text-champagne">.</span>
          </Link>
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-champagne' : 'text-ink hover:text-champagne'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary !py-3 !px-6 !text-xs">
              Book a Session
            </Link>
          </nav>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col items-end space-y-1.5 p-2"
            aria-label="Open menu"
          >
            <span className="w-8 h-0.5 bg-ink" />
            <span className="w-6 h-0.5 bg-ink" />
            <span className="w-8 h-0.5 bg-ink" />
          </button>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}