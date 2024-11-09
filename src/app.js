import express from "express";
import process from "process";
import url from "url";
import path from "path";
import gameRouter from "./routes/game.js";
import genreRouter from "./routes/genre.js";
import developerRouter from "./routes/developer.js";
import publisherRouter from "./routes/publisher.js";

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {});

app.use("/game", gameRouter);

app.use("/genre", genreRouter);

app.use("/developer", developerRouter);

app.use("/publisher", publisherRouter);

app.listen(PORT);
