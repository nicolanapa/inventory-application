import pool from "../pool.js";

async function getElements(tableToQueryFrom, limit = 30) {
    const { rows } = await pool.query(
        `
        SELECT * FROM ${tableToQueryFrom}
        LIMIT $1;
        `,
        [limit],
    );

    return rows;
}

async function getElement(tableToQueryFrom, conditionName, elementToQuery) {
    const { rows } = await pool.query(
        `
        SELECT * FROM ${tableToQueryFrom}
        WHERE ${conditionName} = $1;
        `,
        [elementToQuery],
    );

    return rows;
}

async function getElementLike(tableToQueryFrom, conditionName, elementToQuery) {
    const { rows } = await pool.query(
        `
        SELECT * FROM ${tableToQueryFrom}
        WHERE ${conditionName} LIKE $1;
        `,
        ["%" + elementToQuery + "%"],
    );

    return rows;
}

// Remove double code functions once all the Queries get tested better

async function getGameGenre(gameId) {
    const { rows } = await pool.query(
        `
        SELECT game_genre FROM game_genre
        INNER JOIN genre
        ON game_genre.genre_id = genre.id
        WHERE game_id = $1;
        `,
        [gameId],
    );

    return rows;
}

async function getGameDeveloper(developerId) {
    const { rows } = await pool.query(
        `
        SELECT developer_name FROM game_developer
        INNER JOIN developer
        ON game_developer.developer_id = developer.id
        WHERE game_id = $1;
        `,
        [developerId],
    );

    return rows;
}

async function getGamePublisher(publisherId) {
    const { rows } = await pool.query(
        `
        SELECT publisher_name FROM game_publisher
        INNER JOIN publisher
        ON game_publisher.publisher_id = publisher.id
        WHERE game_id = $1;
        `,
        [publisherId],
    );

    return rows;
}

async function getCost(gameId) {
    const { rows } = await pool.query(
        `
        SELECT cost FROM game_cost
        WHERE game_id = $1;
        `,
        [gameId],
    );

    return rows;
}

async function getAllRatings(gameId, selectQuery = "*") {
    const { rows } = await pool.query(
        `
        SELECT ${selectQuery} FROM 
        WHERE game_id = $1;
        `,
        [gameId],
    );

    return rows;
}

export {
    getElements,
    getElement,
    getElementLike,
    getGameGenre,
    getGameDeveloper,
    getGamePublisher,
    getCost,
    getAllRatings,
};
