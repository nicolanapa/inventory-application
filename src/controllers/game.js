import { body, validationResult } from "express-validator";
import * as getQuery from "../db/queries/getQueries.js";
import { postGame } from "../db/queries/insertQueries.js";

const getIndex = async (req, res) => {
    const listOfGames = await getQuery.getElements("game");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("game", { games: listOfGames });
};

const getJson = async (req, res) => {
    const listOfGames = await getQuery.getElements("game", 100);

    res.status(200).json(listOfGames);
};

const getAdd = async (req, res) => {
    const listOfGenres = await getQuery.getElements("genre");
    const listOfDevelopers = await getQuery.getElements("developer");
    const listOfPublishers = await getQuery.getElements("publisher");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("form/gameForm", {
        genres: listOfGenres,
        developers: listOfDevelopers,
        publishers: listOfPublishers,
    });
};

const addFormValidation = [
    body("game_name")
        .escape()
        .trim()
        .notEmpty()
        .matches(/^[A-Za-z0-9 .,'!&]+$/)
        .withMessage("Game Name should only have characters and numbers"),
    body("game_genre")
        .notEmpty()
        .withMessage("Atleast a Genre should be selected")
        .if(body("game_genre").not().isArray())
        .isInt({ min: 1 })
        .withMessage("Value sent should be an Int")
        .if(body("game_genre").isArray({ min: 1 }))
        .isArray({ min: 1 })
        .isInt({ min: 1 }),
    body("cost")
        .isFloat({ min: 0, max: 1000 })
        .withMessage("Game Cost should be between 0 and 1000"),
    body("developer_name")
        .notEmpty()
        .withMessage("Atleast a Developer should be selected")
        .if(body("developer_name").not().isArray())
        .isInt({ min: 1 })
        .if(body("developer_name").isArray({ min: 1 }))
        .isArray({ min: 1 })
        .isInt({ min: 1 }),
    body("publisher_name").isInt({ min: 1 }).withMessage("A Game Publisher is required"),
];

const postAdd = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const listOfGenres = await getQuery.getElements("genre");
            const listOfDevelopers = await getQuery.getElements("developer");
            const listOfPublishers = await getQuery.getElements("publisher");

            res.status(400).render("form/gameForm", {
                errors: errors.array(),
                genres: listOfGenres,
                developers: listOfDevelopers,
                publishers: listOfPublishers,
            });
        }

        //await postGame();
        res.redirect("/game");
    },
];

export { getIndex, getJson, getAdd, postAdd };
