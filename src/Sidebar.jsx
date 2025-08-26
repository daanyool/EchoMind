import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (page) => {
    navigate(`/${page}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/'); // Redirect to Landing Page
  };

  const isActive = (page) => location.pathname === `/${page}` ? 'active' : '';

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-circle">Ec0</div>
        <div className="logo-text">EchoMind</div>
      </div>

      <ul>
        <li className={isActive('Dashboard')} onClick={() => handleNavigation('Dashboard')}>
          <img src="/dashboard.gif" alt="Dashboard" className="sidebar-icon" />
          Dashboard
        </li>
        <li className={isActive('Activities')} onClick={() => handleNavigation('Activities')}>
          <img src="/activities.gif" alt="Activities" className="sidebar-icon" />
          Activities
        </li>
        <li className={isActive('NotificationPage')} onClick={() => handleNavigation('NotificationPage')}>
          <img src="/notification.gif" alt="Notification" className="sidebar-icon" />
          Notification
        </li>
        <li className={isActive('Statistics')} onClick={() => handleNavigation('Statistics')}>
          <img src="/statistics.gif" alt="Statistics" className="sidebar-icon" />
          Statistics
        </li>
        <li className={isActive('History')} onClick={() => handleNavigation('History')}>
          <img src="/history.gif" alt="History" className="sidebar-icon" />
          History
        </li>
        <li className={isActive('Echonsultation')} onClick={() => handleNavigation('Echonsultation')}>
          <img src="/consult.gif" alt="Consultation" className="sidebar-icon" />
          Echonsultation
        </li>
      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
