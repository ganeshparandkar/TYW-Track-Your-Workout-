const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const workoutRoutes = require("./routes/workouts");

app.use(express.json());
app.use((req, res, next) => {
//   console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // once we connect to the database then it will start listening to our requests
    app.listen(process.env.PORT, () => {
      console.log("listening at 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
