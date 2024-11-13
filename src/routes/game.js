import { Router } from "express";
import * as getQuery from "../db/queries/getQueries.js";

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

gameRouter.get("/add", (req, res) => {});

gameRouter.post("/add", (req, res) => {});

export default gameRouter;
