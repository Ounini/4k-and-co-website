require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const PORT = 2468;

// Connect to database or MongoDB  // local
mongoose
  .connect("mongodb://localhost:27017/myFirstDB")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next(); // move to next handler
});

// router
const userRoute = require("./routes/userRoutes");

app.use("/users", userRoute);

// setting up a server
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
