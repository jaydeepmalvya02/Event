const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const queryRoutes = require("./routes/queryRoutes");
const ytRoutes = require("./routes/ytRoutes");
const contactRoutes=require("./routes/contactRoutes")
const subscriberRoutes=require("./routes/subscriberRoutes")
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", userRoutes);
app.use("/api/query", queryRoutes);
app.use("/api", ytRoutes);
app.use('/api',contactRoutes)
app.use('/api',subscriberRoutes)

app.get("/", (req, res) => {
  res.json({ message: "This is API" });
});

// Connect to MongoDB before starting the server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(8000, () => {
      console.log("Server is running on http://localhost:8000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
