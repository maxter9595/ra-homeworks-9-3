import cors from "cors";
import faker from "faker";
import bcrypt from "bcrypt";
import * as uuid from "uuid";
import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import { Strategy } from "passport-http-bearer";
import process from "process";

const app = express();
const tokens = new Map();
const users = new Map();
const rounds = 10;

app.use(cors());
app.use(bodyParser.json({
  type() {
    return true;
  },
}));

app.use((_req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

users.set("vasya", {
  id: uuid.v4(),
  login: "vasya",
  name: "Vasya",
  password: bcrypt.hashSync("password", rounds),
  avatar: "https://i.pravatar.cc/40",
});

const news = [
  {
    id: uuid.v4(),
    title: faker.lorem.words(),
    image: "https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-768x463.jpeg",
    content: faker.lorem.paragraph(),
  },
  {
    id: uuid.v4(),
    title: faker.lorem.words(),
    image: "https://th-thumbnailer.cdn-si-edu.com/P3rgOMYeq5s-OK4xhloqO8PyB4I=/1026x684/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/ee/29/ee29f55b-813b-4043-a25e-cf7eb8d158fb/gateway-arch.jpg",
    content: faker.lorem.paragraph(),
  },
  {
    id: uuid.v4(),
    title: faker.lorem.words(),
    image: "https://cdn.britannica.com/37/123937-050-0B92318A/Place-Arc-de-Triomphe-Paris-Charles-Gaulle.jpg",
    content: faker.lorem.paragraph(),
  },
  {
    id: uuid.v4(),
    title: faker.lorem.words(),
    image: "https://img.static-af.com/transform/45cb9a13-b167-4842-8ea8-05d0cc7a4d04/?io=transform:fill,width:600,height:300&consumerid=bwp",
    content: faker.lorem.paragraph(),
  },
];

passport.use(
  new Strategy((token, callback) => {
    const user = tokens.get(token);
    if (!user) {
      return callback(null, false);
    }
    return callback(null, user);
  })
);

const bearerAuth = passport.authenticate("bearer", { session: false });

app.post("/auth", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = users.get(login);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = uuid.v4();
    tokens.set(token, user);

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server internal error" });
  }
});

app.use("/private", bearerAuth);

app.get("/private/me", async (req, res) => {
  try {
    return res.json({
      id: req.user.id,
      login: req.user.login,
      name: req.user.name,
      avatar: req.user.avatar,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server internal error" });
  }
});

app.get("/private/news", async (_req, res) => {
  try {
    return res.json(news);
  } catch (error) {
    console.error('Single news fetch error:', error);
    return res.status(500).json({ message: "Server internal error" });
  }
});

app.get("/private/news/:id", async (req, res) => {
  try {
    const item = news.find((n) => n.id === req.params.id);
    if (!item) {
      return res.status(404).json({ message: "not found" });
    }
    return res.json(item);
  } catch (error) {
    console.error('Single news fetch error:', error); 
    return res.status(500).json({ message: "Server internal error" });
  }
});

const port = process.env.PORT || 7071;
app.listen(port, () => console.log(`The server is running on port ${port}.`));
