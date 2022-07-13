import express, { Express, Request, Response } from "express";

import * as bodyParser from "body-parser";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";

const app: Express = express();
const port = 3000;

const firebaseConfig = {
  apiKey: "AIzaSyBYVyrGFnbrB--gEX2SjlgHdYhD6tPnX7g",
  authDomain: "sketch2game.firebaseapp.com",
  projectId: "sketch2game",
  storageBucket: "sketch2game.appspot.com",
  messagingSenderId: "603083634642",
  appId: "1:603083634642:web:ee9c657293b994ea167a0b",
  measurementId: "G-W83HL0NSZL",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.json("Message sent");
});

app.get("/levels", async (req: Request, res: Response) => {
  const snapshot = await getDocs(collection(db, "levels"));
  const cityList = snapshot.docs.map((doc) => doc.data());
  res.send(cityList);
});

app.post("/postLevel", async (req: Request, res: Response) => {
  try {
    const { id } = await addDoc(collection(db, "levels"), req.body);
    return res.send(id);
  } catch (error) {
    return console.log(error);
  }
  return;
});

// app.get("/levels/:id", (req, res) => {});

app.listen(process.env.PORT || port, () => {
  console.log(`app listening on port ${port}`);
});
