import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EntryDetail.css';

const EntryDetail = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    
    console.log('Saved Entries:', savedEntries); // Log all entries in localStorage
    
    const foundEntry = savedEntries.find((entry) => entry.id === parseInt(id));
    
    if (foundEntry) {
      setEntry(foundEntry);
    } else {
      console.log('Entry not found, navigating to history');
      navigate('/history');
    }
  }, [id, navigate]);

  // Function to determine the anxiety level based on the score
  const getAnxietyLevel = (score) => {
    if (score < 30) return 'Low';
    if (score < 70) return 'Medium';
    return 'High';
  };

  // If entry is still loading, display a loading state
  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="entry-detail-container">
      {/* Anxiety Score Section */}
      {entry.anxietyScore !== undefined && (
        <div className="anxiety-score">
          <div className="anxiety-score-info">
            <h3>Anxiety Score: {entry.anxietyScore}%</h3>
            <p>Level: {getAnxietyLevel(entry.anxietyScore)}</p>
          </div>
        </div>
      )}

      {/* Journal Entry Content */}
      <h2>Journal Entry</h2>
      <p className="entry-date">{new Date(entry.date).toLocaleDateString()}</p>

      <div className="entry-content">
        {entry.answers.map((answer, index) => (
          <div key={index} className="entry-question">
            <h3>Question {index + 1}:</h3>
            <p>{answer}</p>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate('/history')}>
        Back to History
      </button>
    </div>
  );
};

export default EntryDetail;
