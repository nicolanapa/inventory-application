import pool from "../pool.js";

async function postElement(table, columnValue, value) {
    await pool.query(
        `
        INSERT INTO ${table} (${columnValue})
        VALUES ($1);
        `,
        [value],
    );
}

async function postRelationTable(table, columnId1, columnId2, value1, value2) {
    await pool.query(
        `
        INSERT INTO ${table} (${columnId1}, ${columnId2})
        VALUES ($1, $2);
        `,
        [value1, value2],
    );
}

export { postElement, postRelationTable };
