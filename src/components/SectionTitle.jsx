export default function SectionTitle({ label, title, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="section-label">{label}</p>
      <h2 className="section-heading">{title}</h2>
    </div>
  );
}