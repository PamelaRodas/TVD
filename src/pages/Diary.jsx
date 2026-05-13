import { useState } from 'react';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { getDiaryEntries } from '../services/contentService';

export default function Diary() {
  const [diaryEntries] = useState(() => getDiaryEntries());

  return (
    <section id="diary" className="section diary-section">
      <PageHeader
        eyebrow="Diary"
        title="the pages I keep folded inside my velvet notebook"
      >
        A small collection of thoughts, memories, and soft confessions.
      </PageHeader>

      {diaryEntries.length === 0 ? (
        <EmptyState title="no diary entries yet">
          Add your first entry from Studio and it will appear here.
        </EmptyState>
      ) : (
        <div className="diary-grid">
          {diaryEntries.map((entry) => (
            <article key={entry.id} className="diary-card">
              <span className="diary-label">{entry.label}</span>
              <h3>{entry.title}</h3>
              <p>{entry.text}</p>
              <div className="diary-footer">sealed with a kiss</div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
