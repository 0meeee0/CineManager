require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/userRouter");
const filmRouter = require("./routes/filmRouter");
const salleRouter = require("./routes/salleRouter");
const seanceRouter = require("./routes/seanceRouter");
const reservationRouter = require("./routes/reservationRouter");
const commentRouter = require('./routes/commentRouter')
const ratingRouter = require("./routes/ratingRouter");
const path = require("path");
const cors = require('cors')

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors())
app.use(express.json());
app.use(userRouter);
app.use('/api/film',filmRouter);
app.use('/api/salle',salleRouter);
app.use('/api/seance',seanceRouter);
app.use('/api/reservation', reservationRouter)
app.use('/api/comments', commentRouter)
app.use('/api/rating', ratingRouter)

mongoose
  .connect(
    "mongodb+srv://meeee:kIqd5QhYuqVVHjEd@cinem.wx0t2.mongodb.net/CineM?retryWrites=true&w=majority&appName=CineM"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001, () => {
      console.log("server started");
    });
  })
  .catch((error) => {
    console.log(error);
  });
