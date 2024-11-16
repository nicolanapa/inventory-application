import { body, validationResult } from "express-validator";
import * as getQuery from "../db/queries/getQueries.js";
import * as insertQuery from "../db/queries/insertQueries.js";
import * as deleteQuery from "../db/queries/deleteQueries.js";

const getIndex = async (req, res) => {
    const listOfGenres = await getQuery.getElements("genre");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("genre", { genres: listOfGenres });
};

const getJson = async (req, res) => {
    const listOfGenres = await getQuery.getElements("genre", 100);

    res.status(200).json(listOfGenres);
};

const getAdd = async (req, res) => {
    const listOfGenres = await getQuery.getElements("genre");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("form/genreForm", {
        genres: listOfGenres,
    });
};

const addFormValidation = [
    body("game_genre")
        .trim()
        .notEmpty()
        .withMessage("Genre Name Input can't be Empty")
        .isLength({ min: 2, max: 16 })
        .withMessage("A Genre should be between lenght 2 and 16")
        .isAlpha()
        .withMessage("Genre Name can only have characters"),
];

const postAdd = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const listOfGenres = await getQuery.getElements("genre");

            res.status(400).render("form/genreForm", {
                errors: errors.array(),
                genres: listOfGenres,
            });
        }

        const { game_genre } = req.body;

        res.redirect("/genre");
    },
];

/*const getGenre = async (req, res) => {
    const game = await getQuery.getElement("game", "id", req.params.id);
    const genres = await getQuery.getGameGenre(req.params.id);
    const developers = await getQuery.getGameDeveloper(req.params.id);
    const publishers = await getQuery.getGamePublisher(req.params.id);
    const cost = await getQuery.getCost(req.params.id);
    const ratings = await getQuery.getAllRatings(req.params.id);

    res.status(200).render("oneGameView", {
        game: game[0],
        genres: genres,
        developers: developers,
        publishers: publishers,
        cost: cost[0].cost,
        ratings: ratings,
    });
};

const deleteGenre = async (req, res) => {
    await deleteQuery.deleteElement("game_genre", "game_id", req.params.id);
    await deleteQuery.deleteElement("game_developer", "game_id", req.params.id);
    await deleteQuery.deleteElement("game_publisher", "game_id", req.params.id);
    await deleteQuery.deleteElement("game_cost", "game_id", req.params.id);
    await deleteQuery.deleteElement("game_rating", "game_id", req.params.id);
    await deleteQuery.deleteElementId("game", req.params.id);

    res.redirect("/game");
};*/

export { getIndex, getJson, getAdd, postAdd, getGenre, deleteGenre };
