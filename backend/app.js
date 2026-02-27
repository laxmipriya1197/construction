const express = require("express");
const dotenv=require("dotenv")
const path=require("path")
dotenv.config({path:path.join(__dirname,"config","config.env")})
const cors = require("cors");
const connectDatabase =require("./config/connectDatabase")
const app = express();

app.use(cors());
connectDatabase()
app.use(express.json());


app.use("/admin", require("./routes/adminRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/services", require("./routes/serviceRoutes"));
app.use("/requirements", require("./routes/requirementRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
