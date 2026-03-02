import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("admin");
  
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchData = useCallback(() => {
    if (activeTab === "projects") {
      axios.get("http://localhost:5000/projects")
        .then(res => setProjects(res.data))
        .catch(err => console.error(err));
    } else if (activeTab === "services") {
      axios.get("http://localhost:5000/services")
        .then(res => setServices(res.data))
        .catch(err => console.error(err));
    } else if (activeTab === "requirements") {
      axios.get("http://localhost:5000/requirements")
        .then(res => setRequirements(res.data))
        .catch(err => console.error(err));
    } else if (activeTab === "users") {
      axios.get("http://localhost:5000/users")
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }
  }, [activeTab]);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin-login");
      return;
    }
    fetchData();
  }, [isAdmin, navigate, fetchData]);

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`http://localhost:5000/${type}/${id}`);
      alert("Deleted successfully");
      fetchData();
    } catch (error) {
      alert("Error deleting: " + (error.response?.data?.message || error.message));
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`http://localhost:5000/requirements/${id}`, { status: "confirmed" });
      alert("Requirement confirmed successfully");
      fetchData();
    } catch (error) {
      alert("Error confirming: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setFormData(item);
  };

  const handleSave = async () => {
    try {
      const { type, _id } = editingItem;
      if (_id) {
        await axios.put(`http://localhost:5000/${type}/${_id}`, formData);
        alert("Updated successfully");
      } else {
        await axios.post(`http://localhost:5000/${type}`, formData);
        alert("Added successfully");
      }
      setEditingItem(null);
      setFormData({});
      fetchData();
    } catch (error) {
      alert("Error saving: " + (error.response?.data?.message || error.message));
    }
  };

  const handleAddNew = (type) => {
    setEditingItem({ type, _id: null });
    setFormData({});
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  if (!isAdmin) return null;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        
        <div className="admin-tabs">
          <button 
            className={activeTab === "projects" ? "active" : ""}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
          <button 
            className={activeTab === "services" ? "active" : ""}
            onClick={() => setActiveTab("services")}
          >
            Services
          </button>
          <button 
            className={activeTab === "requirements" ? "active" : ""}
            onClick={() => setActiveTab("requirements")}
          >
            Requirements
          </button>
          <button 
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </div>

       
        {activeTab === "projects" && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Manage Projects</h2>
              <button onClick={() => handleAddNew("projects")} className="add-btn">Add Project</button>
            </div>
            
            {editingItem && editingItem.type === "projects" && (
              <div className="edit-form">
                <h3>{editingItem._id ? "Edit" : "Add"} Project</h3>
                <input
                  placeholder="Title"
                  value={formData.title || ""}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
                <input
                  placeholder="Description"
                  value={formData.description || ""}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
                <input
                  placeholder="Image URL"
                  value={formData.image || ""}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
                <input
                  placeholder="Location"
                  value={formData.location || ""}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
                <select
                  value={formData.category || "Residential"}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <select
                  value={formData.status || "Completed"}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
                <input
                  type="text"
                  placeholder="Area (sq.ft)"
                  value={formData.area || ""}
                  onChange={e => setFormData({...formData, area: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Floors"
                  value={formData.floors || ""}
                  onChange={e => setFormData({...formData, floors: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Bedrooms"
                  value={formData.bedrooms || ""}
                  onChange={e => setFormData({...formData, bedrooms: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Construction Year"
                  value={formData.constructionYear || ""}
                  onChange={e => setFormData({...formData, constructionYear: e.target.value})}
                />
                <div className="form-actions">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingItem(null)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="items-grid">
              {projects.map(project => (
                <div key={project._id} className="item-card">
                  {project.image && <img src={project.image} alt={project.title} />}
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p><strong>Location:</strong> {project.location}</p>
                  <p><strong>Category:</strong> {project.category}</p>
                  <p><strong>Status:</strong> {project.status}</p>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(project, "projects")}>Edit</button>
                    <button onClick={() => handleDelete(project._id, "projects")} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {activeTab === "services" && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Manage Services</h2>
              <button onClick={() => handleAddNew("services")} className="add-btn">Add Service</button>
            </div>
            
            {editingItem && editingItem.type === "services" && (
              <div className="edit-form">
                <h3>{editingItem._id ? "Edit" : "Add"} Service</h3>
                <input
                  placeholder="Name"
                  value={formData.name || ""}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                <textarea
                  placeholder="Description"
                  value={formData.description || ""}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows="3"
                />
                <input
                  placeholder="Icon (emoji or text)"
                  value={formData.icon || ""}
                  onChange={e => setFormData({...formData, icon: e.target.value})}
                />
                <input
                  placeholder="Image URL"
                  value={formData.image || ""}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
                <div className="form-actions">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingItem(null)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="items-grid">
              {services.map(service => (
                <div key={service._id} className="item-card">
                  <div className="service-icon-large">{service.icon || "🏗️"}</div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(service, "services")}>Edit</button>
                    <button onClick={() => handleDelete(service._id, "services")} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {activeTab === "requirements" && (
          <div className="admin-section">
            <h2>Manage Requirements</h2>
            <div className="requirements-list">
              {requirements.map((req, index) => (
                <div key={req._id} className="requirement-card">
                  <div className="requirement-header">
                    <h3>Requirement #{index + 1} from {req.userId?.name || "Unknown User"}</h3>
                    <div className="requirement-status">
                      <span className={`status-badge ${req.status === "confirmed" ? "confirmed" : "pending"}`}>
                        Status: {req.status || "pending"}
                      </span>
                    </div>
                  </div>
                  <div className="requirement-details">
                    <p><strong>User Name:</strong> {req.userId?.name || "Unknown"}</p>
                    <p><strong>Email:</strong> {req.userId?.email || "Unknown"}</p>
                    <p><strong>Phone:</strong> {req.userId?.phone || "Unknown"}</p>
                    <p><strong>House Type:</strong> {req.houseType || "Not specified"}</p>
                    <p><strong>Budget:</strong> {req.budget || "Not specified"}</p>
                    <p><strong>Family Count:</strong> {req.familyCount || "Not specified"}</p>
                    <p><strong>Interior Style:</strong> {req.interiorStyle || "Not specified"}</p>
                    {req.siteMeasurement && <p><strong>Site Measurement:</strong> {req.siteMeasurement}</p>}
                    {req.hobbies && <p><strong>Hobbies:</strong> {req.hobbies}</p>}
                    {req.siteVisitNeeded && <p><strong>Site Visit:</strong> Required</p>}
                    {req.waterTankLiters && <p><strong>Water Tank:</strong> {req.waterTankLiters} liters</p>}
                  </div>
                  <div className="item-actions">
                    {req.status !== "confirmed" && (
                      <button 
                        onClick={() => handleConfirm(req._id)} 
                        className="confirm-btn"
                      >
                        Confirm
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(req._id, "requirements")} 
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="admin-section">
            <h2>Manage Users</h2>
            {editingItem && editingItem.type === "users" && (
              <div className="edit-form">
                <h3>Edit User</h3>
                <input
                  placeholder="Name"
                  value={formData.name || ""}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                <input
                  placeholder="Email"
                  value={formData.email || ""}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <input
                  placeholder="Phone"
                  value={formData.phone || ""}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
                <div className="form-actions">
                  <button onClick={handleSave}>Update</button>
                  <button onClick={() => setEditingItem(null)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="users-list">
              {users.map((user, index) => (
                <div key={user._id} className="user-card">
                  <h3>User #{index + 1}: {user.name}</h3>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(user, "users")}>Update</button>
                    <button onClick={() => handleDelete(user._id, "users")} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;