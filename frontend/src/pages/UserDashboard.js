import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios.get(`https://construction-dge4.onrender.com/api/requirements/user/${user._id}`)
      .then(res => setRequirements(res.data))
      .catch(err => console.error(err));
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="user-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user.name}</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <div className="dashboard-content">
         
          <div className="dashboard-section">
            <h2>Quick Actions</h2>
            <div className="action-cards">
              <Link to="/requirement" className="action-card">
                <div className="action-icon">📋</div>
                <h3>Requirement Form</h3>
                <p>Submit your construction requirements</p>
              </Link>
              <Link to="/requirement" className="action-card">
                <div className="action-icon">📏</div>
                <h3>Site Measurement Form</h3>
                <p>Submit site measurement details</p>
              </Link>
            </div>
          </div>

         
          <div className="dashboard-section">
            <h2>Your Submitted Requirements</h2>
            {requirements.length > 0 ? (
              <div className="requirements-list">
                {requirements.map(req => (
                  <div key={req._id} className="requirement-card">
                    <div className="requirement-header">
                      <h3>Requirement #{requirements.indexOf(req) + 1}</h3>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                        <span className={`status-badge ${req.status === "confirmed" ? "confirmed" : "pending"}`}>
                          Status: {req.status || "pending"}
                        </span>
                        <span className="requirement-date">
                          {new Date(req.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="requirement-details">
                      <div className="detail-item">
                        <strong>House Type:</strong> {req.houseType || "Not specified"}
                      </div>
                      <div className="detail-item">
                        <strong>Budget:</strong> {req.budget || "Not specified"}
                      </div>
                      <div className="detail-item">
                        <strong>Family Count:</strong> {req.familyCount || "Not specified"}
                      </div>
                      <div className="detail-item">
                        <strong>Interior Style:</strong> {req.interiorStyle || "Not specified"}
                      </div>
                      {req.siteMeasurement && (
                        <div className="detail-item">
                          <strong>Site Measurement:</strong> {req.siteMeasurement}
                        </div>
                      )}
                      {req.hobbies && (
                        <div className="detail-item">
                          <strong>Hobbies:</strong> {req.hobbies}
                        </div>
                      )}
                      {req.siteVisitNeeded && (
                        <div className="detail-item">
                          <strong>Site Visit:</strong> Required
                        </div>
                      )}
                      {req.waterTankLiters && (
                        <div className="detail-item">
                          <strong>Water Tank:</strong> {req.waterTankLiters} liters
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-requirements">
                <p>You haven't submitted any requirements yet.</p>
                <Link to="/requirement" className="cta-button">Submit Your First Requirement</Link>
              </div>
            )}
          </div>

         
          <div className="dashboard-section">
            <h2>Profile Information</h2>
            <div className="profile-info">
              <div className="info-item">
                <strong>Name:</strong> {user.name}
              </div>
              <div className="info-item">
                <strong>Email:</strong> {user.email}
              </div>
              {user.phone && (
                <div className="info-item">
                  <strong>Phone:</strong> {user.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
