import React from 'react'
import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

import { formatDistanceToNow, FormatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { styleText } from '../../node_modules/@types/node/util.d';

const WorkoutDetails = ({workout}) => {
  const { workouts, setWorkouts } = useContext(WorkoutContext);

  const handleDelete = async () => {
    console.log("delete fun");
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    // const json = await response.json()
    if (response.ok) {
      const updatedWorkout = workouts.filter(
        (item) => item._id !== workout._id
      );
      setWorkouts(updatedWorkout);
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (KG): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps : </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Time : </strong>
        {formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true}) }
      </p>
      <span onClick={handleDelete} class="material-symbols-outlined">Delete</span>
    </div>
  );
}

export default WorkoutDetails

