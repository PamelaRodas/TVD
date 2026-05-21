import { useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { getDiaryEntries } from '../services/contentService';

function getEntryDate(entry) {

  if (entry.createdAt) return new Date(entry.createdAt);
  if (typeof entry.id === 'string' && entry.id.startsWith('diary-')) {
    const ts = Number(entry.id.replace('diary-', ''));
    if (!Number.isNaN(ts)) return new Date(ts);
  }
  return null;
}

function getDayCount(entries) {
  const dates = new Set();
  entries.forEach((entry) => {
    const date = getEntryDate(entry);
    if (date) {
      dates.add(date.toDateString());
    }
  });
  return dates.size;
}

export default function Diary() {
  const diaryEntries = useMemo(() => getDiaryEntries(), []);
  const [openEntry, setOpenEntry] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('diaryFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const entryCount = diaryEntries.length;
  const streakDays = useMemo(() => getDayCount(diaryEntries), [diaryEntries]);

  const toggleFavorite = (entryId) => {
    const next = favorites.includes(entryId)
      ? favorites.filter((id) => id !== entryId)
      : [...favorites, entryId];

    setFavorites(next);
    localStorage.setItem('diaryFavorites', JSON.stringify(next));
  };

  const entries = [...diaryEntries].reverse();

  return (
    <section id="diary" className="section diary-section">
      <PageHeader eyebrow="Diary" title="Your Manifestation Journal">
        A living record of your intentions, rituals, and daily energy notes.
      </PageHeader>

      <div className="diary-topbar">
        <div className="diary-summary-card diary-note-card">
          <span className="diary-label">Studio Journal</span>
          <h3>Entries created in Studio are stored here automatically.</h3>
          <p>Use the Studio page to add new prompts, rituals, or growth notes. They will appear in this journal view.</p>
        </div>

        <div className="diary-summary-card diary-stats-card">
          <span className="diary-label">Manifestation Stats</span>
          <div className="stats-grid">
            <div>
              <strong>{entryCount}</strong>
              <p>entries</p>
            </div>
            <div>
              <strong>{streakDays}</strong>
              <p>active days</p>
            </div>
            <div>
              <strong>{favorites.length}</strong>
              <p>favorites</p>
            </div>
          </div>
        </div>
      </div>

      {entries.length === 0 ? (
        <EmptyState title="no entries yet">Start your manifestation practice from Studio and it will appear here.</EmptyState>
      ) : (
        <div className="diary-grid">
          {entries.map((entry) => {
            const isOpen = openEntry === entry.id;
            const text = isOpen || entry.text.length < 180 ? entry.text : `${entry.text.slice(0, 180)}...`;

            return (
              <article
                key={entry.id}
                className={`diary-card ${isOpen ? 'expanded' : ''}`}
                onClick={() => setOpenEntry(isOpen ? null : entry.id)}
              >
                <div className="diary-card-header">
                  <span className="diary-label">{entry.label}</span>
                  <button
                    type="button"
                    className={`favorite-btn ${favorites.includes(entry.id) ? 'active' : ''}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFavorite(entry.id);
                    }}
                    aria-label="Toggle favorite"
                  >
                    {favorites.includes(entry.id) ? '★' : '☆'}
                  </button>
                </div>
                <h3>{entry.title}</h3>
                {entry.author && <p className="entry-author">by {entry.author}</p>}
                <p className="entry-text">{text}</p>
                <div className="diary-footer">manifesting with intention</div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
