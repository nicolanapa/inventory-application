import { body, validationResult } from "express-validator";
import * as getQuery from "../db/queries/getQueries.js";
import * as insertQuery from "../db/queries/insertQueries.js";
import * as deleteQuery from "../db/queries/deleteQueries.js";

const getIndex = async (req, res) => {
    const listOfPublishers = await getQuery.getElements("publisher");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("publisher", { publishers: listOfPublishers });
};

const getJson = async (req, res) => {
    const listOfPublishers = await getQuery.getElements("publisher", 100);

    res.status(200).json(listOfPublishers);
};

const getAdd = async (req, res) => {
    res.set({ "Content-Type": "text/html" });
    res.status(200).render("form/publisherForm");
};

const addFormValidation = [
    body("publisher_name")
        .trim()
        .notEmpty()
        .withMessage("Publisher Name Input can't be Empty")
        .isLength({ min: 1, max: 32 })
        .withMessage("Publisher name should be between lenght 1 and 32")
        .isAlpha()
        .withMessage("Publisher Name can only have characters"),
];

const postAdd = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).render("form/publisherForm", {
                errors: errors.array(),
            });
        }

        const { publisher_name } = req.body;

        insertQuery.postElement("publisher", "publisher_name", publisher_name);

        res.redirect("/publisher");
    },
];

const getPublisher = async (req, res) => {
    const games = await getQuery.getGamePublisher(req.params.id);
    const publisher = await getQuery.getElement("publisher", "id", req.params.id);

    res.status(200).render("singleView/publisherView", {
        games: games,
        publisher: publisher[0],
    });
};

const deletePublisher = async (req, res) => {
    const games = await getQuery.getGamePublisher(req.params.id);
    console.log(games);
    if (games.length !== 0) {
        await deleteQuery.deleteElement("game_publisher", "publisher_id", req.params.id);
    }

    await deleteQuery.deleteElementId("publisher", req.params.id);

    res.redirect("/publisher");
};

export { getIndex, getJson, getAdd, postAdd, getPublisher, deletePublisher };
