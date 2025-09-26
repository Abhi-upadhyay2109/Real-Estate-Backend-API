const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const propertiesRoutes = require("./routes/propertiesRoutes");
const searchRoutes = require("./routes/searchRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const { initGraphQL } = require("./graphql/server");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
  res.send({ status: "ok", message: "Real-estate backend running" });
});

// Routes
app.use("/properties", propertiesRoutes);
app.use("/search", searchRoutes);
app.use("/recommendations", recommendationRoutes);

// GraphQL (optional)
initGraphQL(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
