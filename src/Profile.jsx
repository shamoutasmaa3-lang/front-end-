import "./Profile.css";
import SideBar from "./components/SideBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import profileIcon from "./assets/Profile.png";
import nameIcon from "./assets/Name.png";
import shieldIcon from "./assets/Shield.png";
import securityIcon from "./assets/Security.png";
import logoutIcon from "./assets/Logout.png";
import calendarIcon from "./assets/Calendar.png";
import phoneIcon from "./assets/Phone.png";
import doorbellIcon from "./assets/Doorbell.png";
import backIcon from "./assets/Back.png";

export default function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");

  
  const [reminders, setReminders] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [tips, setTips] = useState(true);

  
  const role = user && user.role;

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);

        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setBirth(data.birth || "");

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        birth,
      }),
    });

    alert("Profile updated!");
  };

  
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      navigate("/");

    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  if (loading) {
    return <div style={{ padding: "30px" }}>Loading profile...</div>;
  }

  return (
    <div className="layout">

      <SideBar />

      <div className="profile-page">

        <h1>My Profile</h1>
        <p className="subtitle">
          Manage your account information and settings
        </p>

        <div className="profile-grid">

         
          <div className="card profile-card">
            <img src={profileIcon} alt="profile" className="avatar" />

            <h2>{name}</h2>
            <p className="email">{email}</p>

            <span className="role">
              {role === "doctor"
                ? "Doctor"
                : role === "pharmacist"
                ? "Pharmacist"
                : "Patient"}
            </span>

            <hr />

            <div className="info-list">

              <div className="info-item">
                <img src={phoneIcon} alt="" />
                <span>{phone || "+963 xxx xxx xxx"}</span>
              </div>

              <div className="info-item">
                <img src={calendarIcon} alt="" />
                <span>Joined {user && user.createdAt ? user.createdAt : "May 10, 2026"}</span>
              </div>

              <div className="info-item">
                <img src={securityIcon} alt="" />
                <span>Patient Account</span>
              </div>

            </div>

            <button className="edit-btn">Edit Profile</button>
          </div>

          
          <div className="card">

            <div className="card-title">
              <img src={nameIcon} alt="" />
              <h3>Personal Information</h3>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Date Of Birth</label>
              <input value={birth} onChange={(e) => setBirth(e.target.value)} />
            </div>

            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>

          </div>

         
          <div className="right-column">

            <div className="card small">
              <h3>
                <img src={shieldIcon} alt="" /> Account Security
              </h3>

              <div className="row">
                <div>
                  <h4>Change Password</h4>
                  <p>Update your password</p>
                </div>

                <img src={backIcon} alt="" className="arrow" />
              </div>
            </div>

            <div className="card small">
              <h3>
                <img src={doorbellIcon} alt="" /> Notifications
              </h3>

              <div className="toggle-row" onClick={() => setReminders(!reminders)}>
                <span>Reminders</span>
                <div className={`toggle ${reminders ? "active" : ""}`}></div>
              </div>

              <div className="toggle-row" onClick={() => setPromotions(!promotions)}>
                <span>Promotions</span>
                <div className={`toggle ${promotions ? "active" : ""}`}></div>
              </div>

              <div className="toggle-row" onClick={() => setTips(!tips)}>
                <span>Health Tips</span>
                <div className={`toggle ${tips ? "active" : ""}`}></div>
              </div>

            </div>

          </div>

        </div>

        
        <div className="logout" onClick={handleLogout}>
          <img src={logoutIcon} alt="" />
          <div>
            <h3>Log Out</h3>
            <p>Sign out from your account</p>
          </div>
        </div>

      </div>
    </div>
  );
}