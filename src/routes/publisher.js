import { Router } from "express";
import * as getQuery from "../db/queries/getQueries.js";

const publisherRouter = Router();

publisherRouter.get("/", async (req, res) => {
    const listOfPublishers = await getQuery.getElements("publisher");

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("publisher", { publishers: listOfPublishers });
});

publisherRouter.get("/json", async (req, res) => {
    const listOfPublishers = await getQuery.getElements("publisher", 100);

    res.status(200).json(listOfPublishers);
});

export default publisherRouter;
