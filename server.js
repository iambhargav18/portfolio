const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (FIXED)
mongoose.connect("mongodb://bhargavvictus_db_user:LwercgHwUErGxnQb@ac-slfbdfp-shard-00-00.vwinmbg.mongodb.net:27017,ac-slfbdfp-shard-00-01.vwinmbg.mongodb.net:27017,ac-slfbdfp-shard-00-02.vwinmbg.mongodb.net:27017/?ssl=true&replicaSet=atlas-oxejy3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// Model
const Contact = mongoose.model("Contact", ContactSchema);

// Route
app.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.send("Message saved successfully");
  } catch (err) {
    res.status(500).send("Error saving data");
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});