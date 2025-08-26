import { useNavigate } from 'react-router-dom';
import './AnxietyTypes.css';

const anxietyData = [
  {
    title: 'Generalized Anxiety Disorder (GAD)',
    description: 'Persistent, excessive worry about life events. Symptoms include fatigue, irritability, and restlessness.',
    emoji: '🧠'
  },
  {
    title: 'Panic Disorder',
    description: 'Sudden episodes of intense fear (panic attacks), with chest pain, shortness of breath, and dizziness.',
    emoji: '💥'
  },
  {
    title: 'Social Anxiety Disorder',
    description: 'Intense fear of social interactions or being judged by others, often leading to avoidance.',
    emoji: '😳'
  },
  {
    title: 'Obsessive-Compulsive Disorder (OCD)',
    description: 'Unwanted recurring thoughts (obsessions) and repetitive actions (compulsions) to reduce anxiety.',
    emoji: '🔄'
  },
  {
    title: 'Post-Traumatic Stress Disorder (PTSD)',
    description: 'Triggered by a traumatic event, symptoms include flashbacks, nightmares, and hypervigilance.',
    emoji: '⚡'
  },
  {
    title: 'Separation Anxiety Disorder',
    description: 'Extreme fear of being separated from loved ones, affecting daily life and relationships.',
    emoji: '💔'
  },
];

const AnxietyTypes = () => {
  const navigate = useNavigate();

  return (
    <div className="type-anxiety-page">
      <header className="type-anxiety-page__header">
        <button
          className="type-anxiety-page__back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          Back
        </button>
        <h1 className="type-anxiety-page__title">Anxiety Types Overview</h1>
        <p className="type-anxiety-page__intro">
          Understanding the different types of anxiety disorders helps you identify symptoms and seek proper support.
        </p>
      </header>

      <section className="type-anxiety-page__grid">
        {anxietyData.map(({ title, description, emoji }, index) => (
          <div className="type-anxiety-page__card-container" key={index}>
            <article className="type-anxiety-page__card">
              <div className="type-anxiety-page__card-front">
                <div className="type-anxiety-page__image-placeholder">
                  <span className="emoji">{emoji}</span>
                </div>
                <h2>{title}</h2>
              </div>
              <div className="type-anxiety-page__card-back">
                <p>{description}</p>
              </div>
            </article>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AnxietyTypes;