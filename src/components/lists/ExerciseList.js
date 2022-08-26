import Exercise from "./Exercise"

/* Defines the list of exercises for a given Workout.
 * props: exercises - JSON object specifying all exercises for the given Workout.
 *        setExercises - function that changes the exercises object.
 * 
 */
const ExerciseList = ({ exercises, setExercises }) => {
  // TODO: add keys to data.map
  return (
    <table id={'workout-table'}>  
    {exercises.map((ex) =>  (
      <tr key={ex.id}>
        <Exercise exercises={exercises} ex={ex} setExercises={setExercises} />
      </tr>
    ))}
  </table>
  )
}

export default ExerciseList