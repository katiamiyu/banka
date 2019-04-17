import pg from 'pg';
import dotenv from 'dotenv';

pg.defaults.ssl = true;

dotenv.config();
const pool = new pg.Pool({
  connectionString: process.env.ONLINE_URL,
});

const query = (text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { query };
