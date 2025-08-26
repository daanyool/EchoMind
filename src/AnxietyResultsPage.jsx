import { useEffect, useState } from "react";
import "./AnxietyResultsPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import EscaladeLoader from "./EscaladeLoader";
import ptsdImage from './assets/PTSD.jpeg';
import gadImage from './assets/GAD.jpeg';
import ocdImage from './assets/OCD.jpeg';
import sadImage from './assets/SAD.jpeg';
import socadImage from './assets/SOCAD.jpeg';
import pdImage from './assets/PD.jpeg';

const AnxietyResultsPage = () => {
  const [results, setResults] = useState(null);
  const location = useLocation();
  const [conditionInfo, setConditionInfo] = useState([]);
  const userEntries = location.state?.entries;

  const conditionImages = {
    "Post-Traumatic Stress Disorder": ptsdImage,
    "Generalized Anxiety Disorder": gadImage,
    "Obsessive-compulsive Disorder": ocdImage,
    "Separation Anxiety Disorder": sadImage,
    "Social Anxiety Disorder": socadImage,
    "Panic Disorder": pdImage
  };

  const navigate = useNavigate();

  const handleUnlockClick = () => {
    navigate('/Signin')
  };

  if (!userEntries || userEntries.every((entry) => entry.trim() === "")) {
    return <div className="loading"><h3>No journal entries found. Please fill out the journal first.</h3></div>;
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/condition-info")
      .then((res) => res.json())
      .then(setConditionInfo)
      .catch((err) => console.error("Condition info fetch error:", err));
  }, []);

  useEffect(() => {
    const combinedInput = `
      Physical: ${userEntries[3]}
      Behavioral: ${userEntries[0]}
      Emotional: ${userEntries[1]}
      Cognitive: ${userEntries[2]}
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

  if (loading || !results) return <EscaladeLoader/>;

  const predictedType = results.predicted_type;
  const predictedLevel = results.predicted_level;
  const condition = conditionInfo.find((c) => c.name === predictedType);
  const fullTypeName = condition?.name || predictedType;
  const levelDescription = condition?.stages?.[predictedLevel];
  const image = conditionImages[condition?.name];

  return (
    <div className="results-container">
      <div className="results-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="results-title">Mental Health Anxiety Assessment Result</h1>
        <div className="results-summary">
          <div className="anxiety-circle">
            {results.confidence}<br />ANXIETY
          </div>
          <div className="anxiety-description">
            <h2 className="disorder-title">{fullTypeName}</h2>
            <p className="disorder-text">
              Your assessment indicates {predictedLevel.toLowerCase()} anxiety with a {results.confidence} likelihood of experiencing this anxiety disorder.
            </p>
          </div>
        </div>

        <h3 className="section-title">Anxiety Levels</h3>
        <div className="levels-container">
          {["10–20% Low", "20–40% Mild", "40–60% Moderate", "60–90% Severe"].map((label, index) => (
            <div key={index} className="anxiety-level">
              {label}
            </div>
          ))}
        </div>

        <h3 className="section-title">What is {fullTypeName}?</h3>
        <div className="gad-section">
          <p className="gad-description">
            <strong>Definition:</strong> {condition?.definition || "Information not available."}
            <br /><br />
            <strong>At {predictedLevel} level with {results.confidence} likelihood:</strong><br />
            {levelDescription?.Emotional || "Info unavailable due to no anxiety. "}
            {levelDescription?.Behavioral || ""}
            {levelDescription?.Cognitive || ""}
            {levelDescription?.Physical || ""}
            After all, it is best to consult a doctor/physician/psychiatrist.
          </p>
          <img
            src={image}
            alt="Anxiety representation"
            className="gad-image"
          />
        </div>

        <h3 className="section-title">Symptoms of {fullTypeName}</h3>
        <div className="symptoms-grid">
          {condition?.mainSymptoms ? ( // Changed from condition?.symptoms
            condition.mainSymptoms.map((symptom, idx) => ( // Changed from condition.symptoms
              <div key={idx} className="symptom-card">
                <p className="symptom-text">✔ {symptom}</p>
              </div>
            ))
          ) : (
            <p>No symptoms data available.</p>
          )}
        </div>

        <div className="tracker-container">
          <h3 className="tracker-subtitle">Track Your Anxiety Now</h3>
          <div className="tracker-section">
            <h2 className="tracker-title">Unlock Exclusive Tracker Extensions Today</h2>
            <p className="tracker-description">
              Ready to improve your mental well-being? Unlock our Mental Health Tracker now! Track your progress, set goals, and take steps toward a healthier, happier you. Start your journey!
            </p>
            <button className="tracker-button" onClick={handleUnlockClick}>Unlock Full Results</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnxietyResultsPage;
