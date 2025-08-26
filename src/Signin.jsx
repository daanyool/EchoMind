import "./Signin.css";
import fb from "./assets/fb_acc.png";
import google from "./assets/g_account.png";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  const handleDashClick = () => {
    navigate("/Dashboard");
  }

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="circle"></div>
        <h2>Login</h2>
        <form>
          <label>Email Address</label>
          <input type="email" placeholder="Enter email" />

          <label>Password</label>
          <input type="password" placeholder="Enter password" />

          <button type="submit" onClick={handleDashClick}>Login</button>
        </form>

        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>

        <div className="or-section">
          <span></span>
          <div className="social-buttons">
            <a className="facebook-btn" href="https://www.facebook.com">
              <img src={fb} alt="Facebook" />
            </a>
            <a className="google-btn"href="https://accounts.google.com">
              <img src={google} alt="Google" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;