import { useEffect, useState } from "react";
import axios from "axios";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [displayCount, setDisplayCount] = useState(9);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.status === filter);

  const displayedProjects = filteredProjects.slice(0, displayCount);
  const hasMore = displayedProjects.length < filteredProjects.length;

  
  const defaultProjects = [
    { title: "Vishnu residence", description: "Luxury4BHK villa in Papampattipirivu", location: "coimbatore" },
    { title: "SDR residence ", description: "budget 4BHK villa in Bharathipuram", location: "Coimbatore" },
    { title: "Jawahar Mess Guddown", description: "3000sqft Commercial space in Bharathipuram", location: "coimbatore" },
    { title: "Aravind Residence", description: "Luxury 4BHK in veerapandi ", location: "Coimbatore" },
    { title: "Ramesh Residence", description: "Renovated 4BHK villa in Bharathipuram ", location: "Coimbatore" },
   
  ];

  const projectsToDisplay = displayedProjects.length > 0 ? displayedProjects : defaultProjects.slice(0, displayCount);

  const handleKnowMore = (project) => {
    setSelectedProject(project);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Gallery</h1>
        <h2>Project Gallery</h2>
        <p>Discover our Project Gallery, featuring the finest examples of our Residential Buildings, showcasing top-quality craftsmanship and innovative design</p>
        <p>Showcasing our best residential buildings and commercial projects, highlighting our expertise in construction and design.</p>
      </div>

      <div className="container">
     
        <div className="filter-buttons">
          <button 
            className={filter === "All" ? "active" : ""} 
            onClick={() => {
              setFilter("All");
              setDisplayCount(9);
            }}
          >
            All Projects
          </button>
          <button 
            className={filter === "Completed" ? "active" : ""} 
            onClick={() => {
              setFilter("Completed");
              setDisplayCount(9);
            }}
          >
            Completed projects
          </button>
          <button 
            className={filter === "Ongoing" ? "active" : ""} 
            onClick={() => {
              setFilter("Ongoing");
              setDisplayCount(9);
            }}
          >
            Ongoing projects
          </button>
        </div>

       
        <div className="projects-grid">
          {projectsToDisplay.map((project, index) => (
            <div key={project._id || index} className="project-card">
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="placeholder-image">Project Image</div>
                )}
              </div>
              <div className="project-info">
                <h4>{project.title || "Project Title"}</h4>
                <h5>{project.description || project.location || "Project description"}</h5>
                {project.location && (
                  <p className="project-location">{project.location}</p>
                )}
                <button className="know-more-btn" onClick={() => handleKnowMore(project)}>Know more</button>
              </div>
            </div>
          ))}
        </div>

       
        {hasMore && (
          <div className="show-more-container">
            <button 
              className="show-more-btn"
              onClick={() => setDisplayCount(displayCount + 9)}
            >
              Show More Project(s)
            </button>
          </div>
        )}
      </div>

      
      {isPanelOpen && selectedProject && (
        <>
          <div className="panel-overlay" onClick={handleClosePanel}></div>
          <div className="details-panel">
            <button className="close-btn" onClick={handleClosePanel}></button>
            <div className="panel-content">
              
              {selectedProject.image && (
                <div className="panel-image">
                  <img src={selectedProject.image} alt={selectedProject.title || "Project"} />
                </div>
              )}
              
              <div className="panel-details">
             
                <div className="detail-row">
                  <strong>Area (sq.ft):</strong> {selectedProject.area || "Not specified"}
                </div>
              
               
                <div className="detail-row">
                  <strong>Floors:</strong> {selectedProject.floors || "Not specified"}
                </div>
               
                <div className="detail-row">
                  <strong>Bedrooms:</strong> {selectedProject.bedrooms || "Not specified"}
                </div>
                
               
                <div className="detail-row">
                  <strong>Construction Year:</strong> {selectedProject.constructionYear || "Not specified"}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Projects;
