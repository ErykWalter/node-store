import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Item from "./db/Item";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./src/views");


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/items", async (req: Request, res: Response) => {
  const items = await Item.findAll();
  res.render("items", { items });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
