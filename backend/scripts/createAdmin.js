const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Admin = require("../models/Admin");


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


const createAdmin = async (username, password) => {
  try {
    
    const existingAdmin = await Admin.findOne({ username });
    
    if (existingAdmin) {
      console.log(`  Admin with username "${username}" already exists!`);
      console.log("   Updating password...");
      
      existingAdmin.password = password;
      await existingAdmin.save();
      console.log(` Admin "${username}" password updated successfully!`);
    } else {
      
      const admin = new Admin({
        username,
        password
      });
      
      await admin.save();
      console.log(` Admin "${username}" created successfully!`);
    }
    
    console.log("\n Admin Details:");
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);
    console.log("\n  Note: Password is stored in plain text (as per requirements)");
    
  } catch (error) {
    console.error(" Error creating admin:", error.message);
    process.exit(1);
  }
};


const main = async () => {
 
  const args = process.argv.slice(2);
  
  let username, password;
  
  if (args.length >= 2) {
    
    username = args[0];
    password = args[1];
  } else if (args.length === 1) {
    
    username = args[0];
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    password = await new Promise((resolve) => {
      rl.question("Enter password: ", (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  } else {
    
    username = "admin";
    password = "admin123";
    console.log(" No arguments provided. Using default credentials:");
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);
    console.log("\n Usage: node scripts/createAdmin.js <username> <password>");
    console.log("   Example: node scripts/createAdmin.js admin mypassword\n");
  }
  
 
  if (!username || !password) {
    console.error(" Error: Username and password are required!");
    process.exit(1);
  }
  
  if (username.length < 3) {
    console.error(" Error: Username must be at least 3 characters long!");
    process.exit(1);
  }
  
  if (password.length < 3) {
    console.error(" Error: Password must be at least 3 characters long!");
    process.exit(1);
  }
  
  await connectDatabase();
  
  
  await createAdmin(username, password);
  

  await mongoose.connection.close();
  console.log("\n Database connection closed.");
  process.exit(0);
};


main().catch((error) => {
  console.error(" Unexpected error:", error);
  process.exit(1);
});



