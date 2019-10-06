const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

// Environment
const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const db = require("./db");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use([
  bodyParser.urlencoded({
    extended: true
  }),
  cors({
    origin: "http://localhost:3000"
  })
]);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/api/posts", db.getPosts);
app.get("/api/posts/:id", db.getSinglePost);
app.get("/api/resources", db.getResources);
app.get("/api/resources/:id", db.getSingleResource);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
