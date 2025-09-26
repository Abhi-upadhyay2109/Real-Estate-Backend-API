
# Real Estate Backend API

This is a backend service for a real estate platform with **search**, **recommendations**, and **GraphQL support**.  
Built with **Node.js**, **Express**, and a JSON-based mock database (can later migrate to MongoDB or Firebase).

---

## Features

- **Fetch all properties** with pagination (`GET /properties`)  
- **Fetch a single property by ID** (`GET /properties/:id`)  
- **Hybrid search** by query, BHK, or location (`GET /search?query=&bhk=&location=`)  
  - Exact keyword match  
  - Semantic search simulation (e.g., `"flat in Cyberhub"` returns Gurgaon properties)  
- **Property recommendations** based on location and BHK (`GET /recommendations/:id`)  
- **GraphQL endpoint** for fetching properties and advanced filters (`/graphql`)  
- **Caching** for search and recommendations (NodeCache, 2 minutes TTL)

---

## Tech Stack

- **Node.js**  
- **Express.js**  
- **Apollo Server** (GraphQL)  
- **NodeCache** (for caching)  
- **JSON** as mock database (can be replaced with MongoDB or Firebase)

---

## How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Abhi-upadhyay2109/Real-Estate-Backend-API.git
cd real-estate-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm run start
# OR
node server.js
```

### 4. Access the Server

#### REST Endpoints
- Fetch all properties:  
```
http://localhost:8000/properties
```
- Fetch a single property by ID:  
```
http://localhost:8000/properties/p1
```
- Search properties (query, BHK, location):  
```
http://localhost:8000/search?query=flat&location=Gurgaon
```
- Get property recommendations:  
```
http://localhost:8000/recommendations/p1
```

#### GraphQL Endpoint
```
http://localhost:8000/graphql
```
You can use the GraphQL Playground to query properties, perform searches, and fetch recommendations.

---

## Design Decisions

### 1. Scalability

- **Modular Architecture:**  
  - `controllers` handle HTTP requests and responses.  
  - `services` handle business logic (search, recommendations, properties).  
  - Easy to maintain, test, and extend.

- **Caching:**  
  - Implemented with NodeCache for search and recommendations.  
  - TTL of 2 minutes reduces repeated computation for the same queries.

- **Pagination:**  
  - Applied to both properties list and search results to prevent sending large datasets at once.

---

### 2. Microservice-Ready Structure

- Each service can be separated into independent microservices:  
  - `propertiesService` → manages property data  
  - `searchService` → handles hybrid search  
  - `recommendationService` → handles property recommendations

- **API Gateway:**  
  - The current Express app acts as the gateway routing requests to different services.  
  - Makes it easy to scale, deploy, or migrate services independently in the future.

- **Database:**  
  - Currently using JSON as a mock database.  
  - Can migrate to MongoDB or Firebase for production with minimal changes.

---

### 3. Future Improvements

- Use MongoDB or Firebase for persistent storage.  
- Implement real semantic search using AI embeddings.  
- Add authentication & role-based access control.  
- Replace NodeCache with Redis for distributed caching in production.  
- Add unit tests and CI/CD for automated deployment.
