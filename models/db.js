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

const getPosts = (req, res) => {
  pool.query("SELECT id, title, teaser FROM post", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    console.log("here");
  });
};

const createPost = (req, res) => {
  const {
    title,
    teaser,
    content,
    code,
    style,
    head,
    posttype,
    parentid,
    publisheddt,
    deleted
  } = req.body;

  pool.query(
    "INSERT INTO post (title, teaser, content, code, style, head, posttype, parentid, updateddt, updatedby, publisheddt, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), 'system', $9, $10)",
    [
      title,
      teaser,
      content,
      code,
      style,
      head,
      posttype,
      parentid,
      publisheddt,
      deleted
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send({ id: results.insertId });
    }
  );
};

const getPost = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM post WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows[0]);
  });
};

const updatePost = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    title,
    teaser,
    content,
    code,
    style,
    head,
    posttype,
    parentid,
    publisheddt,
    deleted
  } = req.body;

  pool.query(
    "UPDATE post SET title = $1, teaser = $2, content = $3, code = $4, style = $5, head = $6, posttype = $7, parentid = $8, updateddt = NOW(), updatedby = 'SYSTEM', publisheddt = $9, deleted = $10 WHERE ID = $11",
    [
      title,
      teaser,
      content,
      code,
      style,
      head,
      posttype,
      parentid,
      publisheddt,
      deleted,
      id
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send({ id: results.insertId });
    }
  );
};

const deletePost = (req, res) => {
  const id = parseInt(request.params.id);
  pool.query("DELETE FROM post WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Post deleted with id: ${id}.`);
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

  // Posts
  getPosts, // LIST
  createPost, // C
  getPost, // R
  updatePost, // U
  deletePost, // D

  // Resources
  getResources,
  getResource,
  getResourceByName
};
