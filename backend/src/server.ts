import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fragranceRoutes from "./routes/fragranceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:4173",
    ],
  })
);
app.use(express.json());

app.use("/api/fragrance", fragranceRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
