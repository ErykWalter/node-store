import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Item from "./db/Item";
import Session from "./db/Session";
import Basket from "./db/Basket";
import session from "express-session";
import seed from "./db/Seed";
import sequelize from "./db/Connection";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use('/public', express.static('./src/public'));
app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));
app.use('/js', express.static('./node_modules/jquery/dist'));

const oneHour = 1000 * 60 * 60;

app.use(
  session({
  secret: process.env.SECRET || "secret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: oneHour,
  },
}));

app.get("/", (req: Request, res: Response) => {
  console.log(`[server]: Session: ${req.sessionID}`);
  res.render('pages/index', { user: req.sessionID });
});

app.get("/items", async (req: Request, res: Response) => {
  console.log(`[server]: SessionID: ${req.sessionID}`);
  const items = await Item.findAll();
  res.render("pages/items", { items });
});

app.get("/items/:id", async (req: Request, res: Response) => {
    const itemId = req.params.id;
    const item = await Item.findByPk(itemId);
    res.render("pages/item", { item });
});

app.post("/add-to-basket/:id", async (req: Request, res: Response) => {
  const itemId = req.params.id;
  let session = await Session.findOne({
    where: {
    sid: req.sessionID,
    },
  });
  // if session does not exist in database create one
  if (!session) {
    session = await Session.create({ "sid":req.sessionID });
  };

  await Basket.create({"itemId":Number(itemId), "sessionId":session.sid});
  res.redirect("/basket");
});

app.get("/basket", async (req: Request, res: Response) => {
  const sessionId = req.sessionID;
  const basket = await Basket.findAll({
      where: {
          sessionId: sessionId
      },
      include: {
          model: Item,
          attributes: ["name"]
      }
  });
  console.log(basket.map(b => JSON.stringify(b)));

  res.render("pages/basket", { basket, sessionId });
});

app.post("/checkout", async (req: Request, res: Response) => {
    // show modal with info if everything went well
    // decrease quantity of items in the database
    // clear basket
    // redirect to homepage
    const sessionId = req.sessionID;
    const basket = await Basket.findAll({
        where: {
            sessionId: sessionId
        },
        include: {
            model: Item,
            attributes: ["name"]
        }
    });

    try {
        const result = await sequelize.transaction(async (t) => {
            for (const b of basket) {
                const item = await Item.findByPk(b.itemId);
                await item?.decrement("quantity", { by: 1, transaction: t });
            }
            await Basket.destroy({ where: { sessionId: sessionId }, transaction: t });
        });
        // redirect to checkout page
        res.redirect("/checkout");
    } catch (error) {
        // redirect to error page
        res.redirect("/error");
    }
});

app.get("/checkout", async (req: Request, res: Response) => {
    res.render("pages/checkout");
});

app.get("/error", async (req: Request, res: Response) => {
    res.render("pages/error");
});

app.listen(port, () => {
  seed();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
