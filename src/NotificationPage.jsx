import { useState } from 'react';
import Sidebar from './Sidebar';
import './NotificationPage.css';

const notificationsData = [
  {
    id: 1,
    title: '🎉 Activity Completed',
    message: 'You successfully completed your journal today.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    title: '📝 New Entry Reminder',
    message: 'Don’t forget to write in your journal today.',
    time: 'Today, 8:00 AM',
    read: true,
  },
  {
    id: 3,
    title: '🔔 Weekly Summary',
    message: 'Your weekly mental wellness summary is ready.',
    time: 'Yesterday, 9:45 PM',
    read: true,
  },
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications =
    filter === 'All'
      ? notifications
      : notifications.filter((n) =>
          filter === 'Unread' ? !n.read : n.read
        );

  return (
    <div className="notification-layout">
      <Sidebar />

      <div className="notification-page">
        <h2 className="notif-header">Notifications</h2>

        <div className="notif-controls">
          <select className="notif-filter" value={filter} onChange={handleFilterChange}>
            <option>All</option>
            <option>Unread</option>
            <option>Read</option>
          </select>
          <button className="clear-btn" onClick={handleClearAll}>Clear All</button>
        </div>

        <div className="notification-list">
          {filteredNotifications.length === 0 ? (
            <p className="no-notifs">No notifications to display.</p>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`notification-card ${notif.read ? '' : 'unread'}`}
              >
                <div className="notif-title">{notif.title}</div>
                <div className="notif-message">{notif.message}</div>
                <div className="notif-time">{notif.time}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
