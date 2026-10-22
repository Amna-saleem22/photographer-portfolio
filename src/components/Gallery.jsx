import { useState, useMemo } from 'react';
import { galleryItems } from '../data/galleryData';
import GalleryFilter from './GalleryFilter';
import GalleryCard from './GalleryCard';
import Lightbox from './Lightbox';
import { generateAutoCaption } from '../utils/autoCaption'; // 👈 Import kiya

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filteredItems = useMemo(() => {
    const items = filter === 'All' 
      ? galleryItems 
      : galleryItems.filter((item) => item.category === filter);

    // 🔥 Yahan hum har item ke andar auto-generated alt aur caption inject kar rahe hain
    return items.map(item => {
      const { alt, caption } = generateAutoCaption(item.src, item.category);
      return {
        ...item,
        autoAlt: alt,       // SEO & Accessibility ke liye
        autoCaption: caption // Hover ya Lightbox mein dikhane ke liye
      };
    });
  }, [filter]);

  return (
    <>
      <GalleryFilter activeFilter={filter} onFilterChange={setFilter} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-12">
        {filteredItems.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            delay={index * 0.05}
            onClick={() => setLightboxItem(item)} // Note: Yahan item pass kiya, function nahi
          />
        ))}
      </div>
      {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
    </>
  );
}