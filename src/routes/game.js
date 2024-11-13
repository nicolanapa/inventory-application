import { Router } from "express";
import * as getQuery from "../db/queries/getQueries.js";
import { postGame } from "../db/queries/insertQueries.js";

const gameRouter = Router();

gameRouter.get("/", async (req, res) => {
    const listOfGames = await getQuery.getElements("game");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("game", { games: listOfGames });
});

gameRouter.get("/json", async (req, res) => {
    const listOfGames = await getQuery.getElements("game", 100);

    res.status(200).json(listOfGames);
});

gameRouter.get("/add", async (req, res) => {
    const listOfGenres = await getQuery.getElements("genre");
    const listOfDevelopers = await getQuery.getElements("developer");
    const listOfPublishers = await getQuery.getElements("publisher");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("form/gameForm", {
        genres: listOfGenres,
        developers: listOfDevelopers,
        publishers: listOfPublishers,
    });
});

gameRouter.post("/add", async (req, res) => {
    // validation
    await postGame();
});

export default gameRouter;
