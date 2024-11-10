import { Router } from "express";
import * as getQuery from "../db/queries/getQueries.js";

const developerRouter = Router();

developerRouter.get("/", async (req, res) => {
    const listOfDevelopers = await getQuery.getElements("developer");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("developer", { developers: listOfDevelopers });
});

developerRouter.get("/json", async (req, res) => {
    const listOfDevelopers = await getQuery.getElements("developer", 100);

    res.status(200).json(listOfDevelopers);
});

export default developerRouter;
