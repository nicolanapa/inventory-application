import pool from "./pool.js";

async function getElements(tableToQueryFrom, limit = 30) {
    const { rows } = pool.query(
        `
        SELECT * FROM $1
        LIMIT $2;
        `,
        [tableToQueryFrom, limit],
    );

    return rows;
}

async function getElement(tableToQueryFrom, conditionName, elementToQuery) {
    const { rows } = pool.query(
        `
        SELECT * FROM $1
        WHERE $2 = $3;
        `,
        [tableToQueryFrom, conditionName, elementToQuery],
    );

    return rows;
}

// Remove double code functions once all the Queries get tested better

async function getGameGenre(gameId) {
    const { rows } = pool.query(
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
    const { rows } = pool.query(
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
    const { rows } = pool.query(
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
    const { rows } = pool.query(
        `
        SELECT cost FROM game_cost
        WHERE game_id = $1;
        `,
        [gameId],
    );

    return rows;
}

async function getAllRatings(gameId, selectQuery = "*") {
    const { rows } = pool.query(
        `
        SELECT $1 FROM 
        WHERE game_id = $2;
        `,
        [selectQuery, gameId],
    );

    return rows;
}

export {
    getElements,
    getElement,
    getGameGenre,
    getGameDeveloper,
    getGamePublisher,
    getCost,
    getAllRatings,
};
