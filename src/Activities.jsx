import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Activities.css';

const Activities = () => {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [hasJournaledToday, setHasJournaledToday] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [dailyDataMap, setDailyDataMap] = useState({});

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  function getLocalDateKey(date = new Date()) {
    date.setHours(0, 0, 0, 0);
    return date.toISOString().split('T')[0];
  }

  const todayKey = getLocalDateKey();

  const allActivities = {
    "Generalized Anxiety Disorder": [
      'Record Anxious Thoughts',
      'Climb Fear Ladder',
      'Reframe Negative Beliefs',
      'Track Mood Patterns',
      'Do Mindful Breathing',
      'Take Silent Walk',
      'Try Loving-Kindness',
      'Plan Healthy Meals',
      'Log Sleep Habits',
      'Limit Screen Time',
      'Practice 4-7-8 Breathing',
      'Do Muscle Relaxation',
      'Listen to Imagery',
      'Light Aromatherapy Candle',
      'Write Gratitude List',
      'Notice Thought Drift',
      'Draw or Doodle',
      'Write Confidence Letter',
      'Visualize Calm Outcome',
      'Organize a Corner'
    ],
    "Obsessive-compulsive Disorder": [
      'ABC Thought Mapping',
      'Observe Without Judging',
      'Schedule Joy Activities',
      'Trigger Thought Logging',
      'Box Breathing Practice',
      'Tense-Release Routine',
      'ERP Practice Session',
      'Worry Delay Timer',
      'Compassionate Self-Talk',
      '"Not My Fault" Reminder',
      'OCD Video Watching',
      'Problem-Solving Pause',
      'Cognitive Flexibility Training',
      'Self-Kindness Reminders',
      'Intrusive Thought Acknowledgment',
      'Therapist Session Prep',
      'Mindfulness Practice',
      'Yoga Session',
      'Challenge Irrational Beliefs',
      'Physical Movement Routine'
    ],
    "Post-Traumatic Stress Disorder": [
      'Control Focus',
      'Grounding Techniques',
      'Write Trauma',
      'Build Resilience',
      'Sense Awareness',
      'Coping Statements',
      'Self-Care Wheel',
      'Learn Trauma',
      'Healthy Habits',
      'Identify Triggers',
      'Trigger List',
      'Symptom Check',
      'Counting Calm',
      'Manage Trauma',
      'Positive Talk',
      'Symptom List',
      'Strength Building',
      'Affirmations Write',
      'Care Planning',
      'Resilience Growth'
    ],
    "Panic Disorder": [
      'Practice Muscle Relaxation',
      'Remind Yourself It Will Pass',
      'Take Deep Breaths',
      'Find a Quiet Space',
      'Focus on an Object',
      'Use the 5-4-3-2-1 Method',
      'Repeat a Mantra',
      'Walk or Move Lightly',
      'Take Prescribed Medication',
      'Tell Someone You Trust',
      'Visualize a Safe Place',
      'Avoid Stimulants',
      'Get Enough Sleep',
      'Practice Regular Exercise',
      'Challenge Negative Thoughts',
      'Learn Your Triggers and Plan Ahead',
      'Count Backwards Slowly',
      'Listen to Calming Music',
      'Use Positive Affirmations',
      'Avoid Overthinking'
    ],
    "Separation Anxiety Disorder": [
      'Goodbye Practice',
      'Practice the Situation Ahead of Time',
      'Visual schedule',
      'Deep breathing',
      'Safe place visualization',
      'Positive self-talk',
      'Prepare in advance',
      'Set consistent routine',
      'Mindfulness meditation',
      'Use distraction tools',
      'Set small goals',
      'Practice self-compassion',
      'Create safe words',
      'Express emotions',
      'Get quality sleep',
      'Plan gradual separations',
      'Engage in hobbies',
      'Practice gratitude',
      'Seek therapy resources',
      'Set realistic expectations',
      'Practice decision-making'
    ],
    "Social Anxiety Disorder": [
      'Initiate Chats',
      'Act Confident',
      'Social Practice',
      'Self Kindness',
      'Talk Gradually',
      'Face Fears',
      'Thought Reframing',
      'Present Awareness',
      'Safe Socializing',
      'Sleep Hygiene',
      'Self Compassion',
      'Start Smalltalk',
      'Active Listening',
      'Share Stories',
      'Voice Opinions',
      'Express Feelings',
      'Join Discussions',
      'Give Compliments',
      'Make Eye-contact',
      'Practice Greetings'
    ]
  };


  const[anxietyType, setAnxietyType] = useState("");

  useEffect(() => {
    const storedType = localStorage.getItem("anxietyType");

    if (storedType) setAnxietyType(JSON.parse(storedType));
  }, []);


  useEffect(() => {
    const storedMap = JSON.parse(localStorage.getItem('dailyDataMap')) || {};
    setDailyDataMap(storedMap);
    setHasJournaledToday(!!storedMap[todayKey]?.journaled);
  }, [todayKey]);

  const saveMapToLocalStorage = (map) => {
    localStorage.setItem('dailyDataMap', JSON.stringify(map));
  };

  const handleClickStartJournaling = () => {
    const newMap = {
      ...dailyDataMap,
      [todayKey]: {
        ...(dailyDataMap[todayKey] || {}),
        journaled: true,
      },
    };
    setDailyDataMap(newMap);
    saveMapToLocalStorage(newMap);
    navigate('/activities-journal', { state: { from: 'activities' } });
    setHasJournaledToday(true);
  };


  const handleClickChooseActivities = () => {
    setShowModal(true);
  };

  const toggleActivity = (activity) => {
    setSelectedActivities(prev => prev.includes(activity)
      ? prev.filter(act => act !== activity)
      : [...prev, activity]);
  };

  const handleDone = () => {
    const newMap = { ...dailyDataMap };
    selectedActivities.forEach((activity, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const dayKey = date.toISOString().split('T')[0];
      newMap[dayKey] = {
        ...(newMap[dayKey] || {}),
        activity,
      };
    });
    setDailyDataMap(newMap);
    saveMapToLocalStorage(newMap);
    setSelectedActivities([]);
    setShowModal(false);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const activityDays = Object.keys(dailyDataMap)
    .filter(d => dailyDataMap[d]?.activity)
    .sort();
  const lastActivityKey = activityDays[activityDays.length - 1] || null;
  const showStartJournalingOnKey = lastActivityKey
    ? new Date(new Date(lastActivityKey).getTime() + 86400000).toISOString().split('T')[0]
    : todayKey;

  return (
    <div className="activities-container">
      <Sidebar />

      <main className="calendar-section">
        <h2>ALL ACTIVITIES</h2>
        <div className="month-header">
          <button onClick={goToPreviousMonth}>&lt;</button>
          <span>{`${monthNames[currentMonth]} ${currentYear}`}</span>
          <button onClick={goToNextMonth}>&gt;</button>
        </div>

        <div className="calendar-grid">
          {days.map((day, idx) => (
            <div className="day-header" key={idx}>{day}</div>
          ))}

          {(() => {
            const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
            const calendarCells = [];

            for (let i = 0; i < firstDayOfMonth; i++) {
              calendarCells.push(<div key={`empty-${i}`} className="day-box empty" />);
            }

            for (let day = 1; day <= totalDays; day++) {
              const date = new Date(currentYear, currentMonth, day);
              const dateKey = date.toISOString().split('T')[0];
              const isToday = dateKey === todayKey;
              const entry = dailyDataMap[dateKey];
              const activity = entry?.activity;

             calendarCells.push(
                <div
                  key={day}
                  className={`day-box ${activity ? 'active-day' : ''}`}
                >
                  <span className="day-number">{day}</span>

                  {dateKey === showStartJournalingOnKey && !hasJournaledToday && (
                    <button
                      onClick={isToday ? handleClickStartJournaling : undefined}
                      disabled={!isToday}
                      style={{
                        backgroundColor: isToday ? '#03383a' : '#888',
                        color: '#fff',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '5px',
                        cursor: isToday ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Start Journaling
                    </button>
                  )}

                  {dateKey === showStartJournalingOnKey && isToday && hasJournaledToday && !activity && (
                    <button
                      onClick={handleClickChooseActivities}
                      style={{
                        backgroundColor: '#03383a',
                        color: '#fff',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '5px',
                      }}
                    >
                      Choose Activities
                    </button>
                  )}


                  {activity && (
                    <div className="activity-text">
                      {activity.split('\n').map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return calendarCells;
          })()}
        </div>
        <button
        className="reset-data-btn"
        onClick={() => {
          if (window.confirm('Are you sure you want to erase all data? This action cannot be undone.')) {
            localStorage.removeItem('dailyDataMap');
            window.location.reload(); // Reload to reflect cleared state
          }
        }}
      >
        Reset All Data
      </button>
      </main>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select Activities for the Week</h3>
            <p className="modal-description">
              Choose activities you'd like to focus on this week. You can select multiple activities.
            </p>

            <div className="activity-options">
              {(allActivities[anxietyType] || []).map((activity, index) => (
                <div
                  key={index}
                  className={`activity-card ${selectedActivities.includes(activity) ? 'selected' : ''}`}
                  onClick={() => toggleActivity(activity)}
                >
                  {activity}
                </div>
              ))}
            </div>

            <button onClick={handleDone} className="modal-btn">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
