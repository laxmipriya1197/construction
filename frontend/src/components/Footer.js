import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>VISHNU BUILDERS</h3>
          <p>Your Trusted Destination for Building Your Dream Home in Tamil Nadu. With 8 Years of Excellence, We Ensure Innovation, Aesthetics, and Reliability for Your Perfect Living Space.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📞 9566714471</p>
          <p>📞 6383283321</p>
          <p>✉️ vishnubuilderr@gmail.com</p>
        </div>
        <div className="footer-section">
          <h4>Office Address</h4>
          <p>Popular Garden,Papampattipirivu Rd,near Baby Sweets,Bharathipuram
                <br />Coimbatore, Tamil Nadu 641103</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Vishnu Builderr 2022. All Rights Reserved</p>
       
      </div>
    </footer>
  );
}

export default Footer;
