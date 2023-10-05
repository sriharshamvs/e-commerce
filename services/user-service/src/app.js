const express = require("express");
const testRoute = require("./routes/testRoute");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/api", testRoute);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app;
