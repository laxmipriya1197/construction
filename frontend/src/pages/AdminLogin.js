import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/admin/login", data);
      localStorage.setItem("admin", "true");
      if (res.data.admin) {
        localStorage.setItem("adminData", JSON.stringify(res.data.admin));
      }
      alert("Admin login successful");
      navigate("/admin-dashboard");
    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>Admin Login</h2>

        <form onSubmit={loginAdmin}>
        <input
          placeholder="Username"
          value={data.username || ""}
          onChange={e => setData({ ...data, username: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password || ""}
          onChange={e => setData({ ...data, password: e.target.value })}
          required
        />

        <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
