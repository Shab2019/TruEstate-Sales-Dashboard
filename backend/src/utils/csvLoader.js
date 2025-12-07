const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

let salesData = [];

/**
 * Normalize raw CSV row into a JS object with clean keys.
 * Adjust header names here if they differ in the CSV.
 */
function normalizeRow(row) {
  return {
    customerId: row["Customer ID"],
    customerName: row["Customer Name"],
    phoneNumber: row["Phone Number"],
    gender: row["Gender"],
    age: row["Age"] ? Number(row["Age"]) : null,
    customerRegion: row["Customer Region"],
    customerType: row["Customer Type"],

    productId: row["Product ID"],
    productName: row["Product Name"],
    brand: row["Brand"],
    productCategory: row["Product Category"],
    tags: row["Tags"],

    quantity: row["Quantity"] ? Number(row["Quantity"]) : 0,
    pricePerUnit: row["Price per Unit"] ? Number(row["Price per Unit"]) : 0,
    discountPercentage: row["Discount Percentage"]
      ? Number(row["Discount Percentage"])
      : 0,
    totalAmount: row["Total Amount"] ? Number(row["Total Amount"]) : 0,
    finalAmount: row["Final Amount"] ? Number(row["Final Amount"]) : 0,

    date: row["Date"],
    paymentMethod: row["Payment Method"],
    orderStatus: row["Order Status"],
    deliveryType: row["Delivery Type"],
    storeId: row["Store ID"],
    storeLocation: row["Store Location"],
    salespersonId: row["Salesperson ID"],
    employeeName: row["Employee Name"],
  };
}

function loadSalesData() {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(
      __dirname,
      "..",
      "data",
      "truestate_assignment_dataset.csv"
    );

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push(normalizeRow(row));
      })
      .on("end", () => {
        salesData = results;
        console.log(`Loaded ${salesData.length} sales records.`);
        resolve(salesData);
      })
      .on("error", (err) => {
        console.error("Error loading CSV:", err);
        reject(err);
      });
  });
}

function getSalesData() {
  return salesData;
}

module.exports = {
  loadSalesData,
  getSalesData,
};
