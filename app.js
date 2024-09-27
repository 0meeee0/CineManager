require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/userRouter");
const filmRouter = require("./routes/filmRouter");
const salleRouter = require("./routes/salleRouter");
const seanceRouter = require("./routes/seanceRouter");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(userRouter);
app.use('/api/film',filmRouter);
app.use('/api/salle',salleRouter);
app.use('/api/seance',seanceRouter);

mongoose
  .connect(
    "mongodb+srv://meeee:kIqd5QhYuqVVHjEd@cinem.wx0t2.mongodb.net/CineM?retryWrites=true&w=majority&appName=CineM"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("server started");
    });
  })
  .catch((error) => {
    console.log(error);
  });
