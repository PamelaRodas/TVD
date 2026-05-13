export default function PageHeader({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="page-intro">{children}</p>}
    </div>
  );
}
