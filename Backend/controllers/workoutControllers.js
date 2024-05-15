const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
// get all workouts
const getAllWorkouts = async (req, res) => {
  const allWorkouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(allWorkouts);
};
//get specific workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Couldn't find workout! Please try again" });
  }
  const workout = await Workout.findById(id);
  if (workout) {
    res.status(200).json(workout);
  } else {
    res.status(404).json({ error: "Couldn't find workout! Please try again" });
  }
};

// delete specific workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Couldn't find workout! Please try again" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (workout) {
    res.status(200).json({ msg: "Workout Deleted !" });
  } else {
    res.status(404).json({ error: "Couldn't find workout! Please try again" });
  }
};



//update specific workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Couldn't find workout! Please try again" });
  }
  const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (workout) {
    res.status(200).json(workout);
  } else {
    res.status(404).json({ error: "Couldn't find workout! Please try again" });
  }
};

// create workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
};


module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
