const diaryEntries = [
  {
    title: "the art of being present",
    text: "I'm learning that power isn't loud—it's in how softly you can hold someone's hand and change their entire world with it.",
    label: "journal entry"
  },
  {
    title: "love letter to myself",
    text: "I'm soñadora enough to believe in magic, elegant enough to know my worth, and strong enough to walk away from anything that dims my light.",
    label: "late-night thoughts"
  },
  {
    title: "inspired by cherry lipstick",
    text: "cherry red dress, golden hour light through lace curtains, Lana on repeat, hands full of intention. this is my aesthetic, my mood, my entire existence.",
    label: "style note"
  },
  {
    title: "the magic of small gestures",
    text: "A handwritten letter. Peonies on the table. Someone remembering how you take your coffee. These tiny details are how I show love, how I prove I care.",
    label: "favorite moments"
  },
  {
    title: "gossip girl energy but make it kind",
    text: "Serena's elegance without the carelessness. Blair's ambition without the cruelty. I want their aesthetic but my own compass, my own heart.",
    label: "journal entry"
  },
  {
    title: "the metaphysical romantic",
    text: "I read tarot like others read texts. I believe in manifestation, in moon phases affecting mood, in the universe listening when you whisper at midnight.",
    label: "late-night thoughts"
  },
  {
    title: "becoming her",
    text: "The version of me that knows she's enough. The one who believes in forever, who loves fiercely, who chooses herself first. She's not a dream anymore.",
    label: "memory"
  }
];

export default function Diary() {
  return (
    <section id="diary" className="section diary-section">
      <div className="section-heading">
        <p className="eyebrow">Diary</p>
        <h2>the pages I keep folded inside my velvet notebook</h2>
      </div>

      <div className="diary-grid">
        {diaryEntries.map((entry) => (
          <article key={entry.title} className="diary-card">
            <span className="diary-label">{entry.label}</span>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
            <div className="diary-footer">♡ sealed with a kiss</div>
          </article>
        ))}
      </div>
    </section>
  );
}
