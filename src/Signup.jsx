import "./Signup.css";
import fb from "./assets/fb_acc.png";
import { useNavigate } from "react-router-dom";
import google from "./assets/g_account.png";

function Signup() {
  const navigate =  useNavigate();

   const handleSigninClick = () => {
    navigate('/Signin')
   };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="circle"></div>
        <h2>Create your account</h2>
        <form>
          <label>Full Name</label>
          <input type="text" placeholder="Enter full name" />

          <label>Email Address</label>
          <input type="email" placeholder="Enter email" />

          <label>Password</label>
          <input type="password" placeholder="Enter password" />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm password" />

          <button type="submit">Sign Up</button>
        </form>

        <p className="signin-text">
          Already have an account? <a href="/signin">Sign In</a>
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

export default Signup;