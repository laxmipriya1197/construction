import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("https://construction-dge4.onrender.com/services")
      .then(res => setServices(res.data.slice(0, 3)))
      .catch(err => console.error(err));
    
    axios.get("https://construction-dge4.onrender.com/projects")
      .then(res => setProjects(res.data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  const testimonials = [
    {
      name: "Aravind",
      text: "Mr. Engineer Vishnu exceeded our expectations with excellent engineering and beautiful interior work. His attention to detail and design sense made the project smooth and impressive. Highly recommended for quality service."
    },
    {
      name: "Pavithra",
      text: "Vishnu Builder made everything easy and delivered beyond expectations. Great quality, excellent service, and honest communication. Highly recommended!" },
    {
      name: "Indhumathi S",
      text: "Outstanding work by a professional and friendly team. Extremely happy with the final result. Highly recommended for any building work."},
    {
      name: "Vignesh LB",
      text: "Very supportive team who did a great job on my home alteration work. Easy to communicate and regular site visits made the process smooth. Will definitely come back for another project."},
    {
      name: "Sivaraj C",
      text: "A reliable team that understands our requirements and implements them accurately."},
    {
      name: "Gokul K",
      text: "Vishnu Builders gave a clear explanation of the project and provided the perfect plan for our plot."},
    {
      name: "INDER PACKS IP",
      text: "We approached them for machinery basement alteration work for our factory. Their planning, execution, and service quality were excellent." },
    {
      name: "Sri Abirami",
      text: "Amazing work that exceeded expectations with great service."  }
  ];

  return (
    <div className="home">
      
      <section className="hero-section hero-1">
        <div className="hero-content">
          <h1>We Engineer <br /> Your Dreams</h1>
          <Link to="/contact" className="cta-button">Get a Free Quote</Link>
        </div>
      </section>

      
      <section className="services-preview">
        <div className="container">
          <div className="services-grid">
            {services.length > 0 ? (
              services.map((service, index) => (
                <div key={service._id} className="service-card">
                  <div className="service-number">0{index + 1}</div>
                  <div className="service-icon-box">Icon Box</div>
                  <h3>{service.name}</h3>
                  <p>{service.description || "Professional construction services"}</p>
                </div>
              ))
            ) : (
              <>
                <div className="service-card">
                  <div className="service-number">01</div>
                  <div className="service-icon-box">Icon Box</div>
                  <h1>Residential Construction</h1>
                  <p>Build your dream home with our expert team, delivering top-notch residential construction services in Coimbatore, offering personalized and thoughtful designs that transform your vision into a captivating reality.</p>
                </div>
                <div className="service-card">
                  <div className="service-number">02</div>
                  <div className="service-icon-box">Icon Box</div>
                  <h1>Architectural Design</h1>
                  <p>Unlock the full potential of your project with our expert architects in Coimbatore. From concept to reality, we create exceptional spaces that blend creativity and functionality seamlessly. Your vision, our expertise - a perfect combination.</p>
                </div>
                <div className="service-card">
                  <div className="service-number">03</div>
                  <div className="service-icon-box">Icon Box</div>
                  <h1>Commercial Construction</h1>
                  <p>Elevate your business with functional and impressive commercial spaces, crafted by our experienced construction specialists, delivering innovative and functional designs for commercial spaces that leave a lasting impression.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

     
      <section className="about-section">
        <div className="container">
          <h2>ABOUT VISHNU BUILDERR</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Vishnu Builderr is a trusted construction company with 8 years of experience in construction and 15 years of experience in real estate, serving clients in and around Coimbatore. Our team of young and skilled professionals is passionate about creating modern, innovative, and aesthetically pleasing building designs. We are committed to turning your ideas into strong, durable, and lasting structures. With Vishnu Builders, you can expect quality, creativity, and excellence in every project.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <span className="feature-icon">
                    <img src="https://heraconstructions.com/assets/img/icon_box/home.svg" alt="icon" height={70}/>
                    </span>
                  <h4>Residential Building</h4>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">
                    <img src="https://heraconstructions.com/assets/img/icon_box/renovation.png" alt="icon" height={70} />
                  </span>
                  <h4>Renovation Works</h4>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">
                    <img src="https://heraconstructions.com/assets/img/icon_box/3d.svg" alt="icon" height={70} />
                  </span>
                  <h4>3D Designing</h4>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">
                    <img src="https://heraconstructions.com/assets/img/icon_box/commercial.png" alt="icon" height={70} />
                  </span>
                  <h4>Building Commercial Space</h4>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="placeholder-image">About Image</div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="statistics-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">📐</div>
              <h3>300+</h3>
              <p>Design Drawing</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">✅</div>
              <h3>30+</h3>
              <p>Project Completed</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">😊</div>
              <h3>30+</h3>
              <p>Happy clients</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏗️</div>
              <h3>5+</h3>
              <p>Project Running</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="gallery-preview">
        <div className="container">
          <h1>Gallery</h1>
          <h3>Project Gallery</h3>
          <p>Discover our Project Gallery, highlighting premium residential, commercial, and renovation projects that showcase our craftsmanship, creativity, and construction excellence.</p>
          
          <div className="gallery-grid">
            {projects.length > 0 ? (
              projects.slice(0, 3).map(project => (
                <div key={project._id} className="gallery-item">
                  <div className="gallery-image">
                    {project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : (
                      <div className="placeholder-image">Project Image</div>
                    )}
                  </div>
                  <h4>{project.title || "Project Title"}</h4>
                  <p>{project.location || "Location"}</p>
                  <button className="know-more-btn">Know more</button>
                </div>
              ))
            ) : (
              <p className="no-projects">No projects available yet</p>
            )}
          </div>
        </div>
      </section>

      
      <section className="testimonials-section">
        <div className="container">
          <h1>Trust</h1>
          <h3>What Our Clients Say</h3>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="why-choose-us">
        <div className="container">
          <h2>Latest</h2>
          <h3>Why Choose Us</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-image">
                <div className="placeholder-image">Expert Team</div>
              </div>
              <div className="feature-number">01</div>
              <h4>Expert Team</h4>
              <p>Our experienced team of architects, engineers, designers, and skilled professionals stays updated with the latest construction techniques to deliver the best results for every project.</p>
              <Link to="/services" className="more-details">More Details</Link>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <div className="placeholder-image">Best Quality</div>
              </div>
              <div className="feature-number">02</div>
              <h4>Best Quality</h4>
              <p>We use premium materials from trusted suppliers to build structures that last a lifetime.</p>
              <Link to="/services" className="more-details">More Details</Link>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <div className="placeholder-image">Delivery Timing</div>
              </div>
              <div className="feature-number">03</div>
              <h4>Delivery Timing</h4>
              <p>At Vishnu Builders, we respect your time—delivering quality projects right on schedule.</p>
              <Link to="/services" className="more-details">More Details</Link>
            </div>
          </div>
        </div>
      </section>

      
      <section className="cta-section">
        <div className="container">
          <h2>LET'S DISCUSS NEXT PROJECTS</h2>
          <p>
            At Vishnu Builders, we value collaboration and believe in turning your dreams into reality. 
            Whether it's your dream home, an inspiring commercial space, or a captivating renovation, 
            our expert team is eager to bring your vision to life. With 8 years of experience and a focus 
            on aesthetics and quality, we offer personalized solutions that cater to your unique needs. 
            Let's have a conversation about your next project - Contact us today and let the magic of construction begin!
          </p>
          <Link to="/contact" className="cta-button">Send Mail</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
