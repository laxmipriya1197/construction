const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Project = require("../models/Project");


dotenv.config({ path: path.join(__dirname, "../config/config.env") });


const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(" Database Connected Successfully!");
  } catch (error) {
    console.error(" Database Connection Error:", error.message);
    process.exit(1);
  }
};


const demoProjects = [
  {
    title: "Sivanesh Villa",
    description: "Luxury villa in goundampalayam",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    location: "Goundampalayam",
    category: "Residential",
    status: "Completed",
    area: "2500",
    floors: 2,
    bedrooms: 3,
    constructionYear: 2023
  },
  {
    title: "Vishnu Residence",
    description: "Ready to buy luxury villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    location: "Coimbatore",
    category: "Residential",
    status: "Completed",
    area: "3200",
    floors: 3,
    bedrooms: 4,
    constructionYear: 2024
  },
  {
    title: "Manish Villa",
    description: "Luxury villa to make your life comfortable",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    location: "Erode",
    category: "Residential",
    status: "Ongoing",
    area: "1800",
    floors: 1,
    bedrooms: 2,
    constructionYear: 2025
  },
  {
    title: "Manoj Residence",
    description: "Modern luxury villa with premium amenities",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800",
    location: "Coimbatore",
    category: "Residential",
    status: "Completed",
    area: "2800",
    floors: 2,
    bedrooms: 4,
    constructionYear: 2023
  },
  {
    title: "Imthiaz Villa",
    description: "We are the builders of your dream",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    location: "Coimbatore",
    category: "Residential",
    status: "Completed",
    area: "2200",
    floors: 2,
    bedrooms: 3,
    constructionYear: 2022
  }
];


const addDemoProjects = async () => {
  try {
    
    let addedCount = 0;
    let skippedCount = 0;

    for (const projectData of demoProjects) {
      
      const existing = await Project.findOne({ 
        title: projectData.title,
        location: projectData.location 
      });

      if (existing) {
        console.log(`  Project "${projectData.title}" already exists. Skipping...`);
        skippedCount++;
        continue;
      }

      const project = new Project(projectData);
      await project.save();
      console.log(` Project "${projectData.title}" added successfully!`);
      console.log(`    Location: ${projectData.location}`);
      console.log(`    Area: ${projectData.area} sq.ft`);
      console.log(`    Floors: ${projectData.floors}`);
      console.log(`     Bedrooms: ${projectData.bedrooms}`);
      console.log(`    Year: ${projectData.constructionYear}`);
      console.log("");
      addedCount++;
    }

    console.log("\n Summary:");
    console.log(`    Added: ${addedCount} projects`);
    console.log(`    Skipped: ${skippedCount} projects`);
    console.log(`    Total: ${demoProjects.length} projects processed`);

  } catch (error) {
    console.error(" Error adding demo projects:", error.message);
    process.exit(1);
  }
};


const main = async () => {
  console.log(" Starting Demo Projects Setup...\n");
  
 
  await connectDatabase();
  
  
  await addDemoProjects();
  
  
  await mongoose.connection.close();
  console.log("\n Database connection closed.");
  console.log("\n Now you can:");
  console.log("   1. Go to /projects page to see the projects");
  console.log("   2. Click 'Know more' on any project to see details in slide-in panel");
  console.log("   3. Login as admin to edit/add more projects\n");
  process.exit(0);
};

t
main().catch((error) => {
  console.error(" Unexpected error:", error);
  process.exit(1);
});


