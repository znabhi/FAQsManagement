const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");
const faqRoutes = require("./routers/faqRouter");
const redis = require("ioredis");
const redisClient = new redis();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("frontend")); // Serve frontend files

app.use("/api/v1/faqs", faqRoutes);

module.exports = app;

// Start server only if NOT in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
