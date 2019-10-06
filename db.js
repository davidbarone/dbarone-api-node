const fs = require("fs");

// Database routines
const Pool = require("pg").Pool;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const getPosts = (req, res) => {
  pool.query("SELECT id, title, teaser FROM post", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getSinglePost = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM post WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows[0]);
  });
};

const getResources = (req, res) => {
  pool.query(
    'SELECT id, filename, "mediaType" FROM resource',
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getSingleResource = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    'SELECT filename, "mediaType", data FROM resource WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      const row = results.rows[0];

      res.writeHead(200, {
        "Content-Type": `${row.mediaType}`,
        "Content-Disposition": `filename=\"${row.filename}\"`
      });
      res.end(row.data);
    }
  );
};

module.exports = {
  getPosts,
  getSinglePost,
  getResources,
  getSingleResource
};
