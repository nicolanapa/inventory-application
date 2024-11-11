import express from "express";
import process from "process";
import url from "url";
import path from "path";
import gameRouter from "./routes/game.js";
import genreRouter from "./routes/genre.js";
import developerRouter from "./routes/developer.js";
import publisherRouter from "./routes/publisher.js";
import * as getQuery from "./db/queries/getQueries.js";

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/styles")));

app.get("/", async (req, res) => {
    let mainQuery = {
        games: await getQuery.getElements("game"),
        gamesCost: await getQuery.getElements("game_cost"),
        genres: await getQuery.getElements("genre"),
        developers: await getQuery.getElements("developer"),
        publishers: await getQuery.getElements("publisher"),
    };

    res.set({ "Content-Type": "text/html" });
    res.status(200).render("index", {
        games: mainQuery.games,
        genres: mainQuery.genres,
        developers: mainQuery.developers,
        publishers: mainQuery.publishers,
    });
});

app.use("/game", gameRouter);

app.use("/genre", genreRouter);

app.use("/developer", developerRouter);

app.use("/publisher", publisherRouter);

app.get("/styles/:file", (req, res) => {
    res.sendFile(__dirname + req.path);
});

app.listen(PORT);
