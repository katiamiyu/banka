const pg = require('pg');
const dotenv = require('dotenv');

pg.defaults.ssl = true;

dotenv.config();

// setting up the connection string
const pool = new pg.Pool({
  connectionString: process.env.ONLINE_URL,
});

// establish connection
pool.on('connect', () => {
  console.log('connected to banka');
});

const createUserTable = () => {
  const queryText = `create table if not exists
        users(
          id SERIAL NOT NULL PRIMARY KEY,  
          firstname CHARACTER VARYING(128) UNIQUE NOT NULL,
          lastname CHARACTER VARYING(128) UNIQUE NOT NULL,  
          email CHARACTER VARYING(128) UNIQUE NOT NULL,
          password CHARACTER VARYING(128) UNIQUE NOT NULL,
          isadmin BOOLEAN NOT NULL DEFAULT FALSE,
          created_date timestamp,
          modified_date timestamp
        )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUserTable = () => {
  const queryText = 'drop table if exists users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('release banka con');
  process.exit(0);
});

module.exports = {
  createUserTable,
  dropUserTable,
};
require('make-runnable');
