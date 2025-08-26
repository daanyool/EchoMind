import { useState } from "react";
import { motion } from "framer-motion";
import "./Echonsultation.css"; 
import Sidebar from "./Sidebar";

export default function Echonsultation() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="doctor-consult-container">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="doctor-consult-card"
      >
        <div className="doctor-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1080&auto=format&fit=crop"
            alt="Doctor portrait"
            className="doctor-image"
            loading="lazy"
          />
        </div>

        <div className="doctor-text">
          <h1>We're here to help</h1>
          <p>Speak with a licensed mental health professional.</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setClicked(true)}
          className="consult-button"
        >
          Consult a Psychologist / Psychiatrist
        </motion.button>

        {clicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="success-message"
          >
            Thanks! We'll connect you to an available specialist.
          </motion.div>
        )}

        <p className="privacy-note">Private & secure • Response within minutes</p>
      </motion.div>
    </div>
  );
}
