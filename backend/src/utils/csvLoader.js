const axios = require("axios");
const csv = require("csv-parser");
const { Readable } = require("stream");

let sales = [];

async function loadCSVFromURL(csvUrl) {
  try {
    console.log("Fetching CSV from:", csvUrl);
    const res = await axios.get(csvUrl, { responseType: "arraybuffer" });

    const buffer = Buffer.from(res.data, "utf-8");
    const stream = Readable.from(buffer.toString());

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (row) => sales.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    console.log(`CSV loaded successfully. Total records: ${sales.length}`);
  } catch (error) {
    console.error("CSV load failed:", error.message);
  }
}

module.exports = { loadCSVFromURL, sales };
