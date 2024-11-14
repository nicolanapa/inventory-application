import { Router } from "express";
import * as gameController from "../controllers/game.js";

const gameRouter = Router();

gameRouter.get("/", gameController.getIndex);

gameRouter.get("/json", gameController.getJson);

gameRouter.get("/add", gameController.getAdd);

gameRouter.post("/add", gameController.postAdd);

gameRouter.get("/:id", gameController.getGame);

gameRouter.delete("/:id", gameController.deleteGame);

export default gameRouter;
