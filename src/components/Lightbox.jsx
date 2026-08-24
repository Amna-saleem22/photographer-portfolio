import { useEffect } from 'react';

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4" onClick={onClose}>
      <button className="absolute top-6 right-6 text-bone text-3xl" aria-label="Close">×</button>
      <div className="max-w-5xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
        <div className="text-center mt-4">
          <p className="text-champagne text-xs uppercase tracking-widest">{item.category}</p>
          <h3 className="text-bone font-display text-2xl mt-1">{item.title}</h3>
          <p className="text-bone/60 text-sm mt-1">{item.location}, {item.year}</p>
        </div>
      </div>
    </div>
  );
}