import { useEffect, useContext } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutContext } from "../context/WorkoutContext";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null)

  const { workouts, setWorkouts } = useContext(WorkoutContext);

  console.log("workouts", workouts, typeof workouts);
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        const json = await response.json();

        if (response.ok) {
          setWorkouts(json);
        } else {
          console.error("Failed to fetch workouts:", json.error);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [setWorkouts]);
  

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
