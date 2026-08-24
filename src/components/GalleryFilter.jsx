export default function GalleryFilter({ activeFilter, onFilterChange }) {
  const filters = ['All', 'Wedding', 'Portrait', 'Fashion', 'Editorial', 'Travel', 'Architecture'];
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`text-xs uppercase tracking-widest py-2 px-4 transition-colors ${
            activeFilter === filter
              ? 'text-bone bg-ink'
              : 'text-ink/70 hover:text-ink hover:bg-ink/5'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}