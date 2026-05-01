import { useContext, useState } from "react";
import { User } from "./Context/UserContext";
import "./Profile.css";
import SideBar from "./Components/SideBar";


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
  const { user } = useContext(User);

  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");

  function saveData() {
    console.log({ phone, birth });
  }

  return (
    <div className="layout">
      <SideBar />

      <div className="profile-page">
        <h1>My Profile</h1>
        <p className="subtitle">
          Manage your account information and setting
        </p>

        <div className="profile-grid">

          
          <div className="card profile-card">
            <div className="avatar"></div>

            <h2>{user?.name || "User Name"}</h2>
            <p className="email">{user?.email || "email@gmail.com"}</p>

            <span className="role">Patient</span>

            <hr />

            <p>
              <img src={phoneIcon} alt="" /> +963 xxx xxx xxx
            </p>

            <p>
              <img src={calendarIcon} alt="" /> joined on May 10,2026
            </p>

            <p>
              <img src={securityIcon} alt="" /> Patient account
            </p>

            <button className="edit-btn">
              Edit Profile
            </button>
          </div>

          
          <div className="card">
            <h3>
              <img src={nameIcon} alt="" /> Personal Information
            </h3>

            <label>Full Name</label>
            <input value={user?.name || ""} readOnly />

            <label>Email Address</label>
            <input value={user?.email || ""} readOnly />

            <label>Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+963 xxx xxx xxx"
            />

            <label>Date Of Birth</label>
            <input
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              placeholder="5/7/1999"
            />

            <button className="save-btn" onClick={saveData}>
              save change
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
                <img src={doorbellIcon} alt="" /> Notification setting
              </h3>

              <div className="toggle-row">
                <span>Notification Reminders</span>
                <div className="toggle active"></div>
              </div>

              <div className="toggle-row">
                <span>Promotions & Offers</span>
                <div className="toggle"></div>
              </div>

              <div className="toggle-row">
                <span>Health Tips & News</span>
                <div className="toggle active"></div>
              </div>
            </div>
          </div>

        </div>

        
        <div className="logout">
          <img src={logoutIcon} alt="" />
          <div>
            <h3>Log Out</h3>
            <p>sign out from your account</p>
          </div>
        </div>
      </div>
    </div>
  );
}