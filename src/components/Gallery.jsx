import { useState, useMemo } from 'react';
import { galleryItems } from '../data/galleryData';
import GalleryFilter from './GalleryFilter';
import GalleryCard from './GalleryCard';
import Lightbox from './Lightbox';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filteredItems = useMemo(() => {
    if (filter === 'All') return galleryItems;
    return galleryItems.filter((item) => item.category === filter);
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
            onClick={setLightboxItem}
          />
        ))}
      </div>
      {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
    </>
  );
}