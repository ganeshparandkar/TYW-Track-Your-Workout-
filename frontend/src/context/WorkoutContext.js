import { createContext ,useState} from "react";

export const WorkoutContext = createContext(null);
export const WorkoutContextProvider = (props) => {
  const [workouts, setWorkouts] = useState(null)

  return <WorkoutContext.Provider value = {{workouts,setWorkouts}}>

    {props.children}
  </WorkoutContext.Provider>;
};

// import { createContext, useReducer } from "react";

// export const WorkoutContext = createContext();

// export const workoutReducer = (state, action) => {
//   console.log({action});
//   switch (action.type) {
//     case "SET_WORKOUT":
//       return {
//         workouts: action.payload,
//       };
//     case "CREATE_WORKOUT":
//       return {
//         workouts: [action.payload, ...state.workouts],
//       };
//     default:
//       return state;
//   }
// };
// export const WorkoutContextProvider = ({ childrens }) => {
//   const [state, dispatch] = useReducer(workoutReducer, {
//     workouts: null,
//   });
//   return (
//     <WorkoutContext.Provider value={{ ...state, dispatch }}>
//       {childrens}
//     </WorkoutContext.Provider>
//   );
// };
