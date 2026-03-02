import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RequirementForm.css";

function RequirementForm() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [form, setForm] = useState({
    siteMeasurement: "",
    houseType: "",
    budget: "",
    familyCount: "",
    hobbies: "",
    interiorStyle: "",
    siteVisitNeeded: false,
    waterTankLiters: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:5000/requirements", {
        ...form,
        userId: user._id,
        familyCount: parseInt(form.familyCount) || 0,
        waterTankLiters: parseInt(form.waterTankLiters) || 0
      });
      alert("Requirement submitted successfully!");
      setForm({
        siteMeasurement: "",
        houseType: "",
        budget: "",
        familyCount: "",
        hobbies: "",
        interiorStyle: "",
        siteVisitNeeded: false,
        waterTankLiters: ""
      });
    } catch (error) {
      alert("Error submitting requirement: " + (error.response?.data?.message || error.message));
    }
  };

  if (!user) {
    return (
      <div className="requirement-form-page">
        <div className="container">
          <div className="login-prompt">
            <h2>Please Login First</h2>
            <p>You need to be logged in to submit a requirement form.</p>
            <button onClick={() => navigate("/login")}>Go to Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="requirement-form-page">
      <div className="container">
        <div className="form-header">
          <h1>Requirement Form</h1>
          <p>Fill out the form below to submit your construction requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="requirement-form">
        
          <div className="form-group">
            <label htmlFor="siteMeasurement">Site Measurement</label>
            <input
              type="text"
              id="siteMeasurement"
              name="siteMeasurement"
              value={form.siteMeasurement}
              onChange={handleChange}
              placeholder="Enter site measurement details"
            />
          </div>

         
          <div className="form-group">
            <label>Types of House</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="houseType"
                  value="1BHK"
                  checked={form.houseType === "1BHK"}
                  onChange={handleChange}
                />
                <span>1BHK</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="houseType"
                  value="2BHK"
                  checked={form.houseType === "2BHK"}
                  onChange={handleChange}
                />
                <span>2BHK</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="houseType"
                  value="3BHK"
                  checked={form.houseType === "3BHK"}
                  onChange={handleChange}
                />
                <span>3BHK</span>
              </label>
            </div>
          </div>

        
          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="Enter your budget"
            />
          </div>

          
          <div className="form-group">
            <label htmlFor="familyCount">Family Count</label>
            <input
              type="number"
              id="familyCount"
              name="familyCount"
              value={form.familyCount}
              onChange={handleChange}
              placeholder="Number of family members"
              min="1"
            />
          </div>

       
          <div className="form-group">
            <label htmlFor="hobbies">Hobbies</label>
            <textarea
              id="hobbies"
              name="hobbies"
              value={form.hobbies}
              onChange={handleChange}
              placeholder="Tell us about your hobbies and interests"
              rows="3"
            />
          </div>

          
          <div className="form-group">
            <label>Interior Style</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="interiorStyle"
                  value="Modern"
                  checked={form.interiorStyle === "Modern"}
                  onChange={handleChange}
                />
                <span>Modern</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="interiorStyle"
                  value="Traditional"
                  checked={form.interiorStyle === "Traditional"}
                  onChange={handleChange}
                />
                <span>Traditional</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="interiorStyle"
                  value="Minimal"
                  checked={form.interiorStyle === "Minimal"}
                  onChange={handleChange}
                />
                <span>Minimal</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="interiorStyle"
                  value="Luxury"
                  checked={form.interiorStyle === "Luxury"}
                  onChange={handleChange}
                />
                <span>Luxury</span>
              </label>
            </div>
          </div>

        
          <div className="form-section">
            <h3>Material</h3>
            
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="siteVisitNeeded"
                  checked={form.siteVisitNeeded}
                  onChange={handleChange}
                />
                <span>Site visit needed</span>
              </label>
            </div>

           
            <div className="form-group">
              <label htmlFor="waterTankLiters">Water Tank Liters</label>
              <input
                type="number"
                id="waterTankLiters"
                name="waterTankLiters"
                value={form.waterTankLiters}
                onChange={handleChange}
                placeholder="Enter water tank capacity in liters"
                min="0"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit Requirement</button>
        </form>
      </div>
    </div>
  );
}

export default RequirementForm;
