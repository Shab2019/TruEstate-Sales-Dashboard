const {
  getSalesWithQuery,
  getFilterOptions,
} = require("../services/salesService");

function getSales(req, res) {
  try {
    const result = getSalesWithQuery(req.query);
    res.json(result);
  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

function getFilters(req, res) {
  try {
    const filters = getFilterOptions();
    res.json(filters);
  } catch (err) {
    console.error("Error in getFilters:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getSales,
  getFilters,
};
