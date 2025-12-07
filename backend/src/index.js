const express = require("express");
const cors = require("cors");
const { loadCSVFromURL } = require("./utils/csvLoader");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
app.use(cors());

const CSV_URL = "https://drive.google.com/uc?export=download&id=1SEuCFRU0BTgfJRj-G7V6Bam3Cs3p2dJJ";

loadCSVFromURL(CSV_URL).then(() => {
  console.log("CSV file loaded via Google Drive");
});

app.use("/api/sales", salesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
