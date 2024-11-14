import pool from "../pool.js";

async function deleteElement(table, columnValue, value) {
    await pool.query(
        `
        DELETE FROM ${table}
        WHERE ${columnValue} = $1;
        `,
        [value],
    );
}

async function deleteElementId(table, value) {
    await pool.query(
        `
        DELETE FROM ${table}
        WHERE id = $1;
        `,
        [value],
    );
}

export { deleteElement, deleteElementId };
