import pg from "pg";
import process from "process";

const Client = pg.Client;

const SQL = `
INSERT INTO game (game_name)
VALUES ('Monopolio'), ('X'), ('Double: A Float's Enemy'), ('Clash of Friends'), ('Get Hacked Simulator!');
INSERT INTO game (game_name)
VALUES ('Nothing's Story: NULL'), ('Get Posted'), ('Arrow Fun'), ('Async Sim'), ('Fighting against Error');

INSERT INTO genre (game_genre)
VALUES ('Action'), ('Horror'), ('Adventure'), ('Novel'), ('Simulator');

INSERT INTO developer (developer_name)
VALUES (''), (''), (''), (''), ('');

/*
INSERT INTO publisher (developer_name)
VALUES (''), (''), (''), (''), ('');

INSERT INTO game_genre (developer_name)
VALUES (''), (''), (''), (''), ('');

INSERT INTO game_developer (developer_name)
VALUES (''), (''), (''), (''), ('');

INSERT INTO game_publisher (developer_name)
VALUES (''), (''), (''), (''), ('');

INSERT INTO game_cost (developer_name)
VALUES (''), (''), (''), (''), ('');

INSERT INTO game_rating (developer_name)
VALUES (''), (''), (''), (''), ('');
*/
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

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("Inserted Default Values");
}

main();
