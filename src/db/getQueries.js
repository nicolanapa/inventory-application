import pool from "./pool.js";

async function getElements(elementToQueryFrom, limit = 30) {
    const { rows } = pool.query(
        `
        SELECT * FROM $1
        LIMIT $2;
        `,
        [elementToQueryFrom, limit],
    );

    return rows;
}

async function getElement(elementToQueryFrom, conditionName, elementToQuery) {
    const { rows } = pool.query(
        `
        SELECT * FROM $1
        WHERE $2 = $3;
        `,
        [elementToQuery, conditionName, elementToQuery],
    );

    return rows;
}

export { getElements, getElement };
