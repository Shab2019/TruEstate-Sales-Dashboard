require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { loadSalesData } = require("./utils/csvLoader");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TruEstate Retail Sales Backend is running");
});

app.use("/api/sales", salesRoutes);

loadSalesData()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to load CSV. Server not started.", err);
    process.exit(1);
  });
