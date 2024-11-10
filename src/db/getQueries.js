import pool from "./pool.js";

async function getElement(elementToQuery, limit = 30) {
    const { rows } = pool.query(
        `
        SELECT * FROM $1
        LIMIT $2;
        `,
        [elementToQuery, limit],
    );

    return rows;
}

export { getElement };
