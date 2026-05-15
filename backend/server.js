const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FundForge AI Backend is running",
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
app.use("/api/campaigns", require("./routes/campaignRoutes"));
app.use("/api/sponsors", require("./routes/sponsorRoutes"));
app.use("/api/proposals", require("./routes/proposalRoutes"));
app.use("/api/emails", require("./routes/emailRoutes"));
app.use("/api/webhooks", require("./routes/webhookRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
// Routes will be added later
// app.use("/api/campaigns", require("./routes/campaignRoutes"));
// app.use("/api/sponsors", require("./routes/sponsorRoutes"));
// app.use("/api/proposals", require("./routes/proposalRoutes"));
// app.use("/api/emails", require("./routes/emailRoutes"));
// app.use("/api/webhooks", require("./routes/webhookRoutes"));
// app.use("/api/reports", require("./routes/reportRoutes"));

// 404 route
app.use((req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` FundForge AI server running on port ${PORT}`);
});