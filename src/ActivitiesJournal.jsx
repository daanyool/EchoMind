import { useState, useEffect } from "react";
import "./ActivitiesJournal.css";
import ReactDOM from "react-dom/client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EscaladeLoader from "./EscaladeLoader";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ActivitiesJournal() {
  const navigate = useNavigate();

  const thoughtsList = [
    "When you're feeling nervous or anticipating something stressful, how do you usually respond or behave to handle the situation?",
   "What emotions do you tend to feel most strongly when you're anxious or facing something that scares you?",
    "What types of thoughts often pop into your head or loop in your mind when you're feeling overwhelmed or uneasy?",
    "Are there any physical signs or changes in your body that you usually notice when you're experiencing high levels of stress or anxiety?"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [entries, setEntries] = useState(Array(thoughtsList.length).fill(""));
  const [conditionInfo, setConditionInfo] = useState([]);
  const userEntries = entries;
  const [results, setResults] = useState(null);

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
    } else {
      navigate("/activities");
    }
  };

  const handleChange = (event) => {
    const newEntries = [...entries];
    newEntries[currentIndex] = event.target.value;
    setEntries(newEntries);
  };

  const handleSaveEntry = () => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      answers: entries // the 4 responses
    };

    const existingEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const updatedEntries = [newEntry, ...existingEntries];
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  useEffect(() => {
      fetch("http://127.0.0.1:5001/condition-info")
        .then((res) => res.json())
        .then(setConditionInfo)
        .catch((err) => console.error("Condition info fetch error:", err));
    }, []);
  
    useEffect(() => {
      const combinedInput = `
        Behavioral: ${userEntries[0]}
        Emotional: ${userEntries[1]}
        Cognitive: ${userEntries[2]}
        Physical: ${userEntries[3]}
      `;
  
      fetch("http://127.0.0.1:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: combinedInput }),
      })
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        })
        .catch((err) => console.error("Prediction Error:", err));
    }, [userEntries]);
  
    if (!results) return <EscaladeLoader/>;

  const handleSeeResults = () => {
    const anxietyScore = results.confidence;
    const type = results.predicted_type;
    const container = document.createElement("div");

    localStorage.setItem("anxietyScore", JSON.stringify(anxietyScore));
    localStorage.setItem("anxietyType", JSON.stringify(type));

    handleSaveEntry();

    Swal.fire({
      title: "Anxiety Assessment Result",
      html: container,
      showConfirmButton: true,
      confirmButtonText: "Close",
      background: "#ffffff",
      customClass: {
        popup: 'custom-swal-popup',
        title: 'swal2-title',
        content: 'swal2-content',
        confirmButton: 'swal2-confirm',
      },
      willOpen: () => {
        const root = ReactDOM.createRoot(container);
        root.render(
          <div style={{
            textAlign: "center",
            padding: "20px",
            borderRadius: "10px",
            color: "#000000"
          }}>
            <div style={{ width: "120px", height: "120px", margin: "0 auto 20px" }}>
              <CircularProgressbar
                value={anxietyScore}
                text={`${anxietyScore}`}
                styles={{
                  path: { stroke: "#03383a", strokeLinecap: "round" },
                  trail: { stroke: "#ffffff" },
                  text: { fill: "#000000", fontSize: "24px", fontWeight: "bold" },
                }}
              />
            </div>
            <h2 style={{ color: "#000000" }}>{results.predicted_type}</h2>
            <p style={{ fontSize: "14px", color: "#000000" }}>
              Your assessment indicates {results.predicted_level} anxiety with a {anxietyScore} likelihood of experiencing anxiety disorder.
              This level suggests {results.predicted_level} anxiety, characterized by persistent feelings of worry or stress.
            </p>
          </div>
        );
      },
      didClose: () => {
        navigate("/activities", { state: { journaled: true } });
      }
    });
  };

  return (
    <div className="thoughts-container">
      <h2 className="thoughts-title">{thoughtsList[currentIndex]}</h2>
      <textarea
        className="thoughts-textarea"
        placeholder="Write here..."
        value={entries[currentIndex]}
        onChange={handleChange}
      ></textarea>

      <div className="navigation-buttons">
        <button className="nav-button" onClick={handlePrev}>
          <FaArrowLeft />
        </button>
        {currentIndex === thoughtsList.length - 1 ? (
          <button className="see-results-button" onClick={handleSeeResults}>
            See Results →
          </button>
        ) : (
          <button className="nav-button" onClick={handleNext}>
            <FaArrowRight />
          </button>
        )}
      </div>

      <div className="bubble"></div>
    </div>
  );
}

export default ActivitiesJournal;
