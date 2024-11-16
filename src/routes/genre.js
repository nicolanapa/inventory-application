import { Router } from "express";
import * as genreController from "../controllers/genre.js";

const genreRouter = Router();

genreRouter.get("/", genreController.getIndex);

genreRouter.get("/json", genreController.getJson);

genreRouter.get("/add", genreController.getAdd);

genreRouter.post("/add", genreController.postAdd);

genreRouter.get("/:id", genreController.getGame);

genreRouter.get("/delete/:id", genreController.deleteGame);

export default genreRouter;
