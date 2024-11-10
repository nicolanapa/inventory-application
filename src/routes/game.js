import { Router } from "express";
import * as getQuery from "../db/getQueries.js";

const gameRouter = Router();

gameRouter.get("/", async (req, res) => {
    const listOfGames = await getQuery.getElements("game");

    res.render("game", { games: listOfGames });
});

export default gameRouter;
