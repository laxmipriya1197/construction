import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/users/login", data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/user-dashboard");
      } else {
        await axios.post("http://localhost:5000/users/register", data);
        alert("Registration successful! Please login.");
        setIsLogin(true);
        setData({});
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
      <h2>{isLogin ? "User Login" : "User Registration"}</h2>
      {error && <div style={{color: "red", marginBottom: "1rem"}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input 
            placeholder="Name" 
            value={data.name || ""}
            onChange={e => setData({...data, name: e.target.value})}
            required
          />
        )}
        <input 
          type="email"
          placeholder="Email" 
          value={data.email || ""}
          onChange={e => setData({...data, email: e.target.value})}
          required
        />
        {!isLogin && (
          <input 
            placeholder="Phone" 
            value={data.phone || ""}
            onChange={e => setData({...data, phone: e.target.value})}
          />
        )}
        <input 
          type="password" 
          placeholder="Password" 
          value={data.password || ""}
          onChange={e => setData({...data, password: e.target.value})}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p style={{textAlign: "center", marginTop: "1rem"}}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setData({});
          }}
          style={{
            background: "none",
            border: "none",
            color: "#1a1a2e",
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
      </div>
    </div>
  );
}

export default Login;
