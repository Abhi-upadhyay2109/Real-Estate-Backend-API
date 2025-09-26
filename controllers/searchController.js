const propertyService = require("../services/propertyService");

async function search(req, res) {
  const { query = "", bhk = "", location = "", page = 1, limit = 10 } = req.query;
  try {
    const data = propertyService.search({ query, bhk, location, page, limit });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
}

module.exports = { search };
