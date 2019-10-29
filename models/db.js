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

///////////////////////////////////
// Creates user and returns new id.
///////////////////////////////////
const createUser = async user => {
  try {
    const results = await pool.query(
      'INSERT INTO "user" (email, name, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [user.email, user.name, user.password, user.role]
    );
    const id = results.rows[0].id;

    return results.rows[0].id;
  } catch (err) {
    throw Error(err);
  }
};

const getUser = async id => {
  try {
    const results = await pool.query(
      'SELECT id, email, name, role FROM "user" WHERE ID = $1',
      [id]
    );
    return results.rows[0];
  } catch (err) {
    throw Error(err);
  }
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

const getResource = (req, res) => {
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

const getResourceByName = (req, res) => {
  const filename = req.params.filename;

  pool.query(
    'SELECT filename, "mediaType", data FROM resource WHERE filename = $1',
    [filename],
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
  // Users
  createUser,
  getUser,

  // Resources
  getResources,
  getResource,
  getResourceByName
};
