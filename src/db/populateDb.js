import pg from "pg";
import process from "process";

const Client = pg.Client;

const SQL = ``;

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
