const express = require("express");
const cors = require("cors");
const { loadCSVFromURL } = require("./utils/csvLoader");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
app.use(cors());

const CSV_URL = "https://we.tl/t-LPwR5KFqrF";

(async () => {
  await loadCSVFromURL(CSV_URL);
  console.log("CSV loaded, backend is ready to accept traffic");
})();

app.use("/api/sales", salesRoutes);

app.get("/", (_, res) => res.send("Backend Running ✓"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
