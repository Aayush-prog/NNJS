const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");
require("dotenv").config();

// Routes

// Models

// Initialize Express
const app = express();

// Middleware
app.use(cors("*"));
app.use(express.json());
// app.use(
//   "/images",
//   express.static(path.join(__dirname, "public/profile-pictures"))
// );
// Database Connection
mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => console.log("mongo connected"))
  .catch((e) => console.log(e));

// Routes

// Start the server
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
