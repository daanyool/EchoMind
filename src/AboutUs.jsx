import { useState, useEffect } from 'react';
import './AboutUs.css';

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [flippedCards, setFlippedCards] = useState(Array(4).fill(false));

  const developers = [
    {
      name: "MARK DANIEL FERNANDEZ",
      role: "Back-end & Front-end Developer ",
      description: "Handles both front-end and back-end development to ensure smooth integration and system functionality.",
      image: "mark.png"
    },
    {
      name: "DONITA ROSE SEGUERRA",
      role: "UI/UX / Front-end / Researcher",
      description: "Designs intuitive interfaces, implements front-end features, and conducts research to align development with user needs.",
      image: "don.jpeg"
    },
    {
      name: "ZYREL GLENN TEOGANGCO",
      role: "UI/UX & Researcher",
      description: "Crafts user-centered designs and supports research for evidence-based improvements in user experience.",
      image: "zy.png"
    },
    {
      name: "BENEDICT MANLOLOYO",
      role: "Front-End Contributor",
      description: "Assists in developing parts of the front-end and supports visual implementation tasks.",
      image: "bene.png"
    }
  ];

  const toggleFlip = (index) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === developers.length - 1 ? 0 : prevIndex + 1
    );
    setFlippedCards(Array(4).fill(false));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? developers.length - 1 : prevIndex - 1
    );
    setFlippedCards(Array(4).fill(false));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setFlippedCards(Array(4).fill(false));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="about-container">
        {/* Back Button */}
    <button className="back-button" onClick={() => window.history.back()}>
      ← Back
    </button>
      {/* Background elements */}
      <div className="bg"></div>
      <div className="bg2"></div>

      {/* EchoMind Mission Section */}
      <section className="app-mission">
        <h2 className="section-title">
          <span className="title-gradient">ECHOMIND</span>
          <span className="title-cursor">_</span>
        </h2>
        <p className="section-subtitle">// REVOLUTIONIZING ANXIETY UNDERSTANDING</p>
        
        <div className="mission-content">
          <div className="mission-card">
            <div className="mission-header pulse">OUR INNOVATION</div>
            <p className="mission-text">
              EchoMind transforms anxiety assessment through reflective journaling 
              and AI analysis. Unlike traditional quizzes, our platform creates 
              a safe space for authentic self-expression, then uses advanced NLP 
              to identify patterns across behavioral, emotional, cognitive, and 
              physical dimensions.
            </p>
          </div>
          
          <div className="mission-card">
            <div className="mission-header pulse">THE PROBLEM</div>
            <p className="mission-text">
              Standard anxiety assessments often fail to capture nuance. 
              Multiple-choice quizzes force users into boxes, while clinical 
              settings can feel intimidating. Many struggle alone because 
              existing tools don't meet them where they are.
            </p>
          </div>
          
          <div className="mission-card">
            <div className="mission-header pulse">OUR APPROACH</div>
            <p className="mission-text">
              Four carefully designed prompts guide users through a structured 
              journaling process. Our AI analyzes the content without judgment, 
              identifying anxiety type and severity through language patterns. 
              The result is personalized insights with actionable recommendations.
            </p>
          </div>
        </div>
        
        <div className="process-diagram">
          <h3 className="tech-title">HOW ECHOMIND WORKS</h3>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-title">Reflective Journaling</div>
              <div className="step-desc">Guided prompts across 4 anxiety dimensions</div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-title">AI Analysis</div>
              <div className="step-desc">NLP evaluates language patterns and themes</div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-title">Personalized Profile</div>
              <div className="step-desc">Anxiety type and severity assessment</div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-title">Actionable Insights</div>
              <div className="step-desc">Evidence-based coping strategies</div>
            </div>
          </div>
        </div>

        <div className="tech-stack">
          <h3 className="tech-title">CLINICALLY VALIDATED TECHNOLOGY</h3>
          <div className="tech-badges">
            <span className="tech-badge">NLP ANALYSIS</span>
            <span className="tech-badge">COGNITIVE PATTERNS</span>
            <span className="tech-badge">EMOTIONAL MAPPING</span>
            <span className="tech-badge">PRIVACY-FIRST</span>
          </div>
        </div>
      </section>

      {/* Team Section with Flipping Cards */}
      <section className="team-section">
        <h2 className="section-title">
          <span className="title-gradient">OUR TEAM</span>
          <span className="title-cursor">_</span>
        </h2>
        <p className="section-subtitle">// CLINICIANS AND TECHNOLOGISTS WORKING TOGETHER</p>
        
        <div className="team-carousel-container">
          <div className="team-carousel">
            {developers.map((dev, index) => (
              <div 
                key={index}
                className={`team-member ${index === currentIndex ? 'active' : ''}`}
                onClick={() => toggleFlip(index)}
              >
                <div className={`member-card ${flippedCards[index] ? 'flipped' : ''}`}>
                  <div className="member-front">
                    <div className="member-image-container">
                      <img src={dev.image} alt={dev.name} className="member-image" />
                    </div>
                    <div className="member-info">
                      <h3 className="member-name">{dev.name}</h3>
                      <p className="member-role">{dev.role}</p>
                    </div>
                  </div>
                  <div className="member-back">
                    <div className="member-description">
                      <p>{dev.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="carousel-controls">
            <button className="carousel-button prev" onClick={prevSlide}>&lt;</button>
            <div className="carousel-dots">
              {developers.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <button className="carousel-button next" onClick={nextSlide}>&gt;</button>
          </div>
        </div>
      </section>

      <div className="safety-notice">
        <div className="pulse">⚠ IMPORTANT NOTE</div>
        <p>
          EchoMind is not a substitute for professional medical advice. 
          Our tool provides insights but cannot diagnose. Always consult 
          a qualified healthcare provider for mental health concerns.
        </p>
      </div>
    </div>
    
  );
};

export default About;