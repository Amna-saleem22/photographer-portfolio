import { formatPrice, packages } from '../../data/packages';

export default function PackageList() {
  return (
    <ul className="package-list">
      {packages.map((pkg) => (
        <li key={pkg.id} className="package-card">
          <div className="package-card__top">
            <span className="package-card__name">{pkg.name}</span>
            <span className="package-card__price">{formatPrice(pkg.price)}</span>
          </div>
          <p className="package-card__meta">
            {pkg.duration} · {pkg.photos}
          </p>
          <p className="package-card__tagline">{pkg.tagline}</p>
        </li>
      ))}
    </ul>
  );
}