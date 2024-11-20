import pool from "../pool.js";

async function updateElement(table, column, valueToUpdate, columnCondition, conditionValue) {
    await pool.query(
        `
        UPDATE ${table}
        SET ${column} = $1
        WHERE ${columnCondition} = $2;
        `,
        [valueToUpdate, conditionValue],
    );
}

export { updateElement };
