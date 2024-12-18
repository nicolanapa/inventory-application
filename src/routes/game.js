import { Router } from "express";
import * as gameController from "../controllers/game.js";

const gameRouter = Router();

gameRouter.get("/", gameController.getIndex);

gameRouter.get("/json", gameController.getJson);

gameRouter.get("/add", gameController.getAdd);

gameRouter.post("/add", gameController.postAdd);

gameRouter.get("/:id", gameController.getGame);

gameRouter.post("/:id/add/rating", gameController.postAddRating);

gameRouter.get("/delete/:id", gameController.deleteGame);

gameRouter.get("/update/:id", gameController.getUpdate);

gameRouter.post("/update/:id", gameController.postUpdate);

export default gameRouter;
