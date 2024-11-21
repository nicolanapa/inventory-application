import { body, validationResult } from "express-validator";
import * as getQuery from "../db/queries/getQueries.js";
import * as insertQuery from "../db/queries/insertQueries.js";
import * as deleteQuery from "../db/queries/deleteQueries.js";
import * as updateQuery from "../db/queries/updateQueries.js";

const getIndex = async (req, res) => {
    const listOfDevelopers = await getQuery.getElements("developer");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("developer", { developers: listOfDevelopers });
};

const getJson = async (req, res) => {
    const listOfDevelopers = await getQuery.getElements("developer", 100);

    res.status(200).json(listOfDevelopers);
};

const getAdd = async (req, res) => {
    res.set({ "Content-Type": "text/html" });
    res.status(200).render("form/add/developerForm");
};

const addFormValidation = [
    body("developer_name")
        .trim()
        .notEmpty()
        .withMessage("Developer Name Input can't be Empty")
        .isLength({ min: 1, max: 32 })
        .withMessage("Developer Name should be between lenght 1 and 32")
        .matches(/^[A-Za-z0-9 .,'!&-]+$/)
        .withMessage("Developer Name can only have characters"),
];

const postAdd = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).render("form/add/developerForm", {
                errors: errors.array(),
            });
        }

        const { developer_name } = req.body;

        await insertQuery.postElement(
            "developer",
            "developer_name",
            developer_name,
        );

        res.redirect("/developer");
    },
];

const getDeveloper = async (req, res) => {
    const games = await getQuery.getGameDeveloper(
        "developer_id",
        req.params.id,
    );
    const developer = await getQuery.getElement(
        "developer",
        "id",
        req.params.id,
    );
    /*const cost = await getQuery.getCost(req.params.id);
    const ratings = await getQuery.getAllRatings(req.params.id);*/

    let code =
        developer === undefined || developer === null || developer.length === 0
            ? 404
            : 200;

    res.status(code).render("singleView/developerView", {
        games:
            games === undefined || games === null || games.length === 0
                ? [{ id: 1, game_name: "Nothing..." }]
                : games,
        developer:
            developer === undefined ||
            developer === null ||
            developer.length === 0
                ? { id: 1, developer_name: "Where are we? 404" }
                : developer[0],
        /*cost: cost[0].cost,
        ratings: ratings,*/
    });
};

const deleteDeveloper = async (req, res) => {
    const games = await getQuery.getGameDeveloper(
        "developer_id",
        req.params.id,
    );

    if (games.length !== 0) {
        await deleteQuery.deleteElement(
            "game_developer",
            "developer_id",
            req.params.id,
        );
    }

    await deleteQuery.deleteElementId("developer", req.params.id);

    res.redirect("/developer");
};

const getUpdate = async (req, res) => {
    const developer = await getQuery.getElement(
        "developer",
        "id",
        req.params.id,
    );

    res.status(200).render("form/update/developerForm", {
        developer: developer[0],
        id: req.params.id,
    });
};

const postUpdate = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const developer = await getQuery.getElement(
                "developer",
                "id",
                req.params.id,
            );

            res.status(400).render("form/update/developerForm", {
                errors: errors.array(),
                developer: developer[0],
                id: req.params.id,
            });

            return;
        }

        const { developer_name } = req.body;

        await updateQuery.updateElement(
            "developer",
            "developer_name",
            developer_name,
            "id",
            req.params.id,
        );

        res.redirect("/developer");
    },
];

export {
    getIndex,
    getJson,
    getAdd,
    postAdd,
    getDeveloper,
    deleteDeveloper,
    getUpdate,
    postUpdate,
};
