import { useState } from "react";
// import axios from "axios";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with us for your construction needs</p>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            
            <div className="info-section">
              <h3>Email Address</h3>
              <p>vishnubuilderr@gmail.com</p>
            </div>

            <div className="info-section">
              <h3>Phone Numbers</h3>
              <p>📞 9566714471</p>
              <p>📞 6383283321</p>
            </div>

            <div className="info-section">
              <h3>Office Address</h3>
              <p>
                Popular Garden,Papampattipirivu Rd,near Baby Sweets,Bharathipuram,<br />
                Coimbatore, Tamil Nadu 641103
              </p>
            </div>

            <div className="info-section">
              <h3>Business Hours</h3>
              <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

         
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>

        {/* CTA Section */}
        <div className="contact-cta">
          <h2>Ready to Build Your Dream?</h2>
          <p>Let's discuss your next project and turn your vision into reality.</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
