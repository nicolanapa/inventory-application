import { body, validationResult } from "express-validator";
import * as getQuery from "../db/queries/getQueries.js";
import * as insertQuery from "../db/queries/insertQueries.js";
import * as deleteQuery from "../db/queries/deleteQueries.js";
import * as updateQuery from "../db/queries/updateQueries.js";

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
    res.status(200).render("form/add/gameForm", {
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
        .matches(/^[A-Za-z0-9 .,'!&-]+$/)
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
    body("publisher_name")
        .isInt({ min: 1 })
        .withMessage("A Game Publisher is required"),
];

const postAdd = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const listOfGenres = await getQuery.getElements("genre");
            const listOfDevelopers = await getQuery.getElements("developer");
            const listOfPublishers = await getQuery.getElements("publisher");

            res.status(400).render("form/add/add/gameForm", {
                errors: errors.array(),
                genres: listOfGenres,
                developers: listOfDevelopers,
                publishers: listOfPublishers,
            });
        }

        const { game_name, game_genre, cost, developer_name, publisher_name } =
            req.body;

        await insertQuery.postElement("game", "game_name", game_name);

        let game_id = await getQuery.getElementLike(
            "game",
            "game_name",
            game_name,
        );
        game_id = game_id[game_id.length - 1].id;

        if (!Array.isArray(game_genre)) {
            await insertQuery.postRelationTable(
                "game_genre",
                "game_id",
                "genre_id",
                game_id,
                game_genre,
            );
        } else {
            for (let i = 0; i < game_genre.length; i++) {
                await insertQuery.postRelationTable(
                    "game_genre",
                    "game_id",
                    "genre_id",
                    game_id,
                    game_genre[i],
                );
            }
        }

        await insertQuery.postRelationTable(
            "game_cost",
            "game_id",
            "cost",
            game_id,
            cost,
        );

        if (!Array.isArray(developer_name)) {
            await insertQuery.postRelationTable(
                "game_developer",
                "game_id",
                "developer_id",
                game_id,
                developer_name,
            );
        } else {
            for (let i = 0; i < developer_name.length; i++) {
                await insertQuery.postRelationTable(
                    "game_developer",
                    "game_id",
                    "developer_id",
                    game_id,
                    developer_name[i],
                );
            }
        }

        await insertQuery.postRelationTable(
            "game_publisher",
            "game_id",
            "publisher_id",
            game_id,
            publisher_name,
        );

        res.redirect("/game");
    },
];

const addRatingValidation = [
    body("rating")
        .trim()
        .notEmpty()
        .withMessage("Rating value shouldn't be empty")
        .isFloat({ min: 0, max: 5 })
        .withMessage("A rating can be only between 0 and 5"),
];

const postAddRating = [
    addRatingValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            alert(errors.array());
        }

        const { rating } = req.body;

        await insertQuery.postRelationTable(
            "game_rating",
            "game_id",
            "rating",
            req.params.id,
            rating,
        );

        res.status(200).redirect("/game/" + req.params.id);
    },
];

const getGame = async (req, res) => {
    const game = await getQuery.getElement("game", "id", req.params.id);
    const genres = await getQuery.getGameFromGameId(req.params.id);
    const developers = await getQuery.getGameDeveloper(
        "game_id",
        req.params.id,
    );
    const publishers = await getQuery.getGamePublisher(
        "game_id",
        req.params.id,
    );
    const cost = await getQuery.getCost(req.params.id);
    //const ratings = await getQuery.getAllRatings(req.params.id);
    const averageRatings = await getQuery.getAverageRatings(req.params.id);

    res.status(200).render("singleView/gameView", {
        game:
            game === undefined || game === null || game.length === 0
                ? { id: req.params.id, game_name: "Where are we?" }
                : game[0],
        genres:
            genres === undefined || genres === null || genres.length === 0
                ? [{ id: 1, game_genre: "Nothing..." }]
                : genres,
        developers:
            developers === undefined ||
            developers === null ||
            developers.length === 0
                ? [{ id: 1, developer_name: "No one..." }]
                : developers,
        publishers:
            publishers === undefined ||
            publishers === null ||
            publishers.length === 0
                ? [{ publisher_name: "No one..." }]
                : publishers,
        cost:
            cost[0] === undefined || cost[0] === null || cost.length === 0
                ? -999
                : cost[0].cost,
        //ratings: ratings,
        average:
            averageRatings[0].avg === undefined ||
            averageRatings[0].avg === null ||
            averageRatings.length === 0
                ? -999
                : Number.parseFloat(averageRatings[0].avg).toFixed(2),
    });
};

const deleteGame = async (req, res) => {
    await deleteQuery.deleteElement("game_genre", "game_id", req.params.id);
    await deleteQuery.deleteElement("game_developer", "game_id", req.params.id);
    await deleteQuery.deleteElement("game_publisher", "game_id", req.params.id);
    await deleteQuery.deleteElement("game_cost", "game_id", req.params.id);
    await deleteQuery.deleteElement("game_rating", "game_id", req.params.id);
    await deleteQuery.deleteElementId("game", req.params.id);

    res.redirect("/game");
};

