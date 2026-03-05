const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });
const cors = require("cors");
const connectDatabase = require("./config/connectDatabase");
const app = express();

app.use(cors());
connectDatabase();
app.use(express.json());

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/requirements", require("./routes/requirementRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});