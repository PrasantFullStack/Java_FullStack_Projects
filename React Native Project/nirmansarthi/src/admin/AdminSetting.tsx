import { useState } from "react";
import "./AdminSettings.css";

// Admin Settings Page
export default function AdminSettings() {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@email.com");
  const [notifications, setNotifications] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
// const navigate = useNavigate();
  const handleSave = () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({
      name,
      email,
      notifications,
      password,
    });

    alert("Settings Saved");
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-card">
        <h2>Admin Settings</h2>

        {/* Profile */}
        <div className="section">
          <h4>Profile Info</h4>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        {/* Password */}
        <div className="section">
          <h4>Change Password</h4>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>

        {/* Preferences */}
        <div className="section row">
          <span>Enable Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>

        <button className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}
