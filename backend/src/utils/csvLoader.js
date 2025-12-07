const https = require("https");
const csv = require("csv-parser");

let sales = [];

function loadCSVFromURL(csvUrl) {
  return new Promise((resolve, reject) => {
    https.get(csvUrl, (res) => {
      res
        .pipe(csv())
        .on("data", (row) => {
          sales.push(row);
        })
        .on("end", () => {
          console.log(`CSV Loaded successfully. Total records: ${sales.length}`);
          resolve(sales);
        })
        .on("error", reject);
    }).on("error", reject);
  });
}

module.exports = { loadCSVFromURL, sales };
