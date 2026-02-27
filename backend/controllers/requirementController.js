const Requirement = require("../models/Requirement");
const User = require("../models/User");
const sendMail = require("../utils/mailer");

exports.addRequirement = async (req, res) => {
  try {
    const requirement = new Requirement(req.body);
    await requirement.save();

    let user = null;
    if (req.body.userId) {
      user = await User.findById(req.body.userId);
    }

    try {
      const subject = "New Requirement Submitted";

      const lines = [
        `User: ${user?.name || "Unknown"}`,
        `Email: ${user?.email || "Unknown"}`,
        `Phone: ${user?.phone || "Unknown"}`,
        `House Type: ${requirement.houseType || "-"}`,
        `Budget: ${requirement.budget || "-"}`,
        `Family Count: ${requirement.familyCount ?? "-"}`,
        `Interior Style: ${requirement.interiorStyle || "-"}`,
        `Site Measurement: ${requirement.siteMeasurement || "-"}`,
        `Site Visit Needed: ${requirement.siteVisitNeeded ? "Yes" : "No"}`,
        `Water Tank Liters: ${requirement.waterTankLiters ?? "-"}`,
      ];

      // ✅ Mail to Vishnu Builder
      await sendMail(
        "vishnubuilderr@gmail.com",
        subject,
        lines.join("\n")
      );
    } catch (err) {
      console.error("Admin mail error:", err);
    }

    res.json({ message: "Requirement submitted successfully", requirement });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRequirements = async (req, res) => {
  try {
    const data = await Requirement.find().populate("userId");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRequirementById = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id).populate("userId");
    if (!requirement) {
      return res.status(404).json({ message: "Requirement not found" });
    }
    res.json(requirement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find({ userId: req.params.userId });
    res.json(requirements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!requirement) {
      return res.status(404).json({ message: "Requirement not found" });
    }

    
    if (req.body.status === "confirmed") {
      try {
        const user = await User.findById(requirement.userId);

        if (user && user.email) {
          const text = `Dear ${user.name},

Your requirement regarding ${requirement.houseType || "your project"} has been CONFIRMED by Vishnu Builder team.

We will contact you shortly.

Thank you,
Vishnu Builder`;

          await sendMail(user.email, "Requirement Confirmed", text);
        }
      } catch (err) {
        console.error("User confirmation mail error:", err);
      }
    }

    res.json({ message: "Requirement updated successfully", requirement });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findByIdAndDelete(req.params.id);
    if (!requirement) {
      return res.status(404).json({ message: "Requirement not found" });
    }
    res.json({ message: "Requirement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};