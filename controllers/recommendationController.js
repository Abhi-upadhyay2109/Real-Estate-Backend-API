const propertyService = require("../services/propertyService");

async function recommendations(req, res) {
  const { id } = req.params;
  try {
    const recs = propertyService.getRecommendations(id, 3);
    if (!recs.length) return res.status(404).json({ error: "No recommendations found" });
    res.json({ recommendations: recs });
  } catch {
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
}

module.exports = { recommendations };