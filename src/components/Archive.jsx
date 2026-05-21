const archiveCards = [
  {
    title: "daily healthy practices",
    description: "I practice morning prayer, gratitude, and reflective habits that keep me focused and grounded.",
    tone: "practice"
  },
  {
    title: "growth tools",
    description: "I use journaling, reflection, prayer, and meaningful habits that keep me focused and grounded.",
    tone: "tools"
  },
  {
    title: "transformation reads",
    description: "I study books on growth, personal growth, mindfulness, and spipractice development that expand my consciousness.",
    tone: "reads"
  },
  {
    title: "meaningful moments",
    description: "I collect full purposes, moments of clarity, synchronicities, answered prayers, and miracles I've witnessed manifesting.",
    tone: "meaningful"
  }
];

export default function Archive() {
  return (
    <section className="section archive-section">
      <div className="section-heading">
        <p className="eyebrow">Energy Archive</p>
        <h2>my personal vault of healthy practices, tools, reads, and meaningful moments that shaped my growth journey</h2>
      </div>

      <div className="archive-grid">
        {archiveCards.map((card) => (
          <article key={card.title} className={`archive-card ${card.tone}`}>
            <span className="diary-label">{card.tone}</span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <span className="script-note">energy aligned</span>
          </article>
        ))}
      </div>
    </section>
  );
}


