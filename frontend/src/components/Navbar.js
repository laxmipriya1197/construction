import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = localStorage.getItem("admin");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            
            VISHNU BUILDERR
          </Link>
        </div>
        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
          <Link to="/services" onClick={() => setIsMenuOpen(false)}>SERVICES</Link>
          <Link to="/projects" onClick={() => setIsMenuOpen(false)}>PROJECTS</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
          {user ? (
            <Link to="/user-dashboard" onClick={() => setIsMenuOpen(false)}>DASHBOARD</Link>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>USER LOGIN</Link>
          )}
          {admin ? (
            <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)}>ADMIN</Link>
          ) : (
            <Link to="/admin-login" onClick={() => setIsMenuOpen(false)}>ADMIN</Link>
          )}
        </div>
        <div className={`navbar-toggle ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
