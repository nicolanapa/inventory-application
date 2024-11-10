import { Router } from "express";
import * as getQuery from "../db/queries/getQueries.js";

const genreRouter = Router();

genreRouter.get("/", async (req, res) => {
    const listOfGenres = await getQuery.getElements("genre");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("genre", { genres: listOfGenres });
});

genreRouter.get("/json", async (req, res) => {
    const listOfGenres = await getQuery.getElements("genre");

    res.status(200).json(listOfGenres);
});

export default genreRouter;
