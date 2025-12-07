const axios = require("axios");
const csv = require("csv-parser");
const { Readable } = require("stream");

let sales = [];

async function loadCSVFromURL(csvUrl) {
  try {
    const response = await axios.get(csvUrl, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data, "utf-8");
    const stream = Readable.from(buffer.toString());

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (row) => {
          sales.push(row);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    console.log(`CSV Loaded successfully. Total records: ${sales.length}`);
  } catch (error) {
    console.error("CSV load failed:", error);
  }
}

module.exports = { loadCSVFromURL, sales };
