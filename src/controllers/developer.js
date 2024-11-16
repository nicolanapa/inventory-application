import { body, validationResult } from "express-validator";
import * as getQuery from "../db/queries/getQueries.js";
import * as insertQuery from "../db/queries/insertQueries.js";
import * as deleteQuery from "../db/queries/deleteQueries.js";

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
    res.status(200).render("form/developerForm");
};

const addFormValidation = [
    body("developer_name")
        .trim()
        .notEmpty()
        .withMessage("Developer Name Input can't be Empty")
        .isLength({ min: 1, max: 32 })
        .withMessage("Developer Name should be between lenght 1 and 32")
        .isAlpha()
        .withMessage("Developer Name can only have characters"),
];

const postAdd = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).render("form/developerForm", {
                errors: errors.array(),
            });
        }

        const { developer_name } = req.body;

        insertQuery.postElement("developer", "developer_name", developer_name);

        res.redirect("/developer");
    },
];

const getDeveloper = async (req, res) => {
    const games = await getQuery.getGameDeveloper("developer_id", req.params.id);
    const developer = await getQuery.getElement("developer", "id", req.params.id);
    /*const cost = await getQuery.getCost(req.params.id);
    const ratings = await getQuery.getAllRatings(req.params.id);*/

    res.status(200).render("singleView/developerView", {
        games: games,
        developer: developer[0],
        /*cost: cost[0].cost,
        ratings: ratings,*/
    });
};

const deleteDeveloper = async (req, res) => {
    const games = await getQuery.getGameDeveloper("developer_id", req.params.id);
    console.log(games);
    if (games.length !== 0) {
        await deleteQuery.deleteElement("game_developer", "developer_id", req.params.id);
    }

    await deleteQuery.deleteElementId("developer", req.params.id);

    res.redirect("/developer");
};

export { getIndex, getJson, getAdd, postAdd, getDeveloper, deleteDeveloper };
