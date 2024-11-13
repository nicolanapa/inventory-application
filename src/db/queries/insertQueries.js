import pool from "../pool.js";

async function postGame(value) {
    await pool.query(
        `
        INSERT INTO game (game_name)
        VALUES ($1);
        `,
        [value],
    );
}

async function postGenre(value) {
    await pool.query(
        `
        INSERT INTO genre (game_genre)
        VALUES ($1);
        `,
        [value],
    );
}

async function postDeveloper(value) {
    await pool.query(
        `
        INSERT INTO developer (developer_name)
        VALUES ($1);
        `,
        [value],
    );
}

async function postPublisher(value) {
    await pool.query(
        `
        INSERT INTO publisher (publisher_name)
        VALUES ($1);
        `,
        [value],
    );
}

export { postGame, postGenre, postDeveloper, postPublisher };
