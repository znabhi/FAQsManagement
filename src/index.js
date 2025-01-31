const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");
const faqRoutes = require("./routers/faqRouter");
const redis = require("ioredis");
const { sequelize } = require("./models");

const redisClient = new redis();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/faqs", faqRoutes);

// Export the app for testing
module.exports = app;

// Start server only if NOT in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
