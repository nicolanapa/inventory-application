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
    game_id INTEGER FOREIGN KEY,
    genre_id INTEGER FOREIGN KEY
);

CREATE TABLE IF NOT EXISTS game_developer (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER FOREIGN KEY,
    developer_id INTEGER FOREIGN KEY
);

CREATE TABLE IF NOT EXISTS game_publisher (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER FOREIGN KEY,
    publisher_id INTEGER FOREIGN KEY
);

CREATE TABLE IF NOT EXISTS game_cost (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER FOREIGN KEY,
    cost REAL
);

CREATE TABLE IF NOT EXISTS game_rating (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER FOREIGN KEY,
    rating REAL
);
`;

async function main() {
    const client = new Client({
        connectionString:
            "postgresql://" +
            process.env.DB_USER +
            ":" +
            process.env.DB_PASSWORD +
            "@" +
            process.env.DB_HOST +
            ":" +
            process.env.DB_PORT +
            "/" +
            process.env.DB_NAME,
    });

    client.connect();
    client.query(SQL);
    client.end();

    console.log("Created Default Tables");
}

main();
