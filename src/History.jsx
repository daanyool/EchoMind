import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './History.css';

const History = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();
  const anxietyScore = JSON.parse(localStorage.getItem("anxietyScore"));
  const anxietyType = JSON.parse(localStorage.getItem("anxietyType"));

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    
    // Filter valid entries (non-null, valid id and date)
    const validEntries = savedEntries.filter(entry => 
      entry.id && entry.date && !isNaN(new Date(entry.date).getTime())
    );
    
    setEntries(validEntries);
  }, []);

  const handleEntryClick = (entryId) => {
    navigate(`/entry/${entryId}`);
  };

  return (
    <div className="history-page">
      <Sidebar />
      <div className="history-main-content">
        <nav className="history-navbar">
          <h1 className="history-navbar-title">Journal History</h1>
        </nav>

        <div className="history-content-container">
          <h2 className="history-title">Your Journal Entries</h2>
           <div className="history-entries-grid">
              {/* Static/Old containers with previous dates and GAD scores */}
              {[3, 2, 1].map((daysAgo, index) => {
                const oldDate = new Date();
                oldDate.setDate(oldDate.getDate() - daysAgo);
                const formattedDate = oldDate.toLocaleDateString();
                const scores = [45, 52, 38]; // Customize as needed

                return (
                  <div key={`static-${index}`} className="history-entry-card old-entry">
                    <div className="history-entry-image" />
                    <p className="history-entry-date">{formattedDate}</p>
                    <p className="history-entry-title">{scores[index]}% GAD</p>
                  </div>
                );
              })}

              {/* Dynamic entries from localStorage */}
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="history-entry-card"
                  onClick={() => handleEntryClick(entry.id)}
                >
                  <div className="history-entry-image" />
                  <p className="history-entry-date">{new Date(entry.date).toLocaleDateString()}</p>
                  <p className="history-entry-title">
                    {anxietyScore ? `${anxietyType} ${anxietyScore}` : 'unknown'}
                  </p>
                </div>
              ))}
            </div>

        </div>
      </div>
    </div>
  );
};

export default History;
