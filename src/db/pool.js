/* eslint-disable indent */
import pg from "pg";
const { Pool } = pg;
import process from "process";

export default new Pool(
    process.env.DB_CONNECTION_STRING === ""
        ? {
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              database: process.env.DB_NAME,
              password: process.env.DB_PASSWORD,
              port: process.env.DB_PORT,
          }
        : {
              connectionString: process.env.DB_CONNECTION_STRING,
          },
);
