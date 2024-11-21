import { body, validationResult } from "express-validator";
import * as getQuery from "../db/queries/getQueries.js";
import * as insertQuery from "../db/queries/insertQueries.js";
import * as deleteQuery from "../db/queries/deleteQueries.js";
import * as updateQuery from "../db/queries/updateQueries.js";

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
    res.status(200).render("form/add/publisherForm");
};

const addFormValidation = [
    body("publisher_name")
        .trim()
        .notEmpty()
        .withMessage("Publisher Name Input can't be Empty")
        .isLength({ min: 1, max: 32 })
        .withMessage("Publisher name should be between lenght 1 and 32")
        .matches(/^[A-Za-z0-9 .,'!&-]+$/)
        .withMessage("Publisher Name can only have characters"),
];

const postAdd = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).render("form/add/publisherForm", {
                errors: errors.array(),
            });

            return;
        }

        const { publisher_name } = req.body;

        await insertQuery.postElement(
            "publisher",
            "publisher_name",
            publisher_name,
        );

        res.redirect("/publisher");
    },
];

const getPublisher = async (req, res) => {
    const games = await getQuery.getGamePublisher(
        "publisher_id",
        req.params.id,
    );
    const publisher = await getQuery.getElement(
        "publisher",
        "id",
        req.params.id,
    );

    let code =
        publisher === undefined || publisher === null || publisher.length === 0
            ? 404
            : 200;

    res.status(code).render("singleView/publisherView", {
        games:
            games === undefined || games === null || games.length === 0
                ? [{ id: 1, game_name: "Nothing..." }]
                : games,
        publisher:
            publisher === undefined ||
            publisher === null ||
            publisher.length === 0
                ? { publisher_name: "Where are we? 404" }
                : publisher[0],
    });
};

const deletePublisher = async (req, res) => {
    const games = await getQuery.getGamePublisher(
        "publisher_id",
        req.params.id,
    );

    if (games.length !== 0) {
        await deleteQuery.deleteElement(
            "game_publisher",
            "publisher_id",
            req.params.id,
        );
    }

    await deleteQuery.deleteElementId("publisher", req.params.id);

    res.redirect("/publisher");
};

const getUpdate = async (req, res) => {
    const publisher = await getQuery.getElement(
        "publisher",
        "id",
        req.params.id,
    );

    res.status(200).render("form/update/publisherForm", {
        publisher: publisher[0],
        id: req.params.id,
    });
};

const postUpdate = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const publisher = await getQuery.getElement(
                "publisher",
                "id",
                req.params.id,
            );

            res.status(400).render("form/update/publisherForm", {
                errors: errors.array(),
                publisher: publisher[0],
                id: req.params.id,
            });

            return;
        }

        const { publisher_name } = req.body;

        await updateQuery.updateElement(
            "publisher",
            "publisher_name",
            publisher_name,
            "id",
            req.params.id,
        );

        res.redirect("/publisher");
    },
];

export {
    getIndex,
    getJson,
    getAdd,
    postAdd,
    getPublisher,
    deletePublisher,
    getUpdate,
    postUpdate,
};
