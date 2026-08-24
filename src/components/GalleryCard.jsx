import useScrollReveal from '../hooks/useScrollReveal';

export default function GalleryCard({ item, onClick, delay }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="reveal-scale group cursor-pointer"
      style={{ transitionDelay: `${delay}s` }}
      onClick={() => onClick(item)}
    >
      <div className={`${item.aspect} overflow-hidden relative`}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
          <p className="text-champagne text-xs uppercase tracking-widest">{item.category}</p>
          <h3 className="text-bone font-display text-xl mt-1">{item.title}</h3>
          <p className="text-bone/70 text-xs mt-1">{item.location}, {item.year}</p>
        </div>
      </div>
    </div>
  );
}