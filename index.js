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

const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const resourceRoutes = require("./routes/resource-routes");
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
