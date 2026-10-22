import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../data/navLinks.js';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Check karo ke hum Home page par hain ya nahi
  const isHome = location.pathname === '/';
  
  // Agar Home page NAHI hai, to Navbar hamesha solid rahega (white bg, black text)
  // Agar Home page PAR hai, to scroll hone par solid hoga
  const isSolid = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll(); // Initial load par check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false); // Page change par mobile menu band ho jaye
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isSolid ? 'bg-bone/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container-lux flex items-center justify-between">
          
          {/* LOGO */}
          <Link 
            to="/" 
            className={`text-xl md:text-2xl font-display tracking-tight transition-colors duration-300 ${
              isSolid ? 'text-ink' : 'text-white'
            }`}
          >
            ALEXANDRE<span className="text-champagne">.</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-widest transition-colors duration-300 ${
                    isActive 
                      ? 'text-champagne' 
                      : isSolid 
                        ? 'text-ink hover:text-champagne' 
                        : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link 
              to="/contact" 
              className={`btn-primary !py-3 !px-6 !text-xs transition-colors duration-300 ${
                !isSolid ? 'border-white/30 text-white bg-transparent hover:bg-white hover:text-ink' : ''
              }`}
            >
              Book a Session
            </Link>
          </nav>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col items-end space-y-1.5 p-2"
            aria-label="Open menu"
          >
            <span className={`w-8 h-0.5 transition-colors duration-300 ${isSolid ? 'bg-ink' : 'bg-white'}`} />
            <span className={`w-6 h-0.5 transition-colors duration-300 ${isSolid ? 'bg-ink' : 'bg-white'}`} />
            <span className={`w-8 h-0.5 transition-colors duration-300 ${isSolid ? 'bg-ink' : 'bg-white'}`} />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}