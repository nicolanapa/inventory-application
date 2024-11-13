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

const postAdd = async (req, res) => {
    // validation
    await postGame();
};

export { getIndex, getJson, getAdd, postAdd };
