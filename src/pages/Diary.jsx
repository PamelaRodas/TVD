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
      <PageHeader eyebrow="Diario" title="Tu Diario de Manifestación">
        Un registro vivo de tus intenciones, rituales y notas de energía diaria.
      </PageHeader>

      <div className="diary-topbar">
        <div className="diary-summary-card diary-note-card">
          <span className="diary-label">Diario del Estudio</span>
          <h3>Las entradas creadas en Estudio se guardan aquí automáticamente.</h3>
          <p>Usa la página de Estudio para agregar nuevas preguntas, rituales o notas de crecimiento. Aparecerán en esta vista de diario.</p>
        </div>

        <div className="diary-summary-card diary-stats-card">
          <span className="diary-label">Estadísticas de Manifestación</span>
          <div className="stats-grid">
            <div>
              <strong>{entryCount}</strong>
              <p>entradas</p>
            </div>
            <div>
              <strong>{streakDays}</strong>
              <p>días activos</p>
            </div>
            <div>
              <strong>{favorites.length}</strong>
              <p>favoritos</p>
            </div>
          </div>
        </div>
      </div>

      {entries.length === 0 ? (
        <EmptyState title="sin entradas aún">Comienza tu práctica de manifestación desde Estudio y aparecerá aquí.</EmptyState>
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
