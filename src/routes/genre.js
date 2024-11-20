import { Router } from "express";
import * as genreController from "../controllers/genre.js";

const genreRouter = Router();

genreRouter.get("/", genreController.getIndex);

genreRouter.get("/json", genreController.getJson);

genreRouter.get("/add", genreController.getAdd);

genreRouter.post("/add", genreController.postAdd);

genreRouter.get("/:id", genreController.getGenre);

genreRouter.get("/delete/:id", genreController.deleteGenre);

genreRouter.get("/update/:id", genreController.getUpdate);

genreRouter.post("/update/:id", genreController.postUpdate);

export default genreRouter;
