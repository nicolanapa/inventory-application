import { Router } from "express";
import * as publisherController from "../controllers/publisher.js";

const publisherRouter = Router();

publisherRouter.get("/", publisherController.getIndex);

publisherRouter.get("/json", publisherController.getJson);

publisherRouter.get("/add", publisherController.getAdd);

publisherRouter.post("/add", publisherController.postAdd);

publisherRouter.get("/:id", publisherController.getPublisher);

publisherRouter.get("/delete/:id", publisherController.deletePublisher);

export default publisherRouter;
