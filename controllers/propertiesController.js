const propertyService = require("../services/propertyService");

async function getProperties(req, res) {
  const { page = 1, limit = 10 } = req.query;
  try {
    const data = propertyService.getAllProperties(page, limit);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
}

async function getProperty(req, res) {
  const { id } = req.params;
  const prop = propertyService.getPropertyById(id);
  if (!prop) return res.status(404).json({ error: "Property not found" });
  res.json(prop);
}

module.exports = { getProperties, getProperty };