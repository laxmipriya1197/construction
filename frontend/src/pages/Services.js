import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Services.css";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/services")
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  const defaultServices = [
    {
      name: "Residential Construction",
      description: "Build your dream home with our expert team, delivering top-notch residential construction services in Coimbatore, offering personalized and thoughtful designs that transform your vision into a captivating reality.",
      icon: "Icon Box"
    },
    {
      name: "Architectural Design",
      description: "Unlock the full potential of your project with our expert architects in Coimbatore. From concept to reality, we create exceptional spaces that blend creativity and functionality seamlessly. Your vision, our expertise - a perfect combination.",
      icon: "Icon Box"
    },
    {
      name: "Commercial Construction",
      description: "Elevate your business with functional and impressive commercial spaces, crafted by our experienced construction specialists, delivering innovative and functional designs for commercial spaces that leave a lasting impression.",
      icon: "Icon Box"
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="services-page">
      <div className="page-header">
        <h1>Our Services</h1>
        <p>Comprehensive construction and design solutions for your every need</p>
      </div>

      <div className="container">
        <div className="services-grid">
          {displayServices.map((service, index) => (
            <div key={service._id || index} className="service-card-detailed">
              <div className="service-number">0{index + 1}</div>
              <div className="service-icon-box">{service.icon || "Icon Box"}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <Link to="/contact" className="service-cta">Get a Free Quote - Click Here</Link>
            </div>
          ))}
        </div>

        <div className="services-cta-section">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today to discuss your construction needs and get a free quote.</p>
          <Link to="/contact" className="cta-button">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}

export default Services;
