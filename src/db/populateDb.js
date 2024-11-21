import pg from "pg";
import process from "process";

const Client = pg.Client;

const SQL = `
CREATE TABLE IF NOT EXISTS game (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_name text
);

CREATE TABLE IF NOT EXISTS genre (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_genre text
);

CREATE TABLE IF NOT EXISTS developer (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    developer_name text
);

CREATE TABLE IF NOT EXISTS publisher (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    publisher_name text
);

CREATE TABLE IF NOT EXISTS game_genre (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER REFERENCES game(id),
    genre_id INTEGER REFERENCES genre(id)
);

CREATE TABLE IF NOT EXISTS game_developer (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER REFERENCES game(id),
    developer_id INTEGER REFERENCES developer(id)
);

CREATE TABLE IF NOT EXISTS game_publisher (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER REFERENCES game(id),
    publisher_id INTEGER REFERENCES publisher(id)
);

CREATE TABLE IF NOT EXISTS game_cost (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER REFERENCES game(id),
    cost REAL
);

CREATE TABLE IF NOT EXISTS game_rating (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER REFERENCES game(id),
    rating REAL
);
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

    console.log("Created Default Tables");
}

main();
