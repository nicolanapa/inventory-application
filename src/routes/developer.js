import { Router } from "express";
import * as developerController from "../controllers/developer.js";

const developerRouter = Router();

developerRouter.get("/", developerController.getIndex);

developerRouter.get("/json", developerController.getJson);

developerRouter.get("/add", developerController.getAdd);

developerRouter.post("/add", developerController.postAdd);

developerRouter.get("/:id", developerController.getDeveloper);

developerRouter.get("/delete/:id", developerController.deleteDeveloper);

developerRouter.get("/update/:id", developerController.getUpdate);

developerRouter.post("/update/:id", developerController.postUpdate);

export default developerRouter;
