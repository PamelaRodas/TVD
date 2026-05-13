export default function EmptyState({ title, children }) {
  return (
    <div className="empty-state">
      <span className="empty-state-mark">empty</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
