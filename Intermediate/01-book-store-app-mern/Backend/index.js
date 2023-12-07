import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to the MERN Book Store");
});

//Middleware for the application
app.use(express.json());

//Handling CORS policy
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use("/books", booksRoute);
app.listen(PORT, () => {
  console.log(`App is listening to the port ${PORT}`);
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });
