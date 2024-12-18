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

async function getGameFromGenreId(genreId) {
    const { rows } = await pool.query(
        `
        SELECT * FROM game_genre
        INNER JOIN game
        ON game.id = game_genre.game_id
        WHERE genre_id = $1;
        `,
        [genreId],
    );

    return rows;
}

async function getGameFromGameId(gameId) {
    const { rows } = await pool.query(
        `
        SELECT * FROM game_genre
        INNER JOIN genre
        ON game_genre.genre_id = genre.id
        WHERE game_id = $1;
        `,
        [gameId],
    );

    return rows;
}

async function getGameDeveloper(columnValue, developerId) {
    const { rows } = await pool.query(
        `
        SELECT * FROM game_developer
        INNER JOIN developer
        ON game_developer.developer_id = developer.id
        INNER JOIN game
        ON game.id = game_developer.game_id
        WHERE ${columnValue} = $1;
        `,
        [developerId],
    );

    return rows;
}

async function getGamePublisher(columnValue, publisherId) {
    const { rows } = await pool.query(
        `
        SELECT * FROM game_publisher
        INNER JOIN publisher
        ON game_publisher.publisher_id = publisher.id
        INNER JOIN game
        ON game.id = game_publisher.game_id
        WHERE ${columnValue} = $1;
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
        SELECT ${selectQuery} FROM game_rating
        WHERE game_id = $1;
        `,
        [gameId],
    );

    return rows;
}

async function getAverageRatings(gameId) {
    const { rows } = await pool.query(
        `
        SELECT AVG(rating) FROM game_rating
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
    getGameFromGenreId,
    getGameFromGameId,
    getGameDeveloper,
    getGamePublisher,
    getCost,
    getAllRatings,
    getAverageRatings,
};
