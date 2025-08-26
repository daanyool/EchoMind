import { useState, useEffect } from "react";
import "./JournalPage.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons
import { useNavigate } from "react-router-dom";

function JournalPage() {
  const navigate = useNavigate();

  const thoughtsList = [
    "Can you describe how you usually act or what you do when you're trying to avoid or cope with anxiety-provoking situations?",
    "How would you describe the emotions you experience most often during anxious moments or when facing something you fear?",
    "What kinds of thoughts tend to repeat in your mind when you're feeling anxious, worried, or overwhelmed?",
    "What physical sensations or body changes do you usually notice when you feel very anxious or stressed?"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [entries, setEntries] = useState(Array(thoughtsList.length).fill(""));

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries"));
    if (savedEntries) {
      setEntries(savedEntries);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleNext = () => {
    if (currentIndex < thoughtsList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    else if(currentIndex === 0) {
      navigate("/");
    }
  };

  const handleChange = (event) => {
    const newEntries = [...entries];
    newEntries[currentIndex] = event.target.value;
    setEntries(newEntries);
  };

  const handleSeeResults = () => {
    navigate("/Results", { state: { entries }});
  
   // alert("Your Journal Entries:\n" + entries.join("\n\n"));
  };

  return (
    <div className="thoughts-container">
      <h2 className="thoughts-title">{thoughtsList[currentIndex]}</h2>
      <textarea
        className="thoughts-textarea"
        placeholder="Write here..."
        value={entries[currentIndex]}
        onChange={handleChange}
        required
      ></textarea>
      
      <div className="navigation-buttons">
        <button 
          className="nav-button" 
          onClick={handlePrev}
        >
          <FaArrowLeft />
        </button>
        {currentIndex === thoughtsList.length - 1 ? (
          <button 
            className="see-results-button" 
            onClick={handleSeeResults}
          >
            See Results →
          </button>
        ) : (
          <button 
            className="nav-button" 
            onClick={handleNext}
            disabled={!entries[currentIndex].trim()}
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default JournalPage;
