import pool from "../pool.js";

async function postElement(table, columnValue, value) {
    await pool.query(
        `
        INSERT INTO ${table} ($1)
        VALUES ($2);
        `,
        [columnValue, value],
    );
}

async function postRelationTable(table, columnId1, columnId2, value1, value2) {
    await pool.query(
        `
        INSERT INTO ${table} ($1, $2)
        VALUES ($3, $4);
        `,
        [columnId1, columnId2, value1, value2],
    );
}

export { postElement, postRelationTable };
