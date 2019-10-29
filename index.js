const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Config / Environment
const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Database (Knex / Objection)
const Knex = require("knex");
const connection = require("./knexfile");
const { Model } = require("objection");
const knexConnection = Knex(connection);
Model.knex(knexConnection);

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const resourceRoutes = require("./routes/resource");
const db = require("./models/db");
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

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/resources", resourceRoutes);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
