import pg from "pg";
import process from "process";

const Client = pg.Client;

const SQL = `
INSERT INTO game (game_name)
VALUES ('Monopolio'), ('X'), ('Double: A Float''s Enemy'), ('Clash of Friends'), ('Get Hacked Simulator!');
INSERT INTO game (game_name)
VALUES ('Nothing''s Story: NULL'), ('Get Posted'), ('Arrow Fun'), ('Async Sim'), ('Fighting against Error');

INSERT INTO genre (game_genre)
VALUES ('Action'), ('Horror'), ('Adventure'), ('Novel'), ('Simulator');

INSERT INTO developer (developer_name)
VALUES ('DVD Project'), ('Good Dogs'), ('People''s Games'), ('World of Many'), ('Games');

INSERT INTO publisher (publisher_name)
VALUES ('Corporation X'), ('AllGames'), ('Front-endo'), ('Software'), ('Epic Warnings');

INSERT INTO game_genre (game_id, genre_id)
VALUES (1, 3), (5, 5), (1, 1), (2, 4), (3, 1), (3, 2), (3, 3), (4, 4), (6, 2), (7, 3), (8, 5), (9, 4), (10, 5);

INSERT INTO game_developer (game_id, developer_id)
VALUES (1, 3), (5, 5), (2, 4), (3, 1), (3, 3), (4, 4), (6, 2), (7, 3), (8, 5), (9, 4), (10, 5);

INSERT INTO game_publisher (game_id, publisher_id)
VALUES (1, 3), (5, 5), (2, 4), (3, 1), (4, 4), (6, 2), (7, 3), (8, 5), (9, 4), (10, 5);

INSERT INTO game_cost (game_id, cost)
VALUES (1, 30.99), (2, 55.99), (3, 4.99), (4, 0.99), (5, 79.99), (10, 119.99), (6, 30), (8, 20), (9, 10), (7, 5.00);

INSERT INTO game_rating (game_id, rating)
VALUES (1, 3), (5, 5), (1, 1), (2, 4), (3, 1), (3, 2), (3, 3), (4, 4), (6, 2), (7, 3), (8, 5), (9, 4), (10, 5);
INSERT INTO game_rating (game_id, rating)
VALUES (1, 0.5), (5, 2), (1, 1), (2, 5), (3, 2), (3, 2.5), (3, 5), (4, 4.5), (6, 3.5), (7, 4), (8, 5), (9, 5), (10, 4.5);
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

    console.log("Inserted Default Values");
}

main();
