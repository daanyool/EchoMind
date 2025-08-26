import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import brainImage from './assets/brain.gif';
import logo from './assets/logo.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => navigate('/journal');
  const handleUpClick = () => navigate('/signup');
  const handleInClick = () => navigate('/signin');

  return (
    <div className="container">
      <nav className="navbar">
        <img src={logo} alt="logo" className='logo' />
        <div className="nav-links">
          <Link to="/types">ANXIETY TYPES</Link>
          <Link to="/resources">RESOURCES</Link>
          <Link to="/subscription">SUBSCRIPTION</Link>
          <Link to="/about">ABOUT US</Link>
        </div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={handleInClick}>Login</button>
          <button className="signup-btn" onClick={handleUpClick}>Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="title">
            ECHO <br /> <span className="highlight">MIND</span>
          </h1>
          <p className="subtitle">
            Understand Your Mind, <br /> Improve Your Well-Being
          </p>
        </div>

        <img src={brainImage} alt="Brain" className="brain-image" />
      </div>

      <div className="journal-container">
        <div className="journal-line"></div>
        <div className="journal-content">
          <h3 className="journal-title">Complete the Journal</h3>
          <p className="journal-desc">
            Reflect on your thoughts and emotions, discover insights to improve your well-being.
          </p>
        </div>

        <div className="journal-content">
          <h3 className="journal-title">View Your Anxiety Results</h3>
          <p className="journal-desc">
            Learn how your thoughts and emotions contribute to your anxiety levels and what you can do to manage them.
          </p>
        </div>

        <div className="journal-content">
          <h3 className="journal-title">Unlock Your Potential</h3>
          <p className="journal-desc">
            Take control of your anxiety with guided activities designed to support relaxation, mindfulness, and emotional balance—helping you improve your well-being.
          </p>
        </div>
      </div>

      <button className="start-btn" onClick={handleStartClick}>Start</button>
    </div>
  );
};

export default LandingPage;
