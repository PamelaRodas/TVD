import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import {
  addDiaryEntry,
  addPhotoMoment,
  getContentSummary,
  getDiaryEntries,
  getPhotoMoments,
  resetDiaryEntries,
  resetPhotoMoments,
} from '../services/contentService';

const emptyDiaryForm = {
  author: '',
  title: '',
  label: 'journal entry',
  text: '',
};

const emptyPhotoForm = {
  author: '',
  image: '',
  caption: '',
};

export default function Studio() {
  const [diaryForm, setDiaryForm] = useState(emptyDiaryForm);
  const [photoForm, setPhotoForm] = useState(emptyPhotoForm);
  const [diaryEntries, setDiaryEntries] = useState(() => getDiaryEntries());
  const [photoMoments, setPhotoMoments] = useState(() => getPhotoMoments());
  const [summary, setSummary] = useState(() => getContentSummary());

  const refreshSummary = () => {
    setSummary(getContentSummary());
  };

  const updateDiaryField = (field, value) => {
    setDiaryForm((current) => ({ ...current, [field]: value }));
  };

  const updatePhotoField = (field, value) => {
    setPhotoForm((current) => ({ ...current, [field]: value }));
  };

  const handleDiarySubmit = (event) => {
    event.preventDefault();
    const author = diaryForm.author.trim() || 'anonymous soul';
    const title = diaryForm.title.trim();
    const text = diaryForm.text.trim();
    const label = diaryForm.label.trim() || 'journal entry';

    if (!title || !text) return;

    const updated = addDiaryEntry({ author, title, text, label });
    setDiaryEntries(updated);
    setDiaryForm({ ...emptyDiaryForm, author });
    refreshSummary();
  };

  const handlePhotoSubmit = (event) => {
    event.preventDefault();
    const author = photoForm.author.trim() || 'anonymous soul';
    const image = photoForm.image.trim();
    const caption = photoForm.caption.trim();

    if (!image || !caption) return;

    const updated = addPhotoMoment({ author, image, caption });
    setPhotoMoments(updated);
    setPhotoForm({ ...emptyPhotoForm, author });
    refreshSummary();
  };

  const handleResetDiary = () => {
    const updated = resetDiaryEntries();
    setDiaryEntries(updated);
    refreshSummary();
  };

  const handleResetPhotos = () => {
    const updated = resetPhotoMoments();
    setPhotoMoments(updated);
    refreshSummary();
  };

  return (
    <section className="section studio-section">
      <PageHeader eyebrow="Studio" title="cosmic studio">
        Create your growth entries and energy moments. Save them locally and build your meaningful practice.
      </PageHeader>

      <div className="studio-stats">
        <div>
          <span className="diary-label">diary entries</span>
          <strong>{summary.diaryCount}</strong>
        </div>
        <div>
          <span className="diary-label">photo moments</span>
          <strong>{summary.photoCount}</strong>
        </div>
        <div>
          <span className="diary-label">storage</span>
          <strong>local</strong>
        </div>
      </div>

      <div className="studio-layout">
        <form className="studio-panel" onSubmit={handleDiarySubmit}>
          <div className="studio-panel-header">
            <span className="feature-icon">01</span>
            <div>
              <h3>new growth entry</h3>
              <p>Document your healthy practices, intentions, and personal growth here.</p>
            </div>
          </div>

          <label>
            <span>your name</span>
            <input
              value={diaryForm.author}
              onChange={(event) => updateDiaryField('author', event.target.value)}
              placeholder="your cosmic name"
            />
          </label>

          <label>
            <span>title</span>
            <input
              value={diaryForm.title}
              onChange={(event) => updateDiaryField('title', event.target.value)}
              placeholder="a title for the entry"
            />
          </label>

          <label>
            <span>label</span>
            <input
              value={diaryForm.label}
              onChange={(event) => updateDiaryField('label', event.target.value)}
              placeholder="journal entry"
            />
          </label>

          <label>
            <span>text</span>
            <textarea
              value={diaryForm.text}
              onChange={(event) => updateDiaryField('text', event.target.value)}
              placeholder="write the moment here..."
            />
          </label>

          <div className="studio-actions">
            <button className="primary-button" type="submit">save entry</button>
            <button className="secondary-button" type="button" onClick={handleResetDiary}>reset diary</button>
          </div>
        </form>

        <form className="studio-panel" onSubmit={handlePhotoSubmit}>
          <div className="studio-panel-header">
            <span className="feature-icon">02</span>
            <div>
              <h3>new energy moment</h3>
              <p>Capture images that represent your growth practice.</p>
            </div>
          </div>

          <label>
            <span>your name</span>
            <input
              value={photoForm.author}
              onChange={(event) => updatePhotoField('author', event.target.value)}
              placeholder="your cosmic name"
            />
          </label>

          <label>
            <span>image url</span>
            <input
              value={photoForm.image}
              onChange={(event) => updatePhotoField('image', event.target.value)}
              placeholder="https://..."
            />
          </label>

          <label>
            <span>caption</span>
            <textarea
              value={photoForm.caption}
              onChange={(event) => updatePhotoField('caption', event.target.value)}
              placeholder="write a short caption..."
            />
          </label>

          <div className="studio-actions">
            <button className="primary-button" type="submit">save photo</button>
            <button className="secondary-button" type="button" onClick={handleResetPhotos}>reset photos</button>
          </div>
        </form>
      </div>

      <div className="studio-preview">
        <article className="studio-preview-list">
          <h3>latest diary entries</h3>
          {diaryEntries.slice(0, 3).map((entry) => (
            <div key={entry.id} className="studio-preview-item">
              <span>{entry.label}</span>
              <strong>{entry.title}</strong>
              <p className="entry-author">by {entry.author || 'anonymous soul'}</p>
            </div>
          ))}
        </article>

        <article className="studio-preview-list">
          <h3>latest photos</h3>
          {photoMoments.slice(0, 3).map((moment) => (
            <div key={moment.id} className="studio-preview-item">
              <span>image</span>
              <strong>{moment.caption}</strong>
              <p className="entry-author">by {moment.author || 'anonymous soul'}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

