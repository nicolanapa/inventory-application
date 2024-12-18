import { body, validationResult } from "express-validator";
import * as getQuery from "../db/queries/getQueries.js";
import * as insertQuery from "../db/queries/insertQueries.js";
import * as deleteQuery from "../db/queries/deleteQueries.js";
import * as updateQuery from "../db/queries/updateQueries.js";

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
    // Add list for adding to existent Games a Genre
    const games = await getQuery.getElements("game");
    //console.log(games);

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("form/add/genreForm", {
        games: games,
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

            res.status(400).render("form/add/genreForm", {
                errors: errors.array(),
                genres: listOfGenres,
            });
        }

        const { game_genre } = req.body;

        await insertQuery.postElement("genre", "game_genre", game_genre);

        res.redirect("/genre");
    },
];

const getGenre = async (req, res) => {
    const games = await getQuery.getGameFromGenreId(req.params.id);
    const genre = await getQuery.getElement("genre", "id", req.params.id);
    /*const developers = await getQuery.getGameDeveloper(req.params.id);
    const publishers = await getQuery.getGamePublisher(req.params.id);
    const cost = await getQuery.getCost(req.params.id);
    const ratings = await getQuery.getAllRatings(req.params.id);*/

    let code =
        genre === undefined || genre === null || genre.length === 0 ? 404 : 200;

    res.status(code).render("singleView/genreView", {
        games:
            games === undefined || games === null || games.length === 0
                ? [{ id: 1, game_name: "Nothing..." }]
                : games,
        genre:
            genre === undefined || genre === null || genre.length === 0
                ? { id: 1, game_genre: "Where are we? 404" }
                : genre[0],
        /*developers: developers,
        publishers: publishers,
        cost: cost[0].cost,
        ratings: ratings,*/
    });
};

const deleteGenre = async (req, res) => {
    const games = await getQuery.getGameFromGenreId(req.params.id);
    console.log(games);
    if (games.length !== 0) {
        await deleteQuery.deleteElement(
            "game_genre",
            "genre_id",
            req.params.id,
        );
    }

    await deleteQuery.deleteElementId("genre", req.params.id);

    res.redirect("/genre");
};

const getUpdate = async (req, res) => {
    const genre = await getQuery.getElement("genre", "id", req.params.id);

    res.status(200).render("form/update/genreForm", {
        genre: genre[0],
        id: req.params.id,
    });
};

const postUpdate = [
    addFormValidation,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const genre = await getQuery.getElement(
                "genre",
                "id",
                req.params.id,
            );

            res.status(400).render("form/update/genreForm", {
                errors: errors.array(),
                genre: genre[0],
                id: req.params.id,
            });

            return;
        }

        const { game_genre } = req.body;

        await updateQuery.updateElement(
            "genre",
            "game_genre",
            game_genre,
            "id",
            req.params.id,
        );

        res.redirect("/genre");
    },
];

export {
    getIndex,
    getJson,
    getAdd,
    postAdd,
    getGenre,
    deleteGenre,
    getUpdate,
    postUpdate,
};
