const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const port = process.version.PORT || 8090;
const app = express();


// Define the User model (assuming it has fields like 'name', 'email', etc.)
const User = require("./model/user");

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (include the database name in the connection URL)
mongoose.connect("mongodb://localhost:27017/nishantolololk", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database Connected");
})
.catch((e) => {
  console.error("Database Can't Be Connected", e);
});

// Define a route to serve the createacc.html file
app.get("/", (req, res) => {
  let createAccHtml = fs.readFileSync("login.html", "utf8");
  res.send(createAccHtml);
});

// Define a route to handle form submission
app.post("/", async (req, res) => {
  try {
    // Create a new User instance with data from the request body
    const userData = new User(req.body);
    await userData.save();
    console.log("User saved successfully");
    let submitHtml = fs.readFileSync("index.html", "utf8");
    res.send(submitHtml);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error saving user");
  }
});

// Start the server
app.listen(port, () => {
  console.log("App Running on port:", port);
});