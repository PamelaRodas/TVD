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
  title: '',
  label: 'journal entry',
  text: '',
};

const emptyPhotoForm = {
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
    const title = diaryForm.title.trim();
    const text = diaryForm.text.trim();
    const label = diaryForm.label.trim() || 'journal entry';

    if (!title || !text) return;

    const updated = addDiaryEntry({ title, text, label });
    setDiaryEntries(updated);
    setDiaryForm(emptyDiaryForm);
    refreshSummary();
  };

  const handlePhotoSubmit = (event) => {
    event.preventDefault();
    const image = photoForm.image.trim();
    const caption = photoForm.caption.trim();

    if (!image || !caption) return;

    const updated = addPhotoMoment({ image, caption });
    setPhotoMoments(updated);
    setPhotoForm(emptyPhotoForm);
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
      <PageHeader
        eyebrow="Studio"
        title="content manager for the archive"
      >
        This is the front-end version of the future admin panel. Today it saves locally; later each action can call Spring Boot endpoints.
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
              <h3>new diary entry</h3>
              <p>Later this maps to POST /api/diary.</p>
            </div>
          </div>

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
              <h3>new photo moment</h3>
              <p>Later this maps to POST /api/photos.</p>
            </div>
          </div>

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
            </div>
          ))}
        </article>

        <article className="studio-preview-list">
          <h3>latest photos</h3>
          {photoMoments.slice(0, 3).map((moment) => (
            <div key={moment.id} className="studio-preview-item">
              <span>image</span>
              <strong>{moment.caption}</strong>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