const getUpdate = async (req, res) => {
    const game = await getQuery.getElement("game", "id", req.params.id);
    const genres = await getQuery.getElements("genre");
    const gameGenres = await getQuery.getGameFromGameId(req.params.id);
    const developers = await getQuery.getElements("developer");
    const publishers = await getQuery.getElements("publisher");
    const gameDevelopers = await getQuery.getGameDeveloper(req.params.id);
    const gamePublishers = await getQuery.getGamePublisher(
        "publisher_id",
        req.params.id,
    );
    const cost = await getQuery.getCost(req.params.id);

    res.status(200).render("form/update/gameForm", {
        game: game[0],
        genres: genres,
        gameGenres:
            gameGenres === undefined ||
            gameGenres === null ||
            gameGenres.length === 0
                ? [{ id: 1, game_genre: "Nothing..." }]
                : gameGenres,
        gameDevelopers:
            gameDevelopers === gameDevelopers ||
            gameDevelopers === null ||
            gameDevelopers.length === 0
                ? [{ id: 1, developer_name: "No one..." }]
                : gameDevelopers,
        gamePublishers:
            gamePublishers === undefined ||
            gamePublishers === null ||
            gamePublishers.length === 0
                ? [{ id: 1, publisher_name: "No one..." }]
                : gamePublishers,
        developers:
            developers === undefined ||
            developers === null ||
            developers.length === 0
                ? [{ id: 1, developer_name: "No one..." }]
                : developers,
        publishers:
            publishers === undefined ||
            publishers === null ||
            publishers.length === 0
                ? [{ publisher_id: -1, publisher_name: "No one..." }]
                : publishers,
        cost: cost[0].cost,
        id: req.params.id,
    });
};

const postUpdate = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const game = await getQuery.getElement("game", "id", req.params.id);
            const genres = await getQuery.getElements("genre");
            const gameGenres = await getQuery.getGameFromGameId(req.params.id);
            const developers = await getQuery.getElements("developer");
            const publishers = await getQuery.getElements("publisher");
            const gameDevelopers = await getQuery.getGameDeveloper(
                req.params.id,
            );
            const gamePublishers = await getQuery.getGamePublisher(
                "publisher_id",
                req.params.id,
            );
            const cost = await getQuery.getCost(req.params.id);

            res.status(400).render("form/update/gameForm", {
                errors: errors.array(),
                game: game[0],
                genres: genres,
                gameGenres:
                    gameGenres === undefined ||
                    gameGenres === null ||
                    gameGenres.length === 0
                        ? [{ id: 1, game_genre: "Nothing..." }]
                        : gameGenres,
                gameDevelopers:
                    gameDevelopers === gameDevelopers ||
                    gameDevelopers === null ||
                    gameDevelopers.length === 0
                        ? [{ id: 1, developer_name: "No one..." }]
                        : gameDevelopers,
                gamePublishers:
                    gamePublishers === undefined ||
                    gamePublishers === null ||
                    gamePublishers.length === 0
                        ? [{ id: 1, publisher_name: "No one..." }]
                        : gamePublishers,
                developers:
                    developers === undefined ||
                    developers === null ||
                    developers.length === 0
                        ? [{ id: 1, developer_name: "No one..." }]
                        : developers,
                publishers:
                    publishers === undefined ||
                    publishers === null ||
                    publishers.length === 0
                        ? [{ publisher_id: -1, publisher_name: "No one..." }]
                        : publishers,
                cost: cost[0].cost,
                id: req.params.id,
            });

            return;
        }

        const { game_name, game_genre, cost, developer_name, publisher_name } =
            req.body;

        await updateQuery.updateElement(
            "game",
            "game_name",
            game_name,
            "id",
            req.params.id,
        );

        await deleteQuery.deleteElement("game_genre", "game_id", req.params.id);

        for (let i = 0; i < game_genre.length; i++) {
            await insertQuery.postRelationTable(
                "game_genre",
                "game_id",
                "genre_id",
                req.params.id,
                game_genre[i],
            );
        }

        await updateQuery.updateElement(
            "game_cost",
            "cost",
            cost,
            "game_id",
            req.params.id,
        );

        await deleteQuery.deleteElement(
            "game_developer",
            "game_id",
            req.params.id,
        );

        for (let i = 0; i < developer_name.length; i++) {
            await insertQuery.postRelationTable(
                "game_developer",
                "game_id",
                "developer_id",
                req.params.id,
                developer_name[i],
            );
        }

        await updateQuery.updateElement(
            "game_publisher",
            "publisher_id",
            publisher_name,
            "game_id",
            req.params.id,
        );

        res.redirect("/game");
    },
];

export {
    getIndex,
    getJson,
    getAdd,
    postAdd,
    postAddRating,
    getGame,
    deleteGame,
    getUpdate,
    postUpdate,
};
