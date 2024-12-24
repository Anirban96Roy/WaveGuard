// Components/NotificationList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { data } = await axios.get('/notifications', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  const handleNotificationResponse = async (notificationId, approved) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post(
        '/notifications/rescue-response',
        { notificationId, approved },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (approved) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error responding to notification:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.put(
        `/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`notification-item ${!notification.read ? 'unread' : ''}`}
              onClick={() => markAsRead(notification._id)}
            >
              <p>{notification.message}</p>
              <span className="notification-time">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
              {notification.type === 'RESCUE_REQUEST' && (
                <div className="notification-actions">
                  <button
                    onClick={() => handleNotificationResponse(notification._id, true)}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleNotificationResponse(notification._id, false)}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;