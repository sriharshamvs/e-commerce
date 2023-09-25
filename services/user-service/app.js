const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/users", authRoutes);
app.use("/users", userRoutes);

module.exports = app;
