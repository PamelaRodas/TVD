const littleThings = [
  "hand-written letters and postcards",
  "peonies in every shade of pink",
  "time with my family, the safest place",
  "understanding each detail about the people I love",
  "stories that feel like reality: Gossip Girl, The Summer I Turned Pretty",
  "Lana Del Rey on repeat at 3am",
  "mysteries hidden in metaphors and tarot cards",
  "helping others find their way back home"
];

export default function About() {
  return (
    <section id="about-me" className="section about-section">
      <div className="section-heading">
        <p className="eyebrow">About Me</p>
        <h2>soñadora, elegante, sensible, delicada y poderosa</h2>
      </div>

      <div className="about-grid">
        <article className="about-card profile-card">
          <span className="diary-label">hello, this is my world</span>
          <h3>romantic, mysterious, and a little metaphysical</h3>
          <p>
            I live in romance novels and dark fantasies. I believe in the power of intention, 
            in collecting meaningful moments, and in the magic that lives between reality and 
            what we dream into existence. I notice the small things—the way light falls through lace, 
            how your eyes change when you speak about something you love.
          </p>
          <div className="profile-stats">
            <span><strong>mood:</strong> cherry red, rose, and gold</span>
            <span><strong>style:</strong> elegant and delicate</span>
            <span><strong>love language:</strong> quality time, affection, solving your problems</span>
          </div>
        </article>

        <article className="about-card loves-card">
          <span className="diary-label">little things I love lately</span>
          <ul className="loves-list">
            {littleThings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="about-card quote-card">
          <p className="quote-mark">“</p>
          <p>
            This space is my sanctuary. A collection of soft pink thoughts, dark mysteries, 
            and the kind of beauty that only exists in stories and stolen moments. 
            A place for everything I believe in.
          </p>
          <div className="closing-signature">
            <p>luv.prc</p>
            <p className="xoxo">xoxo</p>
            <p className="faith">yo con Dios quien contra mi</p>
          </div>
        </article>
      </div>
    </section>
  );
}
