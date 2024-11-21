import pg from "pg";
import process from "process";

const Client = pg.Client;

const SQL = `
DROP TABLE game CASCADE;
DROP TABLE genre CASCADE;
DROP TABLE developer CASCADE;
DROP TABLE publisher CASCADE;
DROP TABLE game_genre CASCADE;
DROP TABLE game_developer CASCADE;
DROP TABLE game_publisher CASCADE;
DROP TABLE game_cost CASCADE;
DROP TABLE game_rating CASCADE;
`;

async function main() {
    const client = new Client({
        connectionString:
            process.env.DB_CONNECTION_STRING === ""
                ? "postgresql://" +
                  process.env.DB_USER +
                  ":" +
                  process.env.DB_PASSWORD +
                  "@" +
                  process.env.DB_HOST +
                  ":" +
                  process.env.DB_PORT +
                  "/" +
                  process.env.DB_NAME
                : process.env.DB_CONNECTION_STRING,
    });

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("Dropped all Tables");
}

main();
