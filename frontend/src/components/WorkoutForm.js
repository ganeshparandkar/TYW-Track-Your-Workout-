import { useState,useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
// import { useWorkoutContext } from "../hooks/useWorkoutContext"

const WorkoutForm = () => {
  const {workouts,setWorkouts} = useContext(WorkoutContext)
  // const [workouts,dispatch] = useWorkoutContext()
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };
    console.log(JSON.stringify(workout))
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      // console.log('testing = ',{...workouts,json})
      // dispatch({type: 'CREATE_WORKOUT ', payload:json})
      setWorkouts([json,...workouts])
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([])
      console.log("new workout added:", workouts);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}> 
    <h3>Add a New Workout</h3>

    <label>Excersize Title:</label>
    <input 
      type="text" 
      onChange={(e) => setTitle(e.target.value)} 
      value={title}
      className = {emptyFields.includes('title')? 'error': ''}
    />

    <label>Load (in kg):</label>
    <input 
      type="number" 
      onChange={(e) => setLoad(e.target.value)} 
      value={load}
      className = {emptyFields.includes('load')? 'error': ''}

    />

    <label>Number of Reps:</label>
    <input 
      type="number" 
      onChange={(e) => setReps(e.target.value)} 
      value={reps} 
      className = {emptyFields.includes('reps')? 'error': ''}

    />

    <button>Add Workout</button>
    {error && <div className="error">{error}</div>}
  </form>
  );
};

export default WorkoutForm;
