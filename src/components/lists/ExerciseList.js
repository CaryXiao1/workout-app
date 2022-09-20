import Exercise from "./Exercise"

/* Defines the list of exercises for a given Workout.
 * props: exercises - JSON object specifying all exercises for the given Workout.
 *        setExercises - function that changes the exercises object.
 */
const ExerciseList = ({ exercises, setExercises }) => {
  return (
    <div className='table'>  
    {exercises.map((ex) =>  (
      <div key={ex.id}>
        <Exercise exercises={exercises} ex={ex} setExercises={setExercises} />
      </div>
    ))}
  </div>
  )
}

export default ExerciseList