import { useState } from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css'; // Link your CSS
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Don't forget
import { FaPlus } from 'react-icons/fa'; // Add plus icon

function Dashboard() {
  const initialActivities = ['Meditation', 'Exercise (5-15 mins)', 'Yoga', 'Reading', 'Jogging', 'Study', 'Work', 'Sleep', 'Travel', 'Cook', 'Write', 'Clean'];
  const [activities, setActivities] = useState(initialActivities); // Static activities
  const [checkedActivities, setCheckedActivities] = useState({}); // State for checked activities
  const [selectedWeek, setSelectedWeek] = useState('Week 1'); // State to track selected week

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const handleCheckboxChange = (activity) => {
    setCheckedActivities((prev) => ({
      ...prev,
      [activity]: !prev[activity], // Toggle checked state
    }));
  };

  const handleAddClick = () => {
    // Add functionality for when the Add button is clicked
    alert('Add functionality clicked');
  };

  // Function to limit the display to 2 activities
  const displayedActivities = activities.slice(0, 2); // Shows only the first two activities

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        
        {/* Top Header Section */}
        <div className="top-header">
          <div className="header-left">
            <h2>DONITA ROSE SEGUERRA</h2>
            {/* Progress Bar */}
            <div className="progress-bar">
              <div className="progress" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>

        {/* Header Stats Section */}
        <div className="header-stats">
          <div className="stat-box">
            <div className="stat-content">
              <img src="/weeks.png" alt="Weeks Passed" />
              <h3 className="stat-text">3</h3>
              <p className="stat-text-right">JOURNALS</p>
            </div>
            <p className="stat-details">PASSED PER WEEK</p>
          </div>
          <div className="stat-box">
            <div className="stat-content">
              <img src="/days.png" alt="Days Passed" />
              <h3 className="stat-text">2</h3>
              <p className="stat-text-right">DAYS</p>
            </div>
            <p className="stat-details">PASSED DAYS OF THE WEEK</p>
          </div>
          <div className="stat-box">
            <div className="stat-content">
              <img src="/activities.png" alt="Total Activities" />
              <h3 className="stat-text">65</h3>
              <p className="stat-text-right">ACTIVITIES</p>
            </div>
            <p className="stat-details">TOTAL OF ACHIEVED ACTIVITIES</p>
          </div>
        </div>

        {/* Middle Content */}
        <div className="middle-content">
          <div className="left-panel">

            {/* My Journal */}
            <div className="card journal-card">
              <div className="card-header">
                <h3>My Journal</h3>
                {/* Dropdown for week selection */}
                <select 
                  className="week-dropdown" 
                  value={selectedWeek} 
                  onChange={handleWeekChange}
                >
                  <option value="Week 1">This Week</option>
                  <option value="Week 2">This Month</option>
                  <option value="Day 1">This Day</option>
                  {/* Add more weeks as needed */}
                </select>
              </div>
              <div className="journal-entries">
                <div className="entry">CHILL DAY<br /><span>09/05/2025</span></div>
                <div className="add-entry">+</div>
              </div>
            </div>

            <div className="card activities-card">
              <div className="card-header">
                <h3>My Activities</h3>
                <button className="add-button" onClick={handleAddClick}>
                  <FaPlus />
                </button>
              </div>
              <div className="activity-list">
                {displayedActivities.map((activity, idx) => (
                  <div key={idx} className="activity-item">
                    <input 
                      type="checkbox" 
                      checked={checkedActivities[activity] || false} 
                      onChange={() => handleCheckboxChange(activity)} 
                    />
                    <label>{activity}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar Right Panel */}
          <div className="right-panel">
            <div className="card calendar-card">
              <h3>Calendar</h3>
              <Calendar/>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
