const fs = require("fs");
const path = require("path");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 * 2 }); // 2 minutes cache

const dataPath = path.join(__dirname, "../data/properties.json");
let properties = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const semanticMap = {
  cyberhub: "Gurgaon",
  "cyber city": "Gurgaon",
  powai: "Mumbai",
  whitefield: "Bengaluru",
  koramangala: "Bengaluru",
  indiranagar: "Bengaluru",
  bandra: "Mumbai",
  "hauz khas": "New Delhi",
  "south delhi": "New Delhi"
};

function paginate(arr, page = 1, limit = 10) {
  page = Math.max(1, Number(page));
  limit = Math.max(1, Number(limit));
  const start = (page - 1) * limit;
  return {
    total: arr.length,
    page,
    limit,
    results: arr.slice(start, start + limit)
  };
}

function getAllProperties(page, limit) {
  return paginate(properties, page, limit);
}

function getPropertyById(id) {
  return properties.find((p) => p.id === id) || null;
}

function normalize(s) {
  return (s || "").toString().toLowerCase();
}

function search({ query, bhk, location, page = 1, limit = 10 }) {
  const cacheKey = `search:${query}:${bhk}:${location}:${page}:${limit}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  let q = normalize(query);
  let loc = normalize(location);
  const bhkNum = bhk !== "" ? Number(bhk) : null;

  if (q) {
    Object.keys(semanticMap).forEach((token) => {
      if (q.includes(token)) {
        loc = semanticMap[token];
      }
    });
  }

  let results = properties.filter((p) => {
    const inTitle = normalize(p.title).includes(q);
    const inDesc = normalize(p.description).includes(q);
    const inLocation =
      normalize(p.location).includes(q) ||
      (loc && normalize(p.location).includes(normalize(loc)));
    const matchesQuery = q ? inTitle || inDesc || inLocation : true;
    const matchesBhk = bhkNum !== null ? p.bhk === bhkNum : true;
    const matchesLocation = location
      ? normalize(p.location) === normalize(location)
      : true;
    return matchesQuery && matchesBhk && matchesLocation;
  });

  const paged = paginate(results, page, limit);
  cache.set(cacheKey, paged);
  return paged;
}

function getRecommendations(id, count = 3) {
  const cacheKey = `reco:${id}:${count}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const origin = getPropertyById(id);
  if (!origin) return [];

  let candidates = properties.filter(
    (p) => p.id !== id && p.location === origin.location && p.bhk === origin.bhk
  );

  if (candidates.length < count) {
    const more = properties.filter(
      (p) => p.id !== id && p.location === origin.location
    );
    candidates = Array.from(new Set([...candidates, ...more]));
  }

  if (candidates.length < count) {
    const fuzzy = properties.filter(
      (p) =>
        p.id !== id &&
        Math.abs((p.bhk || 0) - (origin.bhk || 0)) <= 1
    );
    candidates = Array.from(new Set([...candidates, ...fuzzy]));
  }

  const result = candidates.slice(0, count);
  cache.set(cacheKey, result);
  return result;
}

module.exports = {
  getAllProperties,
  getPropertyById,
  search,
  getRecommendations
};
