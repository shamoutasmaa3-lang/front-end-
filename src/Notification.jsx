import { useState, useEffect } from "react";
import Sidebar from "./Components/SideBar";
import "./notification.css";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/notifications");
      const data = await res.json();
      setNotifications(data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

 
  const markAsRead = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/notifications/${id}/read`, {
        method: "POST",
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  
  const markAllAsRead = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/notifications/read-all", {
        method: "POST",
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };


  return (
    <div className="notifications-app">
      <Sidebar />

      <div className="notifications-main">
        {/* Header*/}
        <div className="notifications-header-row">
          <div className="header-left">
            <h1>Notification</h1>
            <h4>stay updated with important alerts and system updates.</h4>
          </div>

         
          <button onClick={markAllAsRead} className="mark-all-btn">
            <i className="fa-regular fa-circle-check"></i>
            Mark all as read
          </button>
        </div>

     
        <div className="notifications-list">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="empty">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${
                  !notification.is_read ? "unread" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <h2>{notification.title}</h2>
                <p>{notification.message}</p>
                <div className="date">{notification.date}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}