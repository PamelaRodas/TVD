const archiveCards = [
  {
    title: "favorite cafes",
    description: "I collect quiet corners, candlelight, and porcelain cups marked with cherry lipstick.",
    tone: "cafe"
  },
  {
    title: "outfits",
    description: "I rotate black satin, cream knitwear, lace gloves, and silver pieces that catch moonlight.",
    tone: "outfits"
  },
  {
    title: "books",
    description: "I annotate pages, hide old letters inside novels, and reread stories that feel like vampire secrets.",
    tone: "books"
  },
  {
    title: "memories",
    description: "I replay foggy windows, ravens at dusk, roses near antique mirrors, and rain after midnight.",
    tone: "memories"
  }
];

export default function Archive() {
  return (
    <section className="section archive-section">
      <div className="section-heading">
        <p className="eyebrow">Night Archive</p>
        <h2>my personal vault of favorite moments, places, outfits, books, and memories</h2>
      </div>

      <div className="archive-grid">
        {archiveCards.map((card) => (
          <article key={card.title} className={`archive-card ${card.tone}`}>
            <span className="diary-label">{card.tone}</span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <span className="script-note">written at 12:03 AM</span>
          </article>
        ))}
      </div>
    </section>
  );
}